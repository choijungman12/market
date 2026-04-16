// GenSpark API 통합 클라이언트
// OpenAI 호환 형식 - 텍스트, 이미지(NanoBanana), 영상 지원

const GENSPARK_API_KEY = process.env.GENSPARK_API_KEY || '';
const GENSPARK_BASE_URL =
  process.env.GENSPARK_BASE_URL || 'https://api.genspark.ai/v1';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  choices: { message: { content: string } }[];
}

// ===== GenSpark 사용 가능 여부 =====
export function isGenSparkAvailable(): boolean {
  return !!GENSPARK_API_KEY;
}

// ===== Chat Completions (텍스트 생성) =====
export async function chatCompletion(
  messages: ChatMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    webSearch?: boolean;
  } = {}
): Promise<string> {
  const {
    model = 'claude-sonnet-4-20250514',
    temperature = 0.7,
    maxTokens = 4096,
    webSearch = false,
  } = options;

  // 웹 검색 활성화 시 모델명에 -search 추가
  const modelName = webSearch ? `${model}-search` : model;

  const res = await fetch(`${GENSPARK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GENSPARK_API_KEY}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GenSpark API error ${res.status}: ${errText}`);
  }

  const data: ChatCompletionResponse = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ===== 이미지 생성 (GenSpark 내장 NanoBanana) =====
export async function generateImageViaGenSpark(
  prompt: string,
  options: {
    model?: string;
    size?: string;
    n?: number;
  } = {}
): Promise<string | null> {
  if (!GENSPARK_API_KEY) return null;

  const {
    model = 'dall-e-3',
    size = '1024x1024',
    n = 1,
  } = options;

  try {
    const res = await fetch(`${GENSPARK_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GENSPARK_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        n,
        size,
        response_format: 'b64_json',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[GenSpark] Image API ${res.status}:`, errText.slice(0, 200));
      return null;
    }

    const data = await res.json();

    // b64_json 형식
    const b64 = data?.data?.[0]?.b64_json;
    if (b64) return `data:image/png;base64,${b64}`;

    // URL 형식
    const url = data?.data?.[0]?.url;
    if (url) return url;

    return null;
  } catch (error) {
    console.warn('[GenSpark] Image generation error:', error);
    return null;
  }
}

// ===== 카루셀 이미지 일괄 생성 (GenSpark NanoBanana) =====
export async function generateCarouselImagesViaGenSpark(
  prompts: string[]
): Promise<(string | null)[]> {
  const results: (string | null)[] = [];

  // 2개씩 병렬 처리 (rate limit 고려)
  for (let i = 0; i < prompts.length; i += 2) {
    const batch = prompts.slice(i, i + 2);
    const batchResults = await Promise.all(
      batch.map((prompt) => generateImageViaGenSpark(prompt))
    );
    results.push(...batchResults);

    if (i + 2 < prompts.length) {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  return results;
}

// ===== 트렌드 웹 검색 =====
export async function searchTrends(query: string): Promise<string> {
  return chatCompletion(
    [
      {
        role: 'system',
        content:
          'You are a trend research assistant. Return results as JSON array.',
      },
      { role: 'user', content: query },
    ],
    { model: 'gpt-4o', webSearch: true, temperature: 0.3 }
  );
}
