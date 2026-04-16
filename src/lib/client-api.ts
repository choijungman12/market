// HookFlow AI - 클라이언트 사이드 통합 API
// Anthropic Claude (텍스트) + Gemini NanoBanana (이미지)

// ===== localStorage 키 관리 =====
function getKey(name: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`hookflow_${name}`) || '';
}
function setKey(name: string, val: string) {
  if (typeof window !== 'undefined') localStorage.setItem(`hookflow_${name}`, val);
}

export const getApiKey = (p: 'anthropic' | 'gemini') => getKey(`${p}_key`);
export const setApiKey = (p: 'anthropic' | 'gemini', k: string) => setKey(`${p}_key`, k);

export function getActiveProvider(): 'anthropic' | 'none' {
  if (typeof window === 'undefined') return 'none';
  return getKey('anthropic_key') ? 'anthropic' : 'none';
}
export function hasGeminiKey(): boolean {
  return !!getKey('gemini_key');
}

// ===== Claude API 호출 =====
async function callClaude(system: string, user: string, opts: { temp?: number; max?: number } = {}): Promise<string> {
  const key = getKey('anthropic_key');
  if (!key) throw new Error('Anthropic API 키를 설정 페이지에서 입력해주세요.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: opts.max || 2048,
      temperature: opts.temp ?? 0.7,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!res.ok) {
    const e = await res.text();
    throw new Error(`Claude 오류(${res.status}): ${e.slice(0, 150)}`);
  }
  const d = await res.json();
  return d.content?.[0]?.text || '';
}

// ===== NanoBanana (Gemini) 이미지 생성 =====
export async function generateNanoBananaImage(prompt: string): Promise<string | null> {
  const key = getKey('gemini_key');
  if (!key) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('[NanoBanana] Gemini', res.status, errText.slice(0, 300));
      return null;
    }

    const data = await res.json();
    for (const part of data?.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.warn('[NanoBanana] 오류:', e);
    return null;
  }
}

// ===== JSON 파싱 =====
function extractJson(text: string): unknown {
  for (const pattern of [/```(?:json)?\s*([\s\S]*?)```/, /\[[\s\S]*\]/, /\{[\s\S]*\}/]) {
    const m = text.match(pattern);
    if (m) { try { return JSON.parse(m[1] || m[0]); } catch {} }
  }
  throw new Error('AI 응답 파싱 실패. 다시 시도해주세요.');
}

// ===== 트렌드 =====
export type TrendItem = {
  id: string; title: string; source: string; description: string;
  traffic: string; relatedQueries: string[]; category: string; fetchedAt: string;
};

export async function fetchTrends(): Promise<TrendItem[]> {
  // Reddit 시도
  try {
    const results: TrendItem[] = [];
    const subs = ['popular', 'technology', 'business'];
    const responses = await Promise.all(
      subs.map(s => fetch(`https://www.reddit.com/r/${s}/hot.json?limit=8`).then(r => r.ok ? r.json() : null).catch(() => null))
    );
    for (const data of responses) {
      for (const p of data?.data?.children || []) {
        const d = p.data;
        if (d.stickied || d.score < 300 || d.over_18) continue;
        results.push({
          id: `r_${d.id}`, title: d.title, source: 'reddit',
          description: d.selftext?.slice(0, 200) || d.title,
          traffic: (d.score >= 1000 ? Math.round(d.score / 1000) + 'K+' : d.score + '') + ' upvotes',
          relatedQueries: [d.subreddit], category: d.subreddit, fetchedAt: new Date().toISOString(),
        });
      }
    }
    if (results.length > 0) return results;
  } catch {}

  // Claude AI 폴백
  if (getActiveProvider() !== 'none') {
    try {
      const text = await callClaude(
        '글로벌 트렌드 분석가. JSON 배열만 반환.',
        `현재 전 세계에서 가장 바이럴한 트렌딩 토픽 12개를 알려주세요.
카테고리: 기술, 비즈니스, 마케팅, 라이프스타일 혼합.
SNS 마케팅 콘텐츠로 만들기 좋은 주제 위주.

JSON: [{"title":"제목","description":"설명 1-2문장","traffic":"추정 검색량","category":"카테고리","relatedQueries":["키워드1"]}]`,
        { temp: 0.9, max: 2048 }
      );
      const arr = extractJson(text) as Record<string, unknown>[];
      return (Array.isArray(arr) ? arr : []).map((t, i) => ({
        id: `ai_${i}`, title: String(t.title), source: 'google',
        description: String(t.description), traffic: String(t.traffic || '100K+'),
        relatedQueries: Array.isArray(t.relatedQueries) ? t.relatedQueries.map(String) : [],
        category: String(t.category || 'trending'), fetchedAt: new Date().toISOString(),
      }));
    } catch {}
  }

  // 기본값
  return [
    { id: 'd1', title: 'AI 에이전트 혁명 2026', source: 'google', description: '자율형 AI 에이전트가 전 세계 기업을 변화시키고 있습니다.', traffic: '500K+', relatedQueries: ['AI 자동화'], category: '기술', fetchedAt: new Date().toISOString() },
    { id: 'd2', title: 'AI로 월 1000만원 수익 만들기', source: 'google', description: '크리에이터들이 AI 도구로 자동 수익 파이프라인을 구축하는 방법.', traffic: '300K+', relatedQueries: ['AI 부업'], category: '비즈니스', fetchedAt: new Date().toISOString() },
    { id: 'd3', title: '숏폼 영상 마케팅 비밀', source: 'google', description: '틱톡과 릴스가 60% 더 높은 참여율을 기록. 성공 전략 공개.', traffic: '1M+', relatedQueries: ['틱톡 마케팅'], category: '마케팅', fetchedAt: new Date().toISOString() },
    { id: 'd4', title: '노코드로 앱 만들어 돈 벌기', source: 'google', description: '코딩 없이 앱을 만들고 출시하는 $50B 노코드 시장 분석.', traffic: '200K+', relatedQueries: ['노코드'], category: '기술', fetchedAt: new Date().toISOString() },
    { id: 'd5', title: '퍼스널 브랜딩 필수 시대', source: 'google', description: '2026년 커리어 성장과 사업 성공을 위한 퍼스널 브랜딩 전략.', traffic: '150K+', relatedQueries: ['퍼스널 브랜드'], category: '마케팅', fetchedAt: new Date().toISOString() },
    { id: 'd6', title: '1인 SaaS로 월 1000만원', source: 'google', description: '혼자서 작은 SaaS 제품을 만들어 월 반복 수익을 올리는 방법.', traffic: '100K+', relatedQueries: ['마이크로SaaS'], category: '비즈니스', fetchedAt: new Date().toISOString() },
  ];
}

