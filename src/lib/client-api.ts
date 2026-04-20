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

// ===== Claude API 호출 (웹 검색 옵션) =====
async function callClaude(system: string, user: string, opts: { temp?: number; max?: number; webSearch?: boolean } = {}): Promise<string> {
  const key = getKey('anthropic_key');
  if (!key) throw new Error('Anthropic API 키를 설정 페이지에서 입력해주세요.');

  const body: Record<string, unknown> = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: opts.max || 2048,
    temperature: opts.temp ?? 0.7,
    system,
    messages: [{ role: 'user', content: user }],
  };

  if (opts.webSearch) {
    body.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 }];
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const e = await res.text();
    if (res.status === 429) {
      // Rate Limit → 20초 대기 후 자동 재시도 (1회)
      console.warn('[Claude] Rate limit - 20초 후 자동 재시도');
      await new Promise(r => setTimeout(r, 20000));
      const retry = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify(body),
      });
      if (retry.ok) {
        const d = await retry.json();
        let text = '';
        for (const block of d.content || []) {
          if (block.type === 'text') text += block.text;
        }
        return text;
      }
      throw new Error('분당 요청 한도(Rate Limit) 초과. 1~2분 후 다시 시도해주세요.');
    }
    if (res.status === 529 || res.status === 503) {
      throw new Error('Claude 서버가 일시적으로 과부하 상태입니다. 잠시 후 재시도해주세요.');
    }
    throw new Error(`Claude 오류(${res.status}): ${e.slice(0, 150)}`);
  }
  const d = await res.json();
  // 웹 검색 결과 + 최종 텍스트 모두 합침
  let text = '';
  for (const block of d.content || []) {
    if (block.type === 'text') text += block.text;
  }
  return text;
}

