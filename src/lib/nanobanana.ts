// NanoBanana 이미지 생성 통합 모듈
// 우선순위: GenSpark 내장 NanoBanana → Gemini API 직접 → 플레이스홀더

import { isGenSparkAvailable, generateCarouselImagesViaGenSpark, generateImageViaGenSpark } from './genspark';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.0-flash-exp';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

export interface ImageResult {
  base64: string;
  mimeType: string;
}

// ===== 단일 이미지 생성 =====
export async function generateImage(prompt: string): Promise<ImageResult | null> {
  // 1) GenSpark NanoBanana 시도
  if (isGenSparkAvailable()) {
    const result = await generateImageViaGenSpark(prompt);
    if (result) {
      return {
        base64: result,
        mimeType: result.startsWith('data:') ? 'image/png' : 'url',
      };
    }
  }

  // 2) Gemini API 직접 시도
  if (GEMINI_API_KEY) {
    return generateViaGemini(prompt);
  }

  // 3) 플레이스홀더
  return generatePlaceholder(prompt);
}

// ===== 카루셀 이미지 일괄 생성 =====
export async function generateCarouselImages(
  prompts: string[]
): Promise<(ImageResult | null)[]> {
  // 1) GenSpark NanoBanana 일괄 시도
  if (isGenSparkAvailable()) {
    const results = await generateCarouselImagesViaGenSpark(prompts);
    return results.map((r) =>
      r
        ? { base64: r, mimeType: r.startsWith('data:') ? 'image/png' : 'url' }
        : generatePlaceholder(prompts[0] || 'background')
    );
  }

  // 2) Gemini API 일괄 시도
  if (GEMINI_API_KEY) {
    const results: (ImageResult | null)[] = [];
    for (let i = 0; i < prompts.length; i += 2) {
      const batch = prompts.slice(i, i + 2);
      const batchResults = await Promise.all(batch.map((p) => generateViaGemini(p)));
      results.push(...batchResults);
      if (i + 2 < prompts.length) await new Promise((r) => setTimeout(r, 1000));
    }
    return results;
  }

  // 3) 전부 플레이스홀더
  return prompts.map((p) => generatePlaceholder(p));
}

// ===== Gemini API 직접 호출 =====
async function generateViaGemini(prompt: string): Promise<ImageResult | null> {
  try {
    const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a modern, clean social media graphic background.
Dark theme with purple/indigo gradients. NO text or words.
${prompt}`,
          }],
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      }),
    });

    if (!res.ok) {
      console.warn(`[NanoBanana] Gemini ${res.status}`);
      return generatePlaceholder(prompt);
    }

    const data = await res.json();
    for (const part of data?.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return {
          base64: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          mimeType: part.inlineData.mimeType,
        };
      }
    }
    return generatePlaceholder(prompt);
  } catch (error) {
    console.warn('[NanoBanana] Gemini error:', error);
    return generatePlaceholder(prompt);
  }
}

// ===== SVG 플레이스홀더 =====
function generatePlaceholder(prompt: string): ImageResult {
  const hash = Array.from(prompt).reduce((a, c) => a + c.charCodeAt(0), 0);
  const colors = [
    ['#6366F1', '#8B5CF6'], ['#818CF8', '#A78BFA'], ['#4F46E5', '#7C3AED'],
    ['#6366F1', '#EC4899'], ['#3B82F6', '#8B5CF6'], ['#7C3AED', '#2DD4BF'],
  ];
  const [c1, c2] = colors[hash % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${c2}" stop-opacity="0.3"/>
      </linearGradient>
      <radialGradient id="g1" cx="25%" cy="25%">
        <stop offset="0%" stop-color="${c1}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="75%" cy="75%">
        <stop offset="0%" stop-color="${c2}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1080" fill="#0F172A"/>
    <rect width="1080" height="1080" fill="url(#bg)"/>
    <circle cx="270" cy="270" r="400" fill="url(#g1)"/>
    <circle cx="810" cy="810" r="350" fill="url(#g2)"/>
  </svg>`;

  return {
    base64: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
    mimeType: 'image/svg+xml',
  };
}
