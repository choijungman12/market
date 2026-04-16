// AI 텍스트 생성 통합 모듈
// 우선순위: Anthropic Claude → GenSpark → 에러

import Anthropic from '@anthropic-ai/sdk';
import { isGenSparkAvailable, chatCompletion } from './genspark';

// ===== 클라이언트 초기화 =====
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || '';
let anthropicClient: Anthropic | null = null;

if (ANTHROPIC_KEY) {
  anthropicClient = new Anthropic({ apiKey: ANTHROPIC_KEY });
}

// ===== 어떤 AI 제공자가 활성화되었는지 =====
export function getActiveProvider(): 'anthropic' | 'genspark' | 'none' {
  if (ANTHROPIC_KEY) return 'anthropic';
  if (isGenSparkAvailable()) return 'genspark';
  return 'none';
}

// ===== 통합 텍스트 생성 =====
async function generateText(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const { temperature = 0.7, maxTokens = 4096 } = options;

  // 1) Anthropic Claude 시도
  if (anthropicClient) {
    const response = await anthropicClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      temperature,
      system: [
        { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: userPrompt }],
    });
    const block = response.content[0];
    return block.type === 'text' ? block.text : '';
  }

  // 2) GenSpark 시도
  if (isGenSparkAvailable()) {
    return chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature, maxTokens }
    );
  }

  // 3) 둘 다 없으면 에러
  throw new Error(
    'AI API 키가 설정되지 않았습니다. ANTHROPIC_API_KEY 또는 GENSPARK_API_KEY를 .env.local에 설정하세요.'
  );
}

// ===== JSON 파싱 헬퍼 =====
function extractJson(text: string): unknown {
  // ```json ... ``` 블록 추출
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) {
    return JSON.parse(codeBlock[1].trim());
  }
  // 배열 추출
  const arr = text.match(/\[[\s\S]*\]/);
  if (arr) return JSON.parse(arr[0]);
  // 객체 추출
  const obj = text.match(/\{[\s\S]*\}/);
  if (obj) return JSON.parse(obj[0]);
  throw new Error('JSON을 파싱할 수 없습니다: ' + text.slice(0, 200));
}

// ===== 시스템 프롬프트 =====
const MARKETING_SYSTEM = `당신은 글로벌 SNS 바이럴 마케팅 전문가입니다.

원칙:
1. 초보자도 이해할 수 있는 쉬운 한국어 사용
2. 클릭률(CTR)을 극대화하는 후킹 헤드라인
3. 감정을 자극하는 스토리텔링
4. 데이터 기반 신뢰성
5. 명확한 CTA 포함

반드시 유효한 JSON만 반환하세요. 마크다운 코드 블록 없이 순수 JSON만.`;

// ===== 후킹 콘텐츠 생성 =====
export async function generateHookContent(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string,
  count: number = 3
): Promise<Record<string, unknown>[]> {
  const text = await generateText(
    MARKETING_SYSTEM,
    `트렌딩 토픽 기반 SNS 카루셀용 후킹 콘텐츠 ${count}개를 생성하세요.

## 토픽
- 제목: ${topic.title}
- 설명: ${topic.description || topic.title}
- 키워드: ${(topic.relatedQueries || []).join(', ') || '없음'}
- 톤: ${tone}

## 각 콘텐츠 포함 필드
- headline: 시선을 사로잡는 제목 (한글 15자 이내)
- subheadline: 궁금증 유발 부제목 (한글 30자 이내)
- bodyPoints: 카루셀 슬라이드 핵심 포인트 5개 배열 (각 50자 이내)
- callToAction: 행동 유도 문구
- targetAudience: 타겟 독자

JSON 배열로 반환:
[{"headline":"...","subheadline":"...","bodyPoints":["..."],"callToAction":"...","targetAudience":"..."}]`,
    { temperature: 0.8 }
  );

  const parsed = extractJson(text) as Record<string, unknown>[];
  return Array.isArray(parsed) ? parsed : [parsed];
}