// ===== NanoBanana (Gemini) 이미지 생성 =====
export async function generateNanoBananaImage(prompt: string): Promise<string | null> {
  const key = getKey('gemini_key');
  if (!key) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${key}`,
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

// ===== JSON 파싱 (견고하게) =====
function extractJson(text: string): unknown {
  if (!text || !text.trim()) throw new Error('AI 응답이 비어있습니다.');

  // 1. 코드블록
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    try { return JSON.parse(codeBlock[1].trim()); } catch {}
  }

  // 2. 가장 큰 배열 찾기 (중첩 지원)
  const findArrays = (str: string): string[] => {
    const results: string[] = [];
    let depth = 0, start = -1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '[') { if (depth === 0) start = i; depth++; }
      else if (str[i] === ']') { depth--; if (depth === 0 && start !== -1) { results.push(str.slice(start, i + 1)); start = -1; } }
    }
    return results;
  };

  const arrays = findArrays(text).sort((a, b) => b.length - a.length);
  for (const arr of arrays) {
    try { return JSON.parse(arr); } catch {}
  }

  // 3. 객체
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) {
    try { return JSON.parse(obj[0]); } catch {}
  }

  console.error('[HookFlow] JSON 파싱 실패 원문 (처음 500자):', text.slice(0, 500));
  throw new Error(`AI 응답 파싱 실패. 다시 시도해주세요. (원문: ${text.slice(0, 100)})`);
}

// ===== 카테고리 정의 =====
export const CATEGORIES = [
  { key: 'all', label: '전체', emoji: '🔥' },
  { key: '음식', label: '음식/맛집', emoji: '🍽' },
  { key: '다이어트', label: '다이어트', emoji: '💪' },
  { key: '건강', label: '건강/의약', emoji: '🏥' },
  { key: '식단', label: '식단/영양', emoji: '🥗' },
  { key: '쇼핑', label: '쇼핑트렌드', emoji: '🛍' },
  { key: '화장품', label: '화장품/뷰티', emoji: '💄' },
  { key: '의류', label: '의류/패션', emoji: '👗' },
  { key: '인플루언서', label: '인플루언서', emoji: '📱' },
  { key: '셀럽', label: '연예인/셀럽', emoji: '⭐' },
  { key: '테크', label: 'IT/테크', emoji: '💻' },
  { key: '재테크', label: '재테크/부업', emoji: '💰' },
  { key: '시즌', label: '시즌/이벤트', emoji: '📅' },
  { key: '글로벌', label: '글로벌/나라별', emoji: '🌍' },
  { key: '지혜', label: '지혜/철학/종교', emoji: '🕊' },
  { key: '연애', label: '연애/관계/성', emoji: '💕' },
] as const;

export type CategoryKey = typeof CATEGORIES[number]['key'];

export type TrendItem = {
  id: string; title: string; source: string; description: string;
  traffic: string; views: string; relatedQueries: string[]; category: string; fetchedAt: string;
};

// ===== 24시간 캐시 =====
const CACHE_KEY = 'hookflow_trends_cache';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6시간 (하루 4번 업데이트)

function getCachedTrends(): TrendItem[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL) return data;
    localStorage.removeItem(CACHE_KEY);
  } catch {}
  return null;
}

function setCachedTrends(data: TrendItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

// ===== 트렌드 로딩 (24시간 캐시 + Claude AI) =====
export async function fetchTrends(forceRefresh = false): Promise<TrendItem[]> {
  if (!forceRefresh) {
    const cached = getCachedTrends();
    if (cached && cached.length > 0) return cached;
  }

  if (getActiveProvider() === 'none') return getDefaultTrends();

  try {
    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

    const text = await callClaude(
      `2026년 한국/글로벌 실시간 트렌드 분석가.
필수: 반드시 실제 웹 검색으로 오늘 날짜의 실제 트렌드 수집.
네이버 실시간 검색어, 구글 트렌드, 유튜브 인기 동영상, 트위터/X 트렌딩, 해외 뉴스 등에서 실제 데이터만 수집.
추측/가상 데이터 절대 금지. 오래된 자료 금지.
한국어 오타/맞춤법 완벽. JSON만 반환.`,
      `오늘은 ${today}입니다.

웹 검색을 사용해서 다음을 조사하세요:
1. "네이버 실시간 급상승" 검색 - 한국 실시간 검색어
2. "구글 트렌드 한국" 검색 - 한국 Google Trends 오늘
3. "유튜브 인기 동영상 한국" 검색 - 유튜브 트렌딩
4. "오늘의 뉴스 바이럴" 검색 - 핫이슈 뉴스

검색 결과에서 실제 트렌드 30개 이상을 카테고리별로 분류:
- 음식 / 다이어트 / 건강 / 식단 / 쇼핑 / 화장품 / 의류
- 인플루언서 / 셀럽 / 테크 / 재테크
- 시즌 / 글로벌 / 지혜 / 연애

각 항목 (실제 검색 결과만 사용):
- title: 실제 트렌딩 키워드 또는 뉴스 제목 (20자 이내)
- description: 왜 지금 핫한지 실제 사실 기반 (2문장)
- traffic: 실제 추정 검색량 (예: 네이버 500K+)
- views: 실제 SNS 조회수 (예: 유튜브 5M views)
- category: 해당 카테고리
- relatedQueries: 실제 연관 검색어 2개

검증 필수: 각 항목이 실제 2026년 4월 트렌드인지 확인.
추측 데이터 금지.

JSON 배열만 반환:
[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,
      { temp: 0.3, max: 6000, webSearch: true }
    );

    const arr = extractJson(text) as Record<string, unknown>[];
    const trends = (Array.isArray(arr) ? arr : []).map((t, i) => ({
      id: `t_${i}_${Date.now()}`,
      title: String(t.title || ''),
      source: 'AI 분석',
      description: String(t.description || ''),
      traffic: String(t.traffic || '10K+'),
      views: String(t.views || '100K views'),
      relatedQueries: Array.isArray(t.relatedQueries) ? t.relatedQueries.map(String) : [],
      category: String(t.category || '기타'),
      fetchedAt: new Date().toISOString(),
    }));

    if (trends.length > 0) {
      setCachedTrends(trends);
      return trends;
    }
  } catch (e) {
    console.error('[HookFlow] AI 트렌드 생성 실패:', e);
  }

  return getDefaultTrends();
}

