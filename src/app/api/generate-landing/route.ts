import { NextRequest, NextResponse } from 'next/server';
import { generateLandingPageHtml } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hook, companyName, productName, ctaUrl = '#' } = body;

    if (!hook?.headline) {
      return NextResponse.json(
        { error: '후킹 콘텐츠 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    const features = hook.bodyPoints.map((point: string, i: number) => ({
      icon: ['🚀', '⚡', '🎯', '💡', '🔥'][i % 5],
      title: point.split('.')[0] || point.slice(0, 20),
      description: point,
    }));

    const html = await generateLandingPageHtml({
      heroTitle: hook.headline,
      heroSubtitle: hook.subheadline,
      features,
      ctaText: hook.callToAction,
      ctaUrl,
      companyName,
      productName,
    });

    return NextResponse.json({
      landing: {
        hookContentId: hook.id,
        heroTitle: hook.headline,
        heroSubtitle: hook.subheadline,
        features,
        ctaText: hook.callToAction,
        ctaUrl,
        companyName,
        productName,
        generatedHtml: html,
      },
    });
  } catch (error) {
    console.error('Generate landing error:', error);
    return NextResponse.json(
      { error: '랜딩 페이지 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
