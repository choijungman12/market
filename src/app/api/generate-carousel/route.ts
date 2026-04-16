import { NextRequest, NextResponse } from 'next/server';
import {
  generateCarouselStructure,
  generateImagePrompts,
  getActiveProvider,
} from '@/lib/anthropic';
import { generateCarouselImages } from '@/lib/nanobanana';

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
    const { hook, format = 'instagram' } = body;

    if (!hook?.headline) {
      return NextResponse.json(
        { error: '후킹 콘텐츠 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    // Step 1: AI로 슬라이드 구조 생성
    const slides = await generateCarouselStructure({
      headline: hook.headline,
      subheadline: hook.subheadline || '',
      bodyPoints: hook.bodyPoints || [],
      callToAction: hook.callToAction || '',
    });

    // Step 2: 이미지 프롬프트 생성 + NanoBanana(Gemini)로 이미지 생성
    let generatedImages: string[] = [];
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;

    if (hasGeminiKey) {
      try {
        const imagePrompts = await generateImagePrompts(
          slides.map((s) => ({
            title: s.title as string,
            type: s.type as string,
          }))
        );

        const images = await generateCarouselImages(imagePrompts);
        generatedImages = images.map((img) => img?.base64 || '');
      } catch (imgError) {
        console.warn('[Carousel] 이미지 생성 실패, 슬라이드만 반환:', imgError);
      }
    } else {
      // Gemini 키 없으면 플레이스홀더
      const { generateCarouselImages: genPlaceholders } = await import(
        '@/lib/nanobanana'
      );
      const placeholders = await genPlaceholders(
        slides.map((s) => (s.title as string) || 'abstract background')
      );
      generatedImages = placeholders.map((p) => p?.base64 || '');
    }

    return NextResponse.json({
      carousel: {
        id: `carousel_${Date.now()}`,
        hookContentId: hook.id || '',
        slides,
        format,
        generatedImages,
      },
      provider,
      imagesGenerated: hasGeminiKey,
    });
  } catch (error) {
    console.error('[API] Generate carousel error:', error);
    return NextResponse.json(
      {
        error: '카루셀 생성에 실패했습니다.',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
