// 클라이언트 사이드 API 호출 모듈 (gh-pages용)
// 모든 API 호출이 브라우저에서 직접 수행됨

// ===== API 키 관리 (localStorage) =====
export function getApiKey(provider: 'anthropic' | 'genspark'): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`hookflow_${provider}_key`) || '';
}

export function setApiKey(provider: 'anthropic' | 'genspark', key: string) {
  localStorage.setItem(`hookflow_${provider}_key`, key);
}

export function getActiveProvider(): 'anthropic' | 'genspark' | 'none' {
  if (getApiKey('anthropic')) return 'anthropic';
  if (getApiKey('genspark')) return 'genspark';
  return 'none';
}

// ===== Anthropic Claude 직접 호출 =====
async function callClaude(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const key = getApiKey('anthropic');
  if (!key) throw new Error('Anthropic API 키가 설정되지 않았습니다.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 4096,
      temperature: options.temperature || 0.7,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || '';
}

// ===== GenSpark 직접 호출 (OpenAI 호환) =====
async function callGenSpark(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const key = getApiKey('genspark');
  if (!key) throw new Error('GenSpark API 키가 설정되지 않았습니다.');

  const res = await fetch('https://api.genspark.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GenSpark API ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ===== 통합 AI 텍스트 생성 =====
async function generateText(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const provider = getActiveProvider();

  if (provider === 'anthropic') return callClaude(systemPrompt, userPrompt, options);
  if (provider === 'genspark') return callGenSpark(systemPrompt, userPrompt, options);

  throw new Error('API 키가 설정되지 않았습니다. 설정 페이지에서 키를 입력하세요.');
}

// ===== JSON 파싱 =====
function extractJson(text: string): unknown {
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) return JSON.parse(codeBlock[1].trim());
  const arr = text.match(/\[[\s\S]*\]/);
  if (arr) return JSON.parse(arr[0]);
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) return JSON.parse(obj[0]);
  throw new Error('JSON 파싱 실패');
}

// ===== 시스템 프롬프트 =====
const MARKETING_SYSTEM = `당신은 글로벌 SNS 바이럴 마케팅 전문가입니다.
원칙: 초보자용 쉬운 한국어, 높은 CTR 후킹, 감정 스토리텔링, 데이터 신뢰성, 명확한 CTA.
반드시 유효한 JSON만 반환. 마크다운 코드 블록 없이 순수 JSON만.`;

// ===== 트렌드 가져오기 (Reddit - CORS 허용) =====
export async function fetchTrends() {
  const results: { id: string; title: string; source: string; description: string; traffic: string; relatedQueries: string[]; category: string; fetchedAt: string }[] = [];

  const subreddits = ['popular', 'technology', 'business', 'marketing'];

  for (const sub of subreddits) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=8`,
        { headers: { 'User-Agent': 'HookFlowAI/1.0' } }
      );
      if (!res.ok) continue;
      const data = await res.json();

      for (const post of data?.data?.children || []) {
        const d = post.data;
        if (d.stickied || d.score < 500 || d.over_18) continue;
        results.push({
          id: `reddit_${d.id}`,
          title: d.title,
          source: 'reddit',
          description: d.selftext?.slice(0, 300) || d.title,
          traffic: formatNum(d.score) + ' upvotes',
          relatedQueries: [d.subreddit, ...(d.link_flair_text ? [d.link_flair_text] : [])],
          category: d.subreddit,
          fetchedAt: new Date().toISOString(),
        });
      }
    } catch {}
  }

  // 중복 제거
  const seen = new Set<string>();
  return results.filter((t) => {
    const key = t.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ===== 후킹 콘텐츠 생성 =====
export async function generateHooks(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string,
  count: number = 3
) {
  const text = await generateText(
    MARKETING_SYSTEM,
    `트렌딩 토픽 기반 SNS 카루셀용 후킹 콘텐츠 ${count}개 생성.

토픽: ${topic.title}
설명: ${topic.description || topic.title}
키워드: ${(topic.relatedQueries || []).join(', ') || '없음'}
톤: ${tone}

각 콘텐츠 필드:
- headline: 후킹 제목 (한글 15자 이내)
- subheadline: 궁금증 유발 부제목
- bodyPoints: 핵심 포인트 5개 배열
- callToAction: 행동 유도 문구
- targetAudience: 타겟 독자

JSON 배열 반환: [{"headline":"...","subheadline":"...","bodyPoints":["..."],"callToAction":"...","targetAudience":"..."}]`,
    { temperature: 0.8 }
  );

  const parsed = extractJson(text);
  return Array.isArray(parsed) ? parsed : [parsed];
}

// ===== 카루셀 구조 생성 =====
export async function generateCarouselSlides(hook: {
  headline: string;
  subheadline: string;
  bodyPoints: string[];
  callToAction: string;
}) {
  const text = await generateText(
    MARKETING_SYSTEM,
    `후킹 콘텐츠를 Instagram 카루셀 7장으로 구성.

헤드라인: ${hook.headline}
서브: ${hook.subheadline}
포인트: ${(hook.bodyPoints || []).join(' | ')}
CTA: ${hook.callToAction}

슬라이드: 1(cover) 2-5(content) 6(stats) 7(cta)
색상: 다크(#0F172A~#1E293B), 포인트(#818CF8), 텍스트(#F8FAFC)

JSON 배열: [{"id":"slide_1","order":1,"type":"cover","title":"...","body":"...","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
    { temperature: 0.5 }
  );

  const parsed = extractJson(text);
  return Array.isArray(parsed) ? parsed : [parsed];
}

// ===== 랜딩 페이지 HTML 생성 =====
export async function generateLandingHtml(data: {
  heroTitle: string;
  heroSubtitle: string;
  features: { title: string; description: string }[];
  ctaText: string;
  companyName?: string;
  productName?: string;
}) {
  const text = await generateText(
    `전환율 높은 랜딩 페이지 웹 디자이너. Tailwind CSS CDN 사용. 다크 모드 한국어 디자인. <!DOCTYPE html>로 시작하는 완전한 HTML 반환. 코드 블록 없이 순수 HTML만.`,
    `랜딩 페이지 HTML 생성.
제목: ${data.heroTitle} / 부제목: ${data.heroSubtitle}
회사: ${data.companyName || ''} / 제품: ${data.productName || ''}
CTA: ${data.ctaText}
기능: ${data.features.map((f) => f.title + ': ' + f.description).join(', ')}

요구: 완전한 HTML, <script src="https://cdn.tailwindcss.com"></script>, Hero→기능→CTA→푸터, 반응형, 다크(#0F172A), 보라 액센트, CSS 애니메이션, 한국어`,
    { maxTokens: 8192, temperature: 0.4 }
  );

  const html = text.match(/<!DOCTYPE[\s\S]*/i);
  if (html) return html[0].replace(/```\s*$/g, '').trim();
  const block = text.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (block) return block[1].trim();
  return text.trim();
}

// ===== GenSpark 이미지 생성 =====
export async function generateImageViaGenSpark(prompt: string): Promise<string | null> {
  const key = getApiKey('genspark');
  if (!key) return null;

  try {
    const res = await fetch('https://api.genspark.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `Modern minimal social media background. Dark theme, purple/indigo gradients. NO text. ${prompt}`,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (b64) return `data:image/png;base64,${b64}`;
    return data?.data?.[0]?.url || null;
  } catch {
    return null;
  }
}

function formatNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M+';
  if (n >= 1000) return Math.round(n / 1000) + 'K+';
  return String(n);
}
