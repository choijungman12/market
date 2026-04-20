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

// ===== JSON 파싱 =====
function extractJson(text: string): unknown {
  for (const pattern of [/```(?:json)?\s*([\s\S]*?)```/, /\[[\s\S]*\]/, /\{[\s\S]*\}/]) {
    const m = text.match(pattern);
    if (m) { try { return JSON.parse(m[1] || m[0]); } catch {} }
  }
  throw new Error('AI 응답 파싱 실패. 다시 시도해주세요.');
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
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24시간

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
    const month = new Date().getMonth() + 1;
    const seasonInfo = month >= 3 && month <= 5 ? '봄 시즌 (벚꽃, 나들이, 봄맞이)' :
      month >= 6 && month <= 8 ? '여름 시즌 (휴가, 수영복, 다이어트)' :
      month >= 9 && month <= 11 ? '가을 시즌 (단풍, 패션, 추석)' : '겨울 시즌 (크리스마스, 연말, 방한)';

    const text = await callClaude(
      '2026년 최신 한국/글로벌 SNS 트렌드 분석가. 한국어. 오타금지. JSON만.',
      `오늘은 ${today}입니다. 현재 시즌: ${seasonInfo}.

2026년 4월 현재 SNS에서 가장 바이럴한 최신 토픽을 카테고리별 각 2-3개씩 총 35개 이상 생성하세요.

중요: 반드시 2026년 최신 트렌드만. 오래된 자료 절대 불가.

카테고리:
- 음식: 맛집, 레시피, 먹방 (2026 최신)
- 다이어트: 운동, 피트니스 (올해 유행)
- 건강: 건강관리, 의약, 웰니스
- 식단: 영양, 밀프렙, 건강식
- 쇼핑: 핫딜, 신상품, 트렌드
- 화장품: 뷰티, 스킨케어, 2026 SS
- 의류: 패션, OOTD, ${seasonInfo}
- 인플루언서: SNS 크리에이터 이슈
- 셀럽: K-POP, 드라마, 연예인
- 테크: AI, 가젯, 신기술
- 재테크: 부업, 투자, AI 수익화
- 시즌: ${seasonInfo}, 다가오는 공휴일/이벤트 (어린이날, 어버이날, 석가탄신일 등)
- 글로벌: 미국/일본/유럽 트렌드, 해외 바이럴
- 지혜: 철학적 명언, 종교적 가르침, 인생 지혜, 마음 수양, 명상
- 연애: 남녀 연애 트렌드, 관계 심리, 데이트 문화, 성 관련 이슈, 글로벌 연애 뉴스, 커플 핫이슈

각 항목: title(20자이내), description(2문장), traffic(검색량), views(SNS조회수), category(위 카테고리명), relatedQueries([키워드2개])

[{"title":"","description":"","traffic":"","views":"","category":"","relatedQueries":[""]}]`,
      { temp: 0.9, max: 4096 }
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
  const text = await callClaude(
    `당신은 한국 SNS 마케팅 전문가입니다.

필수 준수 사항:
1. 반드시 실제 웹 검색으로 최신 정보를 수집한 후 작성 (추측/가상 금지)
2. 정확한 사실, 최신 데이터, 실제 뉴스 기반으로만 작성
3. 모든 한국어 맞춤법과 띄어쓰기 완벽하게 (오타 절대 금지)
4. 전문 용어 사용 시 정확한 표현 사용
5. 숫자, 날짜, 이름 등 팩트는 검색 결과에서만 인용
6. 반드시 JSON만 반환 (마크다운 코드 블록 금지)`,
    `토픽 "${topic.title}"에 대해 웹 검색으로 최신 정보를 찾은 후, ${toneMap[tone] || tone} 톤의 SNS 후킹 대본 ${count}개를 만드세요.

주제 상세: ${topic.description}

반드시 다음 규칙 준수:
- 웹에서 찾은 실제 정보, 최신 데이터, 구체적 숫자/사실 반영
- 한국어 맞춤법 100% 정확 (오타 시 재작성)
- 추측 금지, 검증된 정보만

각 콘텐츠:
- headline: 후킹 제목 (15자 이내, 클릭 유발)
- subheadline: 부제목 (30자 이내, 궁금증 증폭)
- bodyPoints: 핵심 포인트 5개 배열 (각 40자 이내, 실제 팩트 포함)
- callToAction: 행동 유도 문구
- targetAudience: 타겟 독자

JSON 배열만 반환:
[{"headline":"","subheadline":"","bodyPoints":["","","","",""],"callToAction":"","targetAudience":""}]`,
    { temp: 0.7, max: 3000, webSearch: true }
  );
  const p = extractJson(text);
  return Array.isArray(p) ? p : [p];
}

// ===== SNS 이미지 대본 생성 =====
export async function generateCarouselSlides(hook: {
  headline: string; subheadline: string; bodyPoints: string[]; callToAction: string;
}, count: number = 8) {
  const text = await callClaude(
    'SNS 콘텐츠 디자이너. 한국어. 오타 금지. JSON만 반환.',
    `"${hook.headline}" 주제로 SNS 이미지 대본 ${count}장을 구성하세요.

규칙:
- 1장(메인): 가장 어그로/후킹되는 제목. 사람들이 멈추고 볼 수밖에 없는 문구
- 2~${count-1}장: 핵심 내용 전달. 각 장마다 임팩트 있는 한줄 제목 + 설명
- ${count}장(마지막): CTA + 팔로우/저장 유도

핵심 포인트: ${hook.bodyPoints.join(' | ')}
CTA: ${hook.callToAction}

색상: bg=#0F172A~#1E293B, text=#F8FAFC, accent=#818CF8

[{"id":"slide_1","order":1,"type":"cover","title":"어그로 제목","body":"본문","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
    { temp: 0.6, max: 2048 }
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
      const body = String(s.body || '');
      const isFirst = (i + j) === 0;
      const isLast = (i + j) === slides.length - 1;

      const prompt = `${isFirst ?
`스크롤을 멈추게 하는 강렬한 한국 SNS 메인 이미지.
반드시 "${title}" 이 한국어 텍스트를 이미지 정중앙에 크고 굵게 정확히 표시.
배경: ${body} 장면의 실제 사진.
텍스트 스타일: 흰색 두꺼운 고딕체, 검정 그림자로 선명하게.` :
isLast ?
`한국 SNS 마지막 장 CTA 이미지.
반드시 "${title}" 이 한국어 텍스트를 중앙에 정확히 표시.
행동을 유도하는 깔끔한 디자인.` :
`한국 SNS 콘텐츠 이미지.
반드시 "${title}" 이 한국어 텍스트를 상단에 정확히 표시.
배경: ${body} 내용의 실제 사진.
텍스트 스타일: 흰색 굵은 글씨, 그림자 효과.`}

절대 지켜야 할 규칙 (CRITICAL RULES):
1. 한국어 텍스트는 반드시 위에 명시된 그대로 정확히 표기 (오타 절대 금지)
2. 한글 자음/모음이 깨지거나 이상한 글자가 나오면 안 됨
3. 제시된 문구와 다른 한국어 텍스트 생성 금지
4. 실제 DSLR로 촬영한 사진처럼 사실적 (AI/일러스트 스타일 금지)
5. 실제 한국인, 한국 장소, 실제 물건 사용
6. 자연스러운 조명, 고해상도, 시네마틱 색감
7. 비율: ${ratio[platform]}

한국어 텍스트 정확성 검증: 출력 전 이미지 내 한국어 텍스트가 "${title}"과 정확히 일치하는지 확인.`;

      return generateNanoBananaImage(prompt)
        .then(img => { results[i + j] = img || ''; })
        .catch(() => { results[i + j] = ''; });
    });

    await Promise.all(promises);
    if (i + 2 < slides.length) await new Promise(r => setTimeout(r, 3000));
  }
  return results;
}

// ===== 작업 히스토리 저장/조회 =====
const HISTORY_KEY = 'hookflow_history';

export function saveToHistory(entry: {
  topic: string; headline: string; platform: string;
  slideCount: number; images: string[]; scripts: { title: string; body: string }[];
}) {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  // 이미지는 용량이 크므로 저장하지 않음 (localStorage 5MB 제한)
  history.unshift({
    id: `h_${Date.now()}`,
    createdAt: new Date().toISOString(),
    topic: entry.topic,
    headline: entry.headline,
    platform: entry.platform,
    slideCount: entry.slideCount,
    imageCount: entry.images.filter(Boolean).length,
    scripts: entry.scripts,
  });
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
  } catch {
    // 용량 초과 시 오래된 기록 삭제 후 재시도
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  }
}

export function getHistory(): { id: string; createdAt: string; topic: string; headline: string; platform: string; slideCount: number; imageCount?: number; scripts: { title: string; body: string }[] }[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

export function deleteHistory(id: string) {
  if (typeof window === 'undefined') return;
  const history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
