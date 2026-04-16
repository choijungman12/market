// NanoBanana 이미지 생성 = Gemini API 연동
// 실제 API: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.0-flash-exp';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';

export interface ImageResult {
  base64: string; // data:image/png;base64,...
  mimeType: string;
}

// ===== Gemini 이미지 생성 (실제 API) =====
export async function generateImage(
  prompt: string,
  aspectRatio: string = '1:1'
): Promise<ImageResult | null> {
  if (!GEMINI_API_KEY) {
    console.warn('[NanoBanana] GEMINI_API_KEY 미설정 - 플레이스홀더 사용');
    return generatePlaceholder(prompt);
  }

  try {
    const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a modern, clean social media graphic background image.
Style: minimal abstract, dark theme with purple/indigo accent gradients.
NO text, NO words, NO letters in the image.
Prompt: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
          imageParts: { imageFormat: 'png' },
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[NanoBanana] Gemini API ${res.status}:`, errText);
      return generatePlaceholder(prompt);
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        return {
          base64: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
          mimeType: part.inlineData.mimeType,
        };
      }
    }

    console.warn('[NanoBanana] 응답에 이미지 없음');
    return generatePlaceholder(prompt);
  } catch (error) {
    console.error('[NanoBanana] API 오류:', error);
    return generatePlaceholder(prompt);
  }
}

// ===== 카루셀 배경 이미지 일괄 생성 =====
export async function generateCarouselImages(
  prompts: string[]
): Promise<(ImageResult | null)[]> {
  // 병렬로 생성하되 rate limit 고려하여 2개씩
  const results: (ImageResult | null)[] = [];
  const batchSize = 2;

  for (let i = 0; i < prompts.length; i += batchSize) {
    const batch = prompts.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((p) => generateImage(p, '1:1'))
    );
    results.push(...batchResults);

    // rate limit 대기 (batch 사이)
    if (i + batchSize < prompts.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return results;
}

// ===== SVG 플레이스홀더 (API 키 없을 때) =====
function generatePlaceholder(prompt: string): ImageResult {
  const hash = Array.from(prompt).reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradients = [
    ['#6366F1', '#8B5CF6'],
    ['#818CF8', '#A78BFA'],
    ['#4F46E5', '#7C3AED'],
    ['#6366F1', '#EC4899'],
    ['#3B82F6', '#8B5CF6'],
    ['#7C3AED', '#2DD4BF'],
  ];
  const [c1, c2] = gradients[hash % gradients.length];

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
    <circle cx="540" cy="400" r="150" fill="${c1}" opacity="0.08"/>
    <circle cx="350" cy="700" r="200" fill="${c2}" opacity="0.06"/>
  </svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return {
    base64: `data:image/svg+xml;base64,${base64}`,
    mimeType: 'image/svg+xml',
  };
}