function getDefaultTrends(): TrendItem[] {
  return [
    { id: 'd1', title: '제로 칼로리 디저트 열풍', source: 'AI', description: '제로 칼로리 디저트가 SNS를 점령. 다이어트 중에도 즐기는 죄책감 없는 간식 트렌드.', traffic: '800K+', views: '5M views', relatedQueries: ['제로슈거', '다이어트간식'], category: '음식', fetchedAt: new Date().toISOString() },
    { id: 'd2', title: '12-3-30 워킹 다이어트', source: 'AI', description: '틱톡에서 폭발적 인기. 경사 12, 속도 3, 30분 걷기로 체중 감량 성공 사례 속출.', traffic: '1.2M+', views: '15M views', relatedQueries: ['걷기다이어트', '틱톡운동'], category: '다이어트', fetchedAt: new Date().toISOString() },
    { id: 'd3', title: '장건강이 피부를 바꾼다', source: 'AI', description: '프로바이오틱스와 장건강이 피부 개선에 직접 영향. 피부과 전문의 추천 루틴 화제.', traffic: '500K+', views: '3M views', relatedQueries: ['장건강', '피부관리'], category: '건강', fetchedAt: new Date().toISOString() },
    { id: 'd4', title: '고단백 도시락 밀프렙', source: 'AI', description: '일주일치 고단백 도시락을 한번에 준비하는 밀프렙 콘텐츠가 직장인들 사이에서 대유행.', traffic: '300K+', views: '2M views', relatedQueries: ['밀프렙', '고단백식단'], category: '식단', fetchedAt: new Date().toISOString() },
    { id: 'd5', title: '무신사 여름 세일 핫딜', source: 'AI', description: '무신사 시즌 세일 시작. 최대 80% 할인 품목 정리 콘텐츠 조회수 폭발.', traffic: '600K+', views: '4M views', relatedQueries: ['무신사세일', '여름패션'], category: '쇼핑', fetchedAt: new Date().toISOString() },
    { id: 'd6', title: '선크림 하나로 톤업 완성', source: 'AI', description: '톤업 선크림 비교 리뷰 영상이 화제. 화장 없이 피부 보정 효과 검증.', traffic: '400K+', views: '6M views', relatedQueries: ['톤업선크림', '데일리선케어'], category: '화장품', fetchedAt: new Date().toISOString() },
    { id: 'd7', title: '올드머니룩 코디법', source: 'AI', description: '조용한 럭셔리 "올드머니룩"이 패션 트렌드 1위. 기본 아이템으로 고급스러운 스타일링.', traffic: '700K+', views: '8M views', relatedQueries: ['올드머니룩', '미니멀패션'], category: '의류', fetchedAt: new Date().toISOString() },
    { id: 'd8', title: '쯔양 복귀 먹방 1000만뷰', source: 'AI', description: '쯔양의 복귀 먹방 영상이 1000만 뷰를 돌파. 유튜브 실시간 트렌딩 1위 기록.', traffic: '2M+', views: '10M views', relatedQueries: ['쯔양', '먹방유튜버'], category: '인플루언서', fetchedAt: new Date().toISOString() },
    { id: 'd9', title: 'BTS 진 솔로 컴백', source: 'AI', description: 'BTS 진의 솔로 앨범 발매 소식에 전 세계 팬덤이 들끓는 중. 선주문량 역대급.', traffic: '5M+', views: '50M views', relatedQueries: ['BTS진', 'K-POP'], category: '셀럽', fetchedAt: new Date().toISOString() },
    { id: 'd10', title: 'AI로 월 500만원 부업', source: 'AI', description: 'ChatGPT와 AI 도구로 부업하는 실제 사례 모음. 초보자도 따라할 수 있는 가이드.', traffic: '1M+', views: '7M views', relatedQueries: ['AI부업', '자동수익'], category: '재테크', fetchedAt: new Date().toISOString() },
    { id: 'd11', title: 'Apple Vision Pro 2 출시', source: 'AI', description: 'Apple Vision Pro 2세대 공개. 가격 절반에 성능 2배. 국내 출시일 확정.', traffic: '800K+', views: '4M views', relatedQueries: ['비전프로', '애플신제품'], category: '테크', fetchedAt: new Date().toISOString() },
    { id: 'd12', title: '아이브 월드투어 티켓팅 전쟁', source: 'AI', description: '아이브 첫 월드투어 티켓 오픈과 동시에 전석 매진. 리셀 가격 10배 치솟아.', traffic: '3M+', views: '20M views', relatedQueries: ['아이브', '콘서트티켓'], category: '셀럽', fetchedAt: new Date().toISOString() },
    { id: 'd13', title: '5월 어버이날 감동 선물 TOP 10', source: 'AI', description: '2026년 어버이날 선물 트렌드. 건강식품부터 체험형 선물까지 가성비 랭킹.', traffic: '600K+', views: '3M views', relatedQueries: ['어버이날', '효도선물'], category: '시즌', fetchedAt: new Date().toISOString() },
    { id: 'd14', title: '일본 벚꽃 명소 2026 업데이트', source: 'AI', description: '2026년 일본 벚꽃 개화 시기 확정. 새로운 숨은 명소와 가성비 여행 루트 공개.', traffic: '400K+', views: '2M views', relatedQueries: ['일본여행', '벚꽃명소'], category: '글로벌', fetchedAt: new Date().toISOString() },
    { id: 'd15', title: '마음이 힘들 때 읽는 법구경', source: 'AI', description: '불교 경전 법구경 속 지혜의 말씀. 현대인의 번아웃을 치유하는 2600년 된 처방전.', traffic: '200K+', views: '1.5M views', relatedQueries: ['명상', '마음치유'], category: '지혜', fetchedAt: new Date().toISOString() },
    { id: 'd16', title: '2026 연애 트렌드 대반전', source: 'AI', description: 'Z세대의 새로운 연애 문화 "슬로우 데이팅"이 전 세계적 트렌드. 빠른 만남보다 천천히 알아가는 관계 선호.', traffic: '700K+', views: '8M views', relatedQueries: ['슬로우데이팅', '연애트렌드'], category: '연애', fetchedAt: new Date().toISOString() },
    { id: 'd17', title: '커플 심리테스트 1억뷰 돌파', source: 'AI', description: '틱톡에서 유행하는 커플 궁합 심리테스트가 1억 뷰 돌파. 연인 관계 진단 콘텐츠 폭발.', traffic: '500K+', views: '100M views', relatedQueries: ['커플테스트', '연애심리'], category: '연애', fetchedAt: new Date().toISOString() },
  ];
}

