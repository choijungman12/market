import { NextRequest, NextResponse } from 'next/server';
import { generateLandingPageHtml, getActiveProvider } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const provider = getActiveProvider();
    if (provider === 'none') {
      return NextResponse.json(
        { error: 'AI API 키가 설정되지 않았습니다.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { hook, companyName, productName, ctaUrl = '#' } = body;

    if (!hook?.headline) {
      return NextResponse.json(
        { error: '후킹 콘텐츠 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    const bodyPoints: string[] = hook.bodyPoints || [];
    const features = bodyPoints.map((point: string, i: number) => ({
      title: point.length > 30 ? point.slice(0, 30) + '...' : point,
      description: point,
    }));

    const html = await generateLandingPageHtml({
      heroTitle: hook.headline,
      heroSubtitle: hook.subheadline || '',
      features,
      ctaText: hook.callToAction || '자세히 알아보기',
      ctaUrl,
      companyName: companyName || undefined,
      productName: productName || undefined,
    });

    return NextResponse.json({
      landing: {
        hookContentId: hook.id || '',
        heroTitle: hook.headline,
        heroSubtitle: hook.subheadline,
        features,
        ctaText: hook.callToAction,
        ctaUrl,
        companyName,
        productName,
        generatedHtml: html,
      },
      provider,
    });
  } catch (error) {
    console.error('[API] Generate landing error:', error);
    return NextResponse.json(
      {
        error: '랜딩 페이지 생성에 실패했습니다.',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