// ===== 카루셀 슬라이드 구조 생성 =====
export async function generateCarouselStructure(hook: {
  headline: string;
  subheadline: string;
  bodyPoints: string[];
  callToAction: string;
}): Promise<Record<string, unknown>[]> {
  const text = await generateText(
    MARKETING_SYSTEM,
    `후킹 콘텐츠를 Instagram 카루셀 7장 슬라이드로 구성하세요.

## 콘텐츠
- 헤드라인: ${hook.headline}
- 서브헤드라인: ${hook.subheadline}
- 핵심 포인트: ${(hook.bodyPoints || []).join(' | ')}
- CTA: ${hook.callToAction}

## 슬라이드 구성
1장 (cover): 강렬한 후킹 제목
2-5장 (content): 각 핵심 포인트
6장 (stats): 통계/데이터로 신뢰 확보
7장 (cta): CTA + 팔로우 유도

## 색상: 다크 모드 (#0F172A~#1E293B), 포인트 (#818CF8, #6366F1), 텍스트 (#F8FAFC)

JSON 배열로 반환:
[{"id":"slide_1","order":1,"type":"cover","title":"...","body":"...","bullets":[],"bgColor":"#0F172A","textColor":"#F8FAFC","accentColor":"#818CF8"}]`,
    { temperature: 0.5 }
  );

  const parsed = extractJson(text) as Record<string, unknown>[];
  return Array.isArray(parsed) ? parsed : [parsed];
}

// ===== 이미지 프롬프트 생성 =====
export async function generateImagePrompts(
  slides: { title: string; type: string }[]
): Promise<string[]> {
  const text = await generateText(
    'You generate concise English image prompts for AI image generators. Return a JSON array of strings only.',
    `Generate ${slides.length} image prompts for SNS carousel slide backgrounds.

Slides:
${slides.map((s, i) => `${i + 1}. [${s.type}] ${s.title}`).join('\n')}

Each prompt should describe:
- Minimal abstract background, NO text/words/letters
- Dark theme with purple/indigo gradients
- Professional marketing aesthetic
- 1080x1080 square format

Return JSON array of strings: ["prompt1", "prompt2", ...]`,
    { temperature: 0.6 }
  );

  const parsed = extractJson(text);
  return Array.isArray(parsed) ? parsed : [];
}

// ===== 랜딩 페이지 HTML 생성 =====
export async function generateLandingPageHtml(data: {
  heroTitle: string;
  heroSubtitle: string;
  features: { title: string; description: string }[];
  ctaText: string;
  ctaUrl: string;
  companyName?: string;
  productName?: string;
}): Promise<string> {
  const text = await generateText(
    `당신은 전환율 높은 랜딩 페이지를 만드는 웹 디자이너입니다.
Tailwind CSS CDN을 사용한 완전한 HTML을 생성합니다.
다크 모드 기반의 고급스러운 한국어 디자인을 만듭니다.
반드시 <!DOCTYPE html>로 시작하는 완전한 HTML을 반환하세요.
마크다운 코드 블록 없이 순수 HTML만 반환하세요.`,
    `다음 정보로 랜딩 페이지 HTML을 생성하세요.

제목: ${data.heroTitle}
부제목: ${data.heroSubtitle}
회사명: ${data.companyName || '회사명'}
제품명: ${data.productName || '제품명'}
CTA: ${data.ctaText} (링크: ${data.ctaUrl})

기능:
${data.features.map((f) => `- ${f.title}: ${f.description}`).join('\n')}

요구사항:
1. <!DOCTYPE html>부터 완전한 HTML
2. <script src="https://cdn.tailwindcss.com"></script> 포함
3. 섹션: Hero → 기능 소개 → CTA → 푸터
4. 반응형, 다크 배경(#0F172A), 보라색 액센트
5. 부드러운 CSS 애니메이션
6. 한국어 UI`,
    { maxTokens: 8192, temperature: 0.4 }
  );

  // HTML 추출 (마크다운 코드블록에서)
  const htmlMatch = text.match(/<!DOCTYPE[\s\S]*/i);
  if (htmlMatch) return htmlMatch[0].replace(/```\s*$/g, '').trim();

  const codeBlock = text.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (codeBlock) return codeBlock[1].trim();

  return text.trim();
}