// ===== 후킹 콘텐츠 생성 =====
export async function generateHooks(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string, count = 3
) {
  const toneMap: Record<string, string> = { informative: '정보형', provocative: '자극형', storytelling: '스토리형' };
  const text = await callClaude(
    'SNS 마케팅 전문가. 한국어. 오타금지. JSON만.',
    `토픽:"${topic.title}" 톤:${toneMap[tone] || tone}
후킹콘텐츠 ${count}개. [{"headline":"15자이내","subheadline":"30자이내","bodyPoints":["5개각40자"],"callToAction":"행동유도","targetAudience":"타겟"}]`,
    { temp: 0.8, max: 1500 }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== 카루셀 슬라이드 생성 =====
export async function generateCarouselSlides(hook: {
  headline: string; subheadline: string; bodyPoints: string[]; callToAction: string;
}) {
  const text = await callClaude(
    '카루셀디자이너. 한국어. 오타금지. JSON만.',
    `"${hook.headline}" 카루셀7장. 1cover,2-5content,6stats,7cta. 포인트:${hook.bodyPoints.join('|')} CTA:${hook.callToAction}
색상:bg=#0F172A,text=#F8FAFC,accent=#818CF8
[{"id":"slide_1","order":1,"type":"cover","title":"","body":"","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
    { temp: 0.5, max: 1500 }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== 카루셀 이미지 일괄 생성 (병렬 3개씩) =====
export async function generateSlideImages(slides: Record<string, unknown>[]): Promise<string[]> {
  if (!hasGeminiKey()) return slides.map(() => '');

  const results: string[] = new Array(slides.length).fill('');
  const batchSize = 3;

  for (let i = 0; i < slides.length; i += batchSize) {
    const batch = slides.slice(i, i + batchSize);
    const promises = batch.map((s, j) =>
      generateNanoBananaImage(
        `Dark abstract gradient background, purple indigo, minimal, no text. Topic: ${String(s.title).slice(0, 30)}`
      ).then(img => { results[i + j] = img || ''; })
    );
    await Promise.all(promises);
  }
  return results;
}

// ===== 랜딩 페이지 HTML =====
export async function generateLandingHtml(data: {
  heroTitle: string; heroSubtitle: string;
  features: { title: string; description: string }[];
  ctaText: string; companyName?: string; productName?: string;
}) {
  const text = await callClaude(
    '랜딩페이지 디자이너. <!DOCTYPE html>완전HTML반환. 백틱없이HTML만.',
    `제목:${data.heroTitle} 부제:${data.heroSubtitle} 회사:${data.companyName||'회사'} 제품:${data.productName||'제품'} CTA:${data.ctaText}
기능:${data.features.map(f=>f.description).join(',')}
Tailwind CDN, 다크(#0F172A), 보라(#818CF8), 반응형, 한국어, Hero→기능→CTA→푸터`,
    { max: 4096, temp: 0.4 }
  );

  const m = text.match(/<!DOCTYPE[\s\S]*/i);
  if (m) return m[0].replace(/```\s*$/g, '').trim();
  const b = text.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (b) return b[1].trim();
  return text.trim();
}
