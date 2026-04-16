// GenSpark API 클라이언트 (OpenAI 호환 형식)
// genspark2api 또는 GenSpark 공식 API 사용

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

// ===== Chat Completions (OpenAI 호환) =====
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
    model = 'gpt-4o',
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

// ===== 트렌드 검색 (GenSpark 웹 검색 활용) =====
export async function searchTrends(query: string): Promise<string> {
  return chatCompletion(
    [
      {
        role: 'system',
        content:
          'You are a trend research assistant. Return results as JSON array.',
      },
      {
        role: 'user',
        content: query,
      },
    ],
    { model: 'gpt-4o', webSearch: true, temperature: 0.3 }
  );
}

// ===== 이미지 생성 (GenSpark 이미지 API) =====
export async function generateImageViaGenSpark(
  prompt: string
): Promise<string | null> {
  if (!GENSPARK_API_KEY) return null;

  try {
    const res = await fetch(`${GENSPARK_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GENSPARK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (b64) return `data:image/png;base64,${b64}`;

    const url = data?.data?.[0]?.url;
    return url || null;
  } catch {
    return null;
  }
}
