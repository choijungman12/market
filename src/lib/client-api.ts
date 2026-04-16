// 클라이언트 사이드 API 호출 모듈 (gh-pages용)
// 브라우저에서 직접 AI API 호출

// ===== API 키/설정 관리 (localStorage) =====
export function getApiKey(provider: 'anthropic' | 'genspark'): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(`hookflow_${provider}_key`) || '';
}

export function setApiKey(provider: 'anthropic' | 'genspark', key: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`hookflow_${provider}_key`, key);
}

export function getGenSparkUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('hookflow_genspark_url') || '';
}

export function setGenSparkUrl(url: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hookflow_genspark_url', url);
}

export function getActiveProvider(): 'anthropic' | 'genspark' | 'none' {
  if (typeof window === 'undefined') return 'none';
  if (getApiKey('anthropic')) return 'anthropic';
  if (getApiKey('genspark') && getGenSparkUrl()) return 'genspark';
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

  console.log('[HookFlow] Claude API 호출 중...');

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
      temperature: options.temperature ?? 0.7,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[HookFlow] Claude API 에러:', res.status, err);
    throw new Error(`Claude API 오류 (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  console.log('[HookFlow] Claude 응답 길이:', text.length);
  return text;
}

// ===== GenSpark 직접 호출 (OpenAI 호환) =====
async function callGenSpark(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const key = getApiKey('genspark');
  const baseUrl = getGenSparkUrl();
  if (!key || !baseUrl) throw new Error('GenSpark API 키 또는 URL이 설정되지 않았습니다.');

  console.log('[HookFlow] GenSpark API 호출 중...', baseUrl);

  const res = await fetch(`${baseUrl}/chat/completions`, {
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
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens || 4096,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[HookFlow] GenSpark API 에러:', res.status, err);
    throw new Error(`GenSpark API 오류 (${res.status}): ${err.slice(0, 200)}`);
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
  console.log('[HookFlow] 활성 프로바이더:', provider);

  if (provider === 'anthropic') return callClaude(systemPrompt, userPrompt, options);
  if (provider === 'genspark') return callGenSpark(systemPrompt, userPrompt, options);

  throw new Error('API 키가 설정되지 않았습니다.\n\n상단 메뉴의 "설정(⚙)" 페이지에서 API 키를 입력해주세요.');
}

// ===== JSON 파싱 (강화) =====
function extractJson(text: string): unknown {
  // 1) ```json ... ``` 블록
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    try { return JSON.parse(codeBlock[1].trim()); } catch {}
  }
  // 2) 배열
  const arr = text.match(/\[[\s\S]*\]/);
  if (arr) {
    try { return JSON.parse(arr[0]); } catch {}
  }
  // 3) 객체
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) {
    try { return JSON.parse(obj[0]); } catch {}
  }
  console.error('[HookFlow] JSON 파싱 실패. 원문:', text.slice(0, 500));
  throw new Error('AI 응답을 파싱할 수 없습니다. 다시 시도해주세요.');
}

// ===== 시스템 프롬프트 =====
const MARKETING_SYSTEM = `당신은 글로벌 SNS 바이럴 마케팅 전문가입니다.
원칙:
1. 초보자용 쉬운 한국어
2. 높은 CTR 후킹 헤드라인
3. 감정 스토리텔링
4. 데이터 기반 신뢰성
5. 명확한 CTA

중요: 반드시 유효한 JSON만 반환하세요. 마크다운 코드블록(백틱) 없이 순수 JSON만 출력하세요.`;

// ===== 트렌드 가져오기 (Reddit) =====
export async function fetchTrends() {
  const results: { id: string; title: string; source: string; description: string; traffic: string; relatedQueries: string[]; category: string; fetchedAt: string }[] = [];

  const subreddits = ['popular', 'technology', 'business', 'marketing'];

  await Promise.all(
    subreddits.map(async (sub) => {
      try {
        const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=8`);
        if (!res.ok) return;
        const data = await res.json();

        for (const post of data?.data?.children || []) {
          const d = post.data;
          if (d.stickied || d.score < 300 || d.over_18) continue;
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
      } catch (e) {
        console.warn(`[HookFlow] Reddit r/${sub} 실패:`, e);
      }
    })
  );

  // 중복 제거 + 정렬 (upvote 높은 순)
  const seen = new Set<string>();
  return results
    .filter((t) => {
      const key = t.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 30);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => {
      const scoreA = parseInt(a.traffic) || 0;
      const scoreB = parseInt(b.traffic) || 0;
      return scoreB - scoreA;
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
    `트렌딩 토픽 기반 SNS 카루셀용 후킹 콘텐츠 ${count}개를 생성하세요.

토픽: ${topic.title}
설명: ${topic.description || topic.title}
키워드: ${(topic.relatedQueries || []).join(', ') || '없음'}
톤: ${tone}

각 콘텐츠에 다음 필드 포함:
- headline: 시선을 사로잡는 후킹 제목 (한글 15자 이내)
- subheadline: 궁금증을 유발하는 부제목 (한글 30자 이내)
- bodyPoints: 카루셀 슬라이드 핵심 포인트 5개 (각 50자 이내)
- callToAction: 행동 유도 문구
- targetAudience: 타겟 독자 설명

아래 형식의 JSON 배열로만 반환하세요:
[{"headline":"제목","subheadline":"부제목","bodyPoints":["포인트1","포인트2","포인트3","포인트4","포인트5"],"callToAction":"CTA","targetAudience":"타겟"}]`,
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
    `후킹 콘텐츠를 Instagram 카루셀 7장 슬라이드로 구성하세요.

헤드라인: ${hook.headline}
서브헤드라인: ${hook.subheadline}
핵심 포인트: ${(hook.bodyPoints || []).join(' | ')}
CTA: ${hook.callToAction}

슬라이드 구성:
1장(cover): 강렬한 후킹 제목
2-5장(content): 각 핵심 포인트
6장(stats): 통계/데이터
7장(cta): CTA + 팔로우 유도

색상: 배경(#0F172A~#1E293B), 포인트(#818CF8, #6366F1), 텍스트(#F8FAFC)

아래 형식의 JSON 배열로만 반환:
[{"id":"slide_1","order":1,"type":"cover","title":"슬라이드 제목","body":"본문","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
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
    `당신은 전환율 높은 랜딩 페이지를 만드는 웹 디자이너입니다.
Tailwind CSS CDN을 사용하여 완전한 HTML 파일을 생성합니다.
반드시 <!DOCTYPE html>로 시작하는 완전한 HTML을 반환하세요.
마크다운 코드 블록(백틱) 없이 순수 HTML만 반환하세요.`,
    `다음 정보로 랜딩 페이지 HTML을 생성하세요.

제목: ${data.heroTitle}
부제목: ${data.heroSubtitle}
회사: ${data.companyName || '회사명'}
제품: ${data.productName || '제품명'}
CTA: ${data.ctaText}
기능:
${data.features.map((f) => `- ${f.title}: ${f.description}`).join('\n')}

요구사항:
1. <!DOCTYPE html>부터 </html>까지 완전한 HTML
2. <script src="https://cdn.tailwindcss.com"></script> 포함
3. 섹션: Hero → 기능 소개 → CTA → 푸터
4. 반응형 디자인
5. 다크 배경(#0F172A) + 보라색 액센트(#818CF8)
6. 부드러운 CSS 애니메이션
7. 한국어 UI`,
    { maxTokens: 8192, temperature: 0.4 }
  );

  // HTML 추출
  const doctype = text.match(/<!DOCTYPE[\s\S]*/i);
  if (doctype) return doctype[0].replace(/```\s*$/g, '').trim();

  const block = text.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (block) return block[1].trim();

  return text.trim();
}

function formatNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M+';
  if (n >= 1000) return Math.round(n / 1000) + 'K+';
  return String(n);
}