// ===== 후킹 콘텐츠 생성 (웹검색 옵션) =====
export async function generateHooks(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string, count = 3,
  useWebSearch: boolean = false  // 기본 OFF (rate limit 방지)
) {
  const toneMap: Record<string, string> = { informative: '정보형', provocative: '자극형', storytelling: '스토리형' };

  const system = useWebSearch
    ? '한국 SNS 마케팅 작가. 웹 검색 후 JSON만 출력. 설명 금지.'
    : '한국 SNS 마케팅 작가. JSON만 출력. 설명 금지. 오타 금지.';

  const user = useWebSearch
    ? `"${topic.title}" ${toneMap[tone] || tone} 대본 ${count}개. 웹 검색으로 최신 팩트 수집 후 JSON 배열만 반환:
[{"headline":"15자","subheadline":"30자","bodyPoints":["팩트+숫자","","","",""],"callToAction":"","targetAudience":""}]`
    : `"${topic.title}" ${toneMap[tone] || tone} 대본 ${count}개. JSON 배열만:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`;

  const text = await callClaude(system, user, {
    temp: 0.6,
    max: useWebSearch ? 12000 : 3000,
    webSearch: useWebSearch,
  });
  try {
    const p = extractJson(text);
    return Array.isArray(p) ? p : [p];
  } catch {
    // 1차 실패 → 웹검색 없이 빠른 재시도
    console.warn('[HookFlow] 후킹 1차 파싱 실패, 웹검색 없이 재시도');
    const retryText = await callClaude(
      'SNS 마케팅 작가. 순수 JSON 배열만. 설명 금지.',
      `"${topic.title}" ${toneMap[tone] || tone} 대본 ${count}개. 형식:
[{"headline":"15자","subheadline":"30자","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,
      { temp: 0.5, max: 3000 }
    );
    const p = extractJson(retryText);
    return Array.isArray(p) ? p : [p];
  }
}

// ===== SNS 이미지 대본 생성 (궁금증 유발 내러티브) =====
export async function generateCarouselSlides(hook: {
  headline: string; subheadline: string; bodyPoints: string[]; callToAction: string;
}, count: number = 5) {
  const text = await callClaude(
    `당신은 한국 SNS 바이럴 콘텐츠 작가입니다.

**절대 금지 사항:**
- 부제에 "Proof:", "Result:", "Differentiation:", "핵심 포인트" 같은 레이블 작성 절대 금지
- 학술적/설명적 문구 금지
- "증거:", "결과:", "근거:" 같은 단어 금지

**부제 작성 원칙 (필수):**
- 답을 주지 말고 **질문만 남기기** - 독자가 다음 장으로 넘기도록
- 미완성 긴장: "근데 그게 문제였습니다", "그때는 몰랐어요"
- 반전 예고: "전문가가 틀렸습니다", "정반대였습니다"
- 공범 유도: "사실 저도 속았어요", "우리만 모릅니다"
- 감정 암시: "심장이 뛰었습니다", "눈을 의심했어요"

**${count}장 구성 (긴장감 상승 → 반전 → 행동):**
- 1장 (Hook): 충격적 주장 or 놀라운 결과 먼저 제시
- 2~${count-2}장: 미스터리 쌓기 → 정보 공개 → 반전
- ${count-1}장: 클라이맥스 (핵심 반전/결론)
- ${count}장 (CTA): 행동 유도 + 여운

**규칙:**
- 한국어 오타 절대 금지
- 숫자 → 감정 연결 ("52% 증가" ❌ → "두배 효과" ⭕)
- JSON만 반환 (코드블록 금지)`,
    `주제: "${hook.headline}"
팩트: ${hook.bodyPoints.join(' | ')}
CTA: ${hook.callToAction}

궁금증 유발 ${count}장 캐러셀 대본:

각 장 필드:
- title: 충격/공감/호기심 (10-15자, 강한 어그로)
- subtitle: **답을 주지 않고 다음 슬라이드 궁금하게** (15-25자)
  예: "근데 그게 전부가 아니었습니다", "이게 바로 그 이유입니다", "지금부터 진짜 시작입니다"
  절대 금지: "Proof:", "Result:", "핵심 포인트"
- body: 내용 풀어서 설명 (60-100자, 쉬운 예시)
- imagePrompt: DSLR 사실적 한국 장면 (인물/장소/행동/감정/스타일 5요소 영어로)
  예: "30대 한국 남성이 모던한 사무실에서 노트북 화면을 놀란 표정으로 보는 모습, realistic photo, cinematic lighting, 4k"
- textEmphasis: 이미지에 쓸 큰 한국어 텍스트 (짧게)
- colorScheme: 색상 (예: "충격의 레드+블랙", "신뢰의 블루+화이트")
- emotion: 유도 감정 (예: "뭐야 진짜?", "나도 해볼까")

JSON 배열 (type 필드는 내부 사용, 사용자에게는 안 보임):
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "Hook",
    "title": "",
    "subtitle": "답을 주지 않는 궁금증 부제",
    "body": "",
    "imagePrompt": "",
    "textEmphasis": "",
    "colorScheme": "",
    "emotion": ""
  }
]`,
    { temp: 0.7, max: 8000 }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== SNS 이미지 일괄 생성 (대본 텍스트 포함 사실적 이미지) =====
export async function generateSlideImages(
  slides: Record<string, unknown>[],
  platform: 'instagram' | 'tiktok' | 'facebook' = 'instagram'
): Promise<string[]> {
  if (!hasGeminiKey()) return slides.map(() => '');

  const ratio: Record<string, string> = {
    instagram: '정사각형 1:1',
    tiktok: '세로 9:16',
    facebook: '가로 16:9',
  };

  const results: string[] = new Array(slides.length).fill('');

  for (let i = 0; i < slides.length; i += 2) {
    const batch = slides.slice(i, i + 2);
    const promises = batch.map((s, j) => {
      const idx = i + j;
      const title = String(s.title || '');
      const subtitle = String(s.subtitle || '');
      const textEmphasis = String(s.textEmphasis || title);
      const imagePromptDetail = String(s.imagePrompt || '');
      const colorScheme = String(s.colorScheme || '');
      const isLast = idx === slides.length - 1;

      const prompt = `한국 SNS 콘텐츠 이미지 생성.

[이미지 장면 묘사 - 반드시 이 내용을 사실적으로 표현]
${imagePromptDetail}

[색상 톤]
${colorScheme || '다크 모드 (#0F172A) + 보라 액센트 (#818CF8)'}

[한국어 텍스트 오버레이 - 반드시 이대로 정확히 표기]
상단 또는 하단에 큰 한국어 텍스트:
"${textEmphasis}"
${subtitle ? `\n그 아래 작은 한국어 부제:\n"${subtitle}"` : ''}

[텍스트 배치 규칙]
- 중앙 금지, 반드시 상단 또는 하단 배치
- 흰색 두꺼운 고딕체 + 검정 그림자로 선명하게
- 인물 얼굴 가리지 않도록 주의
${isLast ? '- CTA 느낌, "지금 시작" 버튼 느낌' : ''}

[필수 포함 요소 - 5가지]
1. 인물: 실제 한국인 (성별/나이 구체화)
2. 장소: 구체적 공간
3. 행동: 동작과 표정 표현
4. 감정: 공감 유도
5. 스타일: DSLR 촬영, realistic, cinematic, 4k

[절대 금지]
- 추상적 그라데이션 배경 (반드시 실제 사진)
- AI/일러스트 스타일
- 한국어 오타, 자모음 깨짐
- 제시된 문구 외 다른 한국어 생성
- 중앙에 텍스트 배치

[비율] ${ratio[platform]}

출력 전 검증: 이미지 내 모든 한국어가 "${textEmphasis}"와 "${subtitle}"와 정확히 일치하는지 확인.`;

      return generateNanoBananaImage(prompt)
        .then(img => { results[idx] = img || ''; })
        .catch(e => { console.warn(`[Image ${idx+1}] 실패:`, e); results[idx] = ''; });
    });

    await Promise.allSettled(promises);
    if (i + 2 < slides.length) await new Promise(r => setTimeout(r, 3000));
  }
  return results;
}

// ===== 개별 이미지 재생성 =====
export async function regenerateSingleImage(
  slide: Record<string, unknown>,
  platform: 'instagram' | 'tiktok' | 'facebook' = 'instagram',
  isFirst: boolean = false,
  isLast: boolean = false
): Promise<string> {
  const title = String(slide.title || '');
  const subtitle = String(slide.subtitle || '');
  const textEmphasis = String(slide.textEmphasis || title);
  const imagePromptDetail = String(slide.imagePrompt || '');
  const colorScheme = String(slide.colorScheme || '');
  const ratio: Record<string, string> = {
    instagram: '정사각형 1:1',
    tiktok: '세로 9:16',
    facebook: '가로 16:9',
  };

  const prompt = `한국 SNS 콘텐츠 이미지.
장면: ${imagePromptDetail}
색상: ${colorScheme || '다크 + 보라'}
상단/하단 한국어 텍스트: "${textEmphasis}"${subtitle ? ` / "${subtitle}"` : ''}
텍스트: 흰색 두꺼운 고딕 + 검정 그림자
규칙: 중앙 텍스트 금지, DSLR 사실적 사진, 실제 한국인, 한국어 오타 금지
비율: ${ratio[platform]}
${isLast ? 'CTA 느낌, 결심하는 인물' : isFirst ? '스크롤 멈추는 충격적 장면' : '진지한 정보 전달'}`;

  const img = await generateNanoBananaImage(prompt);
  return img || '';
}

// ===== 작업 히스토리 (IndexedDB - 대용량 이미지 저장) =====
import { saveHistoryDB, getHistoryDB, deleteHistoryDB, clearHistoryDB } from './history-db';

export async function saveToHistory(entry: {
  topic: string; headline: string; platform: string;
  slideCount: number; images: string[]; scripts: { title: string; body: string }[];
}): Promise<void> {
  await saveHistoryDB(entry);
  // 기존 localStorage 데이터 정리 (마이그레이션)
  if (typeof window !== 'undefined') localStorage.removeItem('hookflow_history');
}

export { getHistoryDB as getHistory, deleteHistoryDB as deleteHistory, clearHistoryDB as clearAllHistory };

// ===== 바이럴 영상 분석 (카테고리별 TOP + 성능지표) =====
export interface ViralVideo {
  title: string;
  channel: string;
  views: number;
  viewsStr: string;
  engagementRate: number;
  estimatedCPM: number;
  estimatedRevenue: number;
  viralSpeed: number;
  region: string;
  isShorts: boolean;
  url?: string;
  category: string;
  hookPattern: 'question' | 'stats' | 'empathy' | 'visual' | 'story';
  uploadDate: string;
}

export interface AnalysisReport {
  date: string;
  totalVideos: number;
  categories: Record<string, ViralVideo[]>;
  topCPM: ViralVideo[];
  topEngagement: ViralVideo[];
  topViralSpeed: ViralVideo[];
  hookPatternDistribution: Record<string, number>;
  regionDistribution: Record<string, number>;
  shortsVsLong: { shorts: number; long: number };
  nextWeekPredictions: { trend: string; growth: string; reason: string }[];
  executiveSummary: string;
}

export async function generateAnalysisReport(): Promise<AnalysisReport> {
  const today = new Date().toLocaleDateString('ko-KR');

  const text = await callClaude(
    `한국/글로벌 YouTube·SNS 바이럴 영상 분석 전문가.
실제 웹 검색으로 최신 바이럴 영상 60개 조사 후 JSON으로 분석 결과 반환.
설명 텍스트 금지. 순수 JSON만.`,
    `오늘(${today}) 기준 글로벌 바이럴 영상 분석 보고서.

카테고리 10개 (각 6개 영상):
1. 철학_지혜 2. 지식_교육 3. 일상_라이프스타일 4. 웹툰_애니메이션 5. 아이교육
6. 해외_바이럴 7. 자기계발 8. 재테크_경제 9. 건강_웰빙 10. 테크_IT

웹 검색 2-3회로 실제 YouTube/TikTok 바이럴 영상 정보 수집.

JSON 형식 (순수 JSON만, 설명 금지):
{
  "date": "${today}",
  "totalVideos": 60,
  "categories": {
    "철학_지혜": [
      {
        "title": "실제 영상 제목",
        "channel": "실제 채널명",
        "views": 1500000,
        "viewsStr": "1.5M",
        "engagementRate": 8.5,
        "estimatedCPM": 9.0,
        "estimatedRevenue": 13500,
        "viralSpeed": 300000,
        "region": "KR",
        "isShorts": true,
        "category": "철학_지혜",
        "hookPattern": "empathy",
        "uploadDate": "2026-04-17"
      }
    ]
  },
  "topCPM": [],
  "topEngagement": [],
  "topViralSpeed": [],
  "hookPatternDistribution": {"empathy": 28, "stats": 19, "question": 7, "visual": 6},
  "regionDistribution": {"US": 37, "KR": 17, "JP": 3, "IN": 2, "EU": 1},
  "shortsVsLong": {"shorts": 26, "long": 34},
  "nextWeekPredictions": [
    {"trend": "Physical AI & 휴머노이드 로봇", "growth": "+35%", "reason": "CES 2026 여파 지속"},
    {"trend": "재테크/크립토 컴백", "growth": "+28%", "reason": "코스피 신고가 기대감"}
  ],
  "executiveSummary": "오늘의 핵심 요약 3-5문장"
}`,
    { temp: 0.4, max: 16000, webSearch: true }
  );

  try {
    return extractJson(text) as AnalysisReport;
  } catch {
    // 재시도 (웹검색 없이)
    const retry = await callClaude(
      '바이럴 영상 분석가. 순수 JSON만 반환.',
      `카테고리 10개 × 6개 영상 = 60개의 바이럴 분석 JSON 생성.
형식: {"date":"${today}","totalVideos":60,"categories":{"철학_지혜":[{"title":"","channel":"","views":0,"viewsStr":"","engagementRate":0,"estimatedCPM":0,"estimatedRevenue":0,"viralSpeed":0,"region":"US","isShorts":true,"category":"철학_지혜","hookPattern":"empathy","uploadDate":""}]},"topCPM":[],"topEngagement":[],"topViralSpeed":[],"hookPatternDistribution":{},"regionDistribution":{},"shortsVsLong":{"shorts":0,"long":0},"nextWeekPredictions":[{"trend":"","growth":"","reason":""}],"executiveSummary":""}`,
      { temp: 0.5, max: 12000 }
    );
    return extractJson(retry) as AnalysisReport;
  }
}

// ===== SEO 패키지 생성 (제목/설명/해시태그) =====
export interface SEOPackage {
  titles: string[];  // SEO 최적화된 제목 3개
  description: string;  // YouTube/SNS 설명글
  hashtags: string[];  // 해시태그 15개
  tags: string[];  // YouTube 태그 20개
  thumbnailText: string;  // 썸네일 텍스트
  optimalPostTime: string;  // 최적 업로드 시간
  platforms: {
    youtube: { title: string; description: string };
    instagram: { caption: string; hashtags: string };
    tiktok: { caption: string; hashtags: string };
    facebook: { post: string };
  };
}

export async function generateSEOPackage(
  topic: string,
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook' = 'instagram'
): Promise<SEOPackage> {
  const text = await callClaude(
    'SNS/YouTube SEO 전문가. 한국어. 오타금지. JSON만.',
    `"${topic}" 주제 SEO 패키지 생성.

JSON 형식:
{
  "titles": ["SEO제목1 (70자 내)", "SEO제목2", "SEO제목3"],
  "description": "SNS/YouTube 설명글 (150-200자, 키워드+해시태그 포함)",
  "hashtags": ["#태그1", "#태그2", ... 15개],
  "tags": ["태그1", "태그2", ... 20개],
  "thumbnailText": "썸네일 문구 (5-10자)",
  "optimalPostTime": "최적 업로드 시간 (예: 월-금 저녁 7-9시)",
  "platforms": {
    "youtube": {"title": "YouTube 최적화 제목", "description": "YouTube 설명"},
    "instagram": {"caption": "IG 캡션 (짧고 감성적)", "hashtags": "#태그 나열"},
    "tiktok": {"caption": "TikTok 캡션 (fyp 유도)", "hashtags": "#fyp #추천"},
    "facebook": {"post": "FB 포스트 내용"}
  }
}`,
    { temp: 0.6, max: 3000 }
  );

  return extractJson(text) as SEOPackage;
}

// ===== 종합 보고서 Markdown 다운로드 =====
export function reportToMarkdown(report: AnalysisReport): string {
  let md = `# 일일 바이럴 영상 분석 보고서\n\n`;
  md += `**${report.date}** · 카테고리: ${Object.keys(report.categories).length}개 · 분석 영상: ${report.totalVideos}개\n\n---\n\n`;

  md += `## 📊 핵심 요약\n\n${report.executiveSummary}\n\n---\n\n`;

  md += `## 1️⃣ 카테고리별 트렌딩 영상\n\n`;
  for (const [cat, videos] of Object.entries(report.categories)) {
    md += `### ${cat.replace('_', '/')}\n\n`;
    md += `| 순위 | 제목 | 채널 | 조회수 | 참여율 | CPM | 수익 |\n|---|---|---|---|---|---|---|\n`;
    videos.forEach((v, i) => {
      md += `| ${i+1} | ${v.title} | ${v.channel} | ${v.viewsStr} | ${v.engagementRate}% | $${v.estimatedCPM} | $${v.estimatedRevenue.toLocaleString()} |\n`;
    });
    md += `\n`;
  }

  md += `\n## 2️⃣ 성과 분석\n\n### 💰 CPM TOP 10\n\n`;
  md += `| 순위 | 제목 | 카테고리 | CPM | 예상 수익 |\n|---|---|---|---|---|\n`;
  report.topCPM.slice(0, 10).forEach((v, i) => {
    md += `| ${i+1} | ${v.title} | ${v.category} | $${v.estimatedCPM} | $${v.estimatedRevenue.toLocaleString()} |\n`;
  });

  md += `\n### 🚀 바이럴 속도 TOP 10\n\n`;
  md += `| 순위 | 제목 | 일평균 조회수 | 카테고리 |\n|---|---|---|---|\n`;
  report.topViralSpeed.slice(0, 10).forEach((v, i) => {
    md += `| ${i+1} | ${v.title} | ${v.viralSpeed.toLocaleString()}/day | ${v.category} |\n`;
  });

  md += `\n## 3️⃣ 콘텐츠 구조 분석\n\n### 🎣 Hook 패턴 분포\n\n`;
  for (const [pattern, count] of Object.entries(report.hookPatternDistribution)) {
    md += `- **${pattern}**: ${count}개\n`;
  }

  md += `\n### 📱 Shorts vs 장편\n\n`;
  md += `- Shorts: ${report.shortsVsLong.shorts}개\n- 장편: ${report.shortsVsLong.long}개\n`;

  md += `\n### 🌍 지역 분포\n\n`;
  for (const [region, count] of Object.entries(report.regionDistribution)) {
    md += `- ${region}: ${count}개\n`;
  }

  md += `\n## 4️⃣ 다음 주 트렌드 예측\n\n`;
  report.nextWeekPredictions.forEach((p, i) => {
    md += `**${i+1}. ${p.trend}** (${p.growth})\n${p.reason}\n\n`;
  });

  md += `\n---\n\n*Generated by HookFlow AI · ${new Date().toISOString()}*\n`;
  return md;
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
