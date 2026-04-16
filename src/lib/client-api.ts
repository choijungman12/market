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
      model: 'claude-sonnet-4-20250514',
      max_tokens: opts.max || 4096,
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
      }
    );

    if (!res.ok) {
      console.warn('[NanoBanana] Gemini', res.status);
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
  const text = await callClaude(
    `글로벌 SNS 바이럴 마케팅 전문가. 모든 출력은 한국어. 오타 없이 정확한 맞춤법 사용. JSON만 반환.`,
    `다음 토픽으로 SNS 카루셀용 후킹 콘텐츠 ${count}개를 만드세요.

토픽: ${topic.title}
설명: ${topic.description}
키워드: ${(topic.relatedQueries || []).join(', ')}
톤: ${tone === 'informative' ? '정보 전달형 (데이터 중심)' : tone === 'provocative' ? '자극형 (논쟁/호기심)' : '스토리텔링 (감정/공감)'}

규칙:
- 모든 텍스트는 한국어
- 오타/맞춤법 오류 절대 불가
- headline: 시선을 사로잡는 제목 (15자 이내)
- subheadline: 궁금증 유발 부제목 (30자 이내)
- bodyPoints: 핵심 포인트 5개 (각 40자 이내)
- callToAction: 행동 유도 (예: "지금 무료로 받기")
- targetAudience: 타겟 독자

[{"headline":"...","subheadline":"...","bodyPoints":["...","...","...","...","..."],"callToAction":"...","targetAudience":"..."}]`,
    { temp: 0.8 }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== 카루셀 슬라이드 생성 =====
export async function generateCarouselSlides(hook: {
  headline: string; subheadline: string; bodyPoints: string[]; callToAction: string;
}) {
  const text = await callClaude(
    `SNS 카루셀 디자이너. 한국어만 사용. 오타 없는 완벽한 맞춤법. JSON만 반환.`,
    `Instagram 카루셀 7장 슬라이드 구성:

헤드라인: ${hook.headline}
서브: ${hook.subheadline}
포인트: ${hook.bodyPoints.join(' | ')}
CTA: ${hook.callToAction}

구성:
1장(cover): 강렬한 후킹 제목 + 부제목
2-5장(content): 핵심 포인트 (각 1개씩)
6장(stats): 통계/수치 데이터
7장(cta): CTA + 팔로우 유도

색상: bgColor=#0F172A~#1E293B, textColor=#F8FAFC, accentColor=#818CF8~#6366F1

[{"id":"slide_1","order":1,"type":"cover","title":"제목","body":"본문","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
    { temp: 0.5 }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== 카루셀 이미지 일괄 생성 =====
export async function generateSlideImages(slides: Record<string, unknown>[]): Promise<string[]> {
  if (!hasGeminiKey()) return slides.map(() => '');

  const results: string[] = [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const prompt = `Create a modern abstract background for a social media slide.
Theme: dark mode, purple and indigo gradients, minimal geometric shapes.
Slide topic: ${s.title}
Style: clean, professional, NO text or words in the image.
Aspect ratio: 1:1 square.`;

    const img = await generateNanoBananaImage(prompt);
    results.push(img || '');

    // rate limit
    if (i < slides.length - 1) await new Promise(r => setTimeout(r, 2000));
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
    `전환율 높은 랜딩 페이지 디자이너. 한국어 UI. 오타 금지. <!DOCTYPE html>로 시작하는 완전한 HTML 반환. 코드 블록(백틱) 없이 HTML만.`,
    `랜딩 페이지를 만드세요.

제목: ${data.heroTitle}
부제: ${data.heroSubtitle}
회사: ${data.companyName || '회사명'} | 제품: ${data.productName || '제품명'}
CTA: ${data.ctaText}
기능:
${data.features.map(f => `- ${f.title}: ${f.description}`).join('\n')}

필수:
1. <!DOCTYPE html> ~ </html> 완전한 파일
2. <script src="https://cdn.tailwindcss.com"></script>
3. Hero → 기능 소개 → CTA → 푸터
4. 다크 배경(#0F172A), 보라 액센트(#818CF8)
5. 반응형, CSS 애니메이션
6. 전부 한국어`,
    { max: 8192, temp: 0.4 }
  );

  const m = text.match(/<!DOCTYPE[\s\S]*/i);
  if (m) return m[0].replace(/```\s*$/g, '').trim();
  const b = text.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (b) return b[1].trim();
  return text.trim();
}
