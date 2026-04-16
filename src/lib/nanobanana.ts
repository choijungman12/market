// NanoBanana API 연동 모듈
// Gemini 기반 이미지 생성 API

import type { NanoBananaRequest, NanoBananaResponse } from '@/types';

const API_URL =
  process.env.NANOBANANA_API_URL || 'https://api.nanobanana.im/v1';
const API_KEY = process.env.NANOBANANA_API_KEY || '';

// ===== 이미지 생성 =====
export async function generateImage(
  request: NanoBananaRequest
): Promise<NanoBananaResponse> {
  // NanoBanana API가 설정되지 않은 경우 → 플레이스홀더 반환
  if (!API_KEY) {
    return generatePlaceholder(request);
  }

  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: request.prompt,
        width: request.width,
        height: request.height,
        style: request.style || 'modern-minimal',
        negative_prompt:
          request.negativePrompt ||
          'text, words, letters, watermark, blurry, low quality',
        num_images: 1,
        output_format: 'png',
      }),
    });

    if (!response.ok) {
      console.error('NanoBanana API error:', response.status);
      return generatePlaceholder(request);
    }

    const data = await response.json();

    return {
      imageUrl: data.images?.[0]?.url || data.output?.image_url || '',
      imageBase64: data.images?.[0]?.base64 || data.output?.base64 || '',
    };
  } catch (error) {
    console.error('NanoBanana API error:', error);
    return generatePlaceholder(request);
  }
}

// ===== 카루셀 슬라이드용 배경 이미지 일괄 생성 =====
export async function generateCarouselBackgrounds(
  prompts: string[],
  format: 'instagram' | 'facebook' = 'instagram'
): Promise<NanoBananaResponse[]> {
  const dimensions =
    format === 'instagram'
      ? { width: 1080, height: 1080 }
      : { width: 1200, height: 628 };

  const results = await Promise.all(
    prompts.map((prompt) =>
      generateImage({
        prompt,
        ...dimensions,
        style: 'modern-minimal',
      })
    )
  );

  return results;
}

// ===== SVG 기반 플레이스홀더 (API 키 없을 때 사용) =====
function generatePlaceholder(request: NanoBananaRequest): NanoBananaResponse {
  const gradients = [
    { from: '#6366F1', to: '#8B5CF6' },
    { from: '#818CF8', to: '#A78BFA' },
    { from: '#4F46E5', to: '#7C3AED' },
    { from: '#6366F1', to: '#EC4899' },
    { from: '#3B82F6', to: '#8B5CF6' },
  ];
  const grad = gradients[Math.floor(Math.random() * gradients.length)];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${request.width}" height="${request.height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${grad.from};stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:${grad.to};stop-opacity:0.3"/>
      </linearGradient>
      <radialGradient id="glow" cx="30%" cy="30%">
        <stop offset="0%" style="stop-color:${grad.from};stop-opacity:0.4"/>
        <stop offset="100%" style="stop-color:transparent;stop-opacity:0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#0F172A"/>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <circle cx="${request.width * 0.3}" cy="${request.height * 0.3}" r="${request.width * 0.4}" fill="url(#glow)"/>
    <circle cx="${request.width * 0.7}" cy="${request.height * 0.7}" r="${request.width * 0.3}" fill="url(#glow)" opacity="0.5"/>
  </svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return {
    imageUrl: '',
    imageBase64: `data:image/svg+xml;base64,${base64}`,
  };
}
