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
    body.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 15 }];
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
      { temp: 0.3, max: 10000, webSearch: true }
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

// ===== 후킹 콘텐츠 생성 =====
export async function generateHooks(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string, count = 3
) {
  const toneMap: Record<string, string> = { informative: '정보형', provocative: '자극형', storytelling: '스토리형' };
  const todayKR = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  const thisMonth = `${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월`;

  const text = await callClaude(
    `당신은 한국 SNS 마케팅 전문 저널리스트입니다.
오늘 날짜: ${todayKR}

**절대 규칙 - 반드시 준수:**

1. **최신성 필수**: ${thisMonth} 이내의 뉴스만 사용. 3개월 이상 오래된 자료 절대 금지.
2. **2차 검증**: 웹 검색을 **최소 2라운드** 수행 (1차 수집 → 2차 교차검증)
3. **날짜 명시**: 각 팩트는 뉴스 발행일을 확인 후 인용
4. **구체성**: 숫자, 날짜, 법조항, 인명, 금액 등 검증 가능한 팩트만

**작업 순서 (엄격 준수):**

[1라운드 검색]
- "토픽명 ${thisMonth}" 검색
- "토픽명 최신 뉴스" 검색
- "토픽명 오늘" 또는 "이번주" 검색

[2라운드 검증]
- 1라운드에서 찾은 핵심 팩트를 다른 키워드로 교차 검색
- 날짜, 숫자 확인
- 서로 다른 2개 이상 매체에서 같은 팩트 확인

[3단계 대본 작성]
- 검증된 최신 팩트만 사용
- 각 bodyPoint에 구체적 숫자 + 날짜 포함

**출력**: 순수 JSON 배열만. 한국어 오타 절대 금지.`,
    `토픽: "${topic.title}"
설명: ${topic.description}
톤: ${toneMap[tone] || tone}
오늘: ${todayKR}

**작업 (엄격):**

[1라운드 - 최신 뉴스 수집]
다음 검색을 순차 실행:
1. "${topic.title} ${thisMonth}" 검색
2. "${topic.title} 최신 뉴스 2026" 검색
3. "${topic.title} 발표 ${new Date().getFullYear()}" 검색

[2라운드 - 교차 검증]
1라운드에서 찾은 가장 중요한 팩트 3-5개를 다른 키워드로 재검색:
4. 팩트별 날짜 확인 (${thisMonth} 이내인지 검증)
5. 다른 매체에서 동일 팩트 확인
6. 숫자/금액/날짜 정확성 재확인

[3단계 - 대본 ${count}개 작성]

**각 대본 규칙:**
- **팩트는 반드시 ${thisMonth} 이내 뉴스에서만 추출** (오래된 자료 절대 금지)
- headline: 최신 뉴스의 핵심 (15자 이내)
- subheadline: 날짜 또는 구체 수치 포함 (30자 이내)
- bodyPoints: 5개, **각각 ${thisMonth} 뉴스 팩트 + 숫자 포함** (각 40자 이내)
  - 예시 형식: "${thisMonth} 발표: [구체적 수치/내용]"
- callToAction
- targetAudience

**금지 사항:**
- 3개월 이상 오래된 자료 인용 (절대)
- 검증 안 된 추측 정보
- 숫자 없는 일반론

**최종 출력:** JSON 배열만 (설명 금지, 코드블록 금지)

[{"headline":"","subheadline":"","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,
    { temp: 0.3, max: 16000, webSearch: true }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== SNS 이미지 대본 생성 (상세 버전) =====
export async function generateCarouselSlides(hook: {
  headline: string; subheadline: string; bodyPoints: string[]; callToAction: string;
}, count: number = 8) {
  const text = await callClaude(
    `SNS 콘텐츠 작가. 초보자도 이해하기 쉽게 친절하게 작성. 한국어 맞춤법 완벽. JSON만 반환.

각 슬라이드는 3단 구조:
1. title: 짧은 후킹 제목 (10-15자)
2. subtitle: 제목 보충 부제목 (20-30자)
3. body: 상세 본문 내용 (80-150자, 예시/비유/숫자 포함하여 초보자도 쉽게 이해)

본문은 반드시 포함:
- 구체적 예시 ("예를 들어...", "실제로는...")
- 쉬운 비유 ("마치 ~처럼")
- 숫자/데이터 (%, 금액, 기간 등)
- 전문용어는 반드시 풀어서 설명`,
    `주제: "${hook.headline}"
부제: "${hook.subheadline}"
핵심 내용: ${hook.bodyPoints.join(' | ')}
CTA: ${hook.callToAction}

위 내용으로 SNS 이미지 ${count}장 대본을 작성하세요.

[구성]
1장(cover): 스크롤 멈추는 강렬한 후킹 (title + subtitle + 간단한 미리보기 body)
2~${count-1}장(content): 핵심 포인트 전달
   - 각 장은 1개 포인트에 집중
   - title: 짧고 임팩트 있게
   - subtitle: 궁금증 유발
   - body: 상세 설명 (예시, 비유, 숫자 포함하여 초보자도 이해 가능)
${count}장(cta): 행동 유도 + 팔로우/저장 요청

JSON 배열 반환 (각 장은 title + subtitle + body + example 필드 포함):
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "cover",
    "title": "짧은 제목 (10-15자)",
    "subtitle": "부제목 (20-30자)",
    "body": "상세 본문 (80-150자, 초보자도 이해 가능하게 예시/비유/숫자 포함)",
    "example": "추가 예시나 팁 (선택, 40자 이내)",
    "bgColor": "#0F172A",
    "textColor": "#F8FAFC",
    "accentColor": "#818CF8"
  }
]`,
    { temp: 0.6, max: 6000 }
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
      const title = String(s.title || '');
      const subtitle = String(s.subtitle || '');
      const body = String(s.body || '');
      const isFirst = (i + j) === 0;
      const isLast = (i + j) === slides.length - 1;

      // 이미지에 표시할 텍스트 조합
      const displayText = subtitle ? `${title}\n\n${subtitle}` : title;

      const prompt = `${isFirst ?
`스크롤 멈추는 한국 SNS 메인 이미지.
이미지 중앙에 아래 한국어를 크고 굵게 정확히 표시:
"${title}"
${subtitle ? `\n그 아래 작게 표시: "${subtitle}"` : ''}
배경: ${body} 장면의 실제 DSLR 사진.
텍스트 스타일: 흰색 두꺼운 고딕체, 검정 그림자.` :
isLast ?
`한국 SNS CTA 이미지.
중앙에 한국어 표시: "${title}"
${subtitle ? `부제: "${subtitle}"` : ''}
행동 유도 디자인, 실제 사진 배경.` :
`한국 SNS 콘텐츠 이미지.
상단에 한국어 제목: "${title}"
${subtitle ? `제목 아래 부제: "${subtitle}"` : ''}
배경: "${body}" 내용을 표현하는 실제 사진.
텍스트: 흰색 굵은 글씨, 그림자 효과.`}

필수 규칙:
1. 위에 명시된 한국어를 정확히 표기 (오타/자모음 깨짐 절대 금지)
2. 제시된 문구 외 다른 한국어 생성 금지
3. DSLR 촬영 같은 사실적 사진 (AI/일러스트 금지)
4. 실제 한국인, 한국 장소, 실제 물건
5. 자연스러운 조명, 시네마틱 색감
6. 비율: ${ratio[platform]}

출력 전 검증: 이미지 내 한국어가 "${title}" 및 "${subtitle}"와 정확히 일치하는지 확인.`;

      return generateNanoBananaImage(prompt)
        .then(img => { results[i + j] = img || ''; })
        .catch(() => { results[i + j] = ''; });
    });

    await Promise.all(promises);
    if (i + 2 < slides.length) await new Promise(r => setTimeout(r, 3000));
  }
  return results;
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
