import { NextRequest, NextResponse } from 'next/server';
import { generateCarouselStructure, generateImagePrompt } from '@/lib/anthropic';
import { generateCarouselBackgrounds } from '@/lib/nanobanana';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hook, format = 'instagram', useNanoBanana = true } = body;

    if (!hook?.headline) {
      return NextResponse.json(
        { error: '후킹 콘텐츠 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    // Step 1: Claude로 슬라이드 구조 생성
    const slides = await generateCarouselStructure(hook);

    // Step 2: NanoBanana로 배경 이미지 생성 (옵션)
    let backgroundImages: string[] = [];

    if (useNanoBanana) {
      // 각 슬라이드에 맞는 이미지 프롬프트 생성
      const imagePrompts = await Promise.all(
        slides.map(
          (slide: { title: string; body: string; type: string }) =>
            generateImagePrompt(slide)
        )
      );

      // NanoBanana API로 이미지 생성
      const images = await generateCarouselBackgrounds(imagePrompts, format);
      backgroundImages = images.map(
        (img) => img.imageBase64 || img.imageUrl || ''
      );
    }

    return NextResponse.json({
      carousel: {
        id: `carousel_${Date.now()}`,
        hookContentId: hook.id,
        slides,
        format,
        generatedImages: backgroundImages,
      },
    });
  } catch (error) {
    console.error('Generate carousel error:', error);
    return NextResponse.json(
      { error: '카루셀 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
