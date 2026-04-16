import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ===== 시스템 프롬프트 =====
const MARKETING_SYSTEM_PROMPT = `당신은 글로벌 SNS 바이럴 마케팅 전문가입니다.
다음 원칙을 따릅니다:

1. 초보자도 이해할 수 있는 쉬운 언어 사용
2. 클릭률(CTR)을 극대화하는 후킹 헤드라인 작성
3. 감정을 자극하는 스토리텔링 기법 활용
4. 데이터 기반의 신뢰성 있는 콘텐츠
5. 명확한 CTA(Call-to-Action) 포함

모든 응답은 반드시 유효한 JSON 형식으로 반환하세요.`;

// ===== 후킹 콘텐츠 생성 =====
export async function generateHookContent(
  topic: { title: string; description: string; relatedQueries: string[] },
  tone: string,
  count: number = 3
) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: MARKETING_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `트렌딩 토픽을 기반으로 SNS 카루셀용 후킹 콘텐츠 ${count}개를 생성하세요.

## 트렌딩 토픽
- 제목: ${topic.title}
- 설명: ${topic.description}
- 관련 키워드: ${topic.relatedQueries.join(', ')}

## 톤: ${tone}

## 요구사항
- headline: 시선을 사로잡는 제목 (최대 15자, 한글 기준)
- subheadline: 궁금증을 유발하는 부제목
- bodyPoints: 카루셀 슬라이드에 들어갈 핵심 포인트 5개 (각각 짧고 임팩트 있게)
- callToAction: 행동을 유도하는 문구
- targetAudience: 타겟 독자 설명

## 출력 형식 (JSON 배열)
[
  {
    "id": "hook_1",
    "headline": "...",
    "subheadline": "...",
    "bodyPoints": ["...", "...", "...", "...", "..."],
    "callToAction": "...",
    "tone": "${tone}",
    "targetAudience": "..."
  }
]

JSON 배열만 반환하세요. 다른 텍스트 없이.`,
      },
    ],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse hook content');
  return JSON.parse(jsonMatch[0]);
}

// ===== 카루셀 슬라이드 구조 생성 =====
export async function generateCarouselStructure(hook: {
  headline: string;
  subheadline: string;
  bodyPoints: string[];
  callToAction: string;
}) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: [
      {
        type: 'text',
        text: MARKETING_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `다음 후킹 콘텐츠를 Instagram 카루셀 7장 슬라이드로 구성하세요.

## 콘텐츠
- 헤드라인: ${hook.headline}
- 서브헤드라인: ${hook.subheadline}
- 핵심 포인트: ${hook.bodyPoints.join(' | ')}
- CTA: ${hook.callToAction}

## 슬라이드 구성 규칙
1. 슬라이드 1 (cover): 강렬한 후킹 제목 + 부제목
2. 슬라이드 2-5 (content): 각 핵심 포인트를 시각적으로 전달
3. 슬라이드 6 (stats): 신뢰를 주는 통계/데이터
4. 슬라이드 7 (cta): CTA + 팔로우/저장 유도

## 색상 가이드라인
- 다크 모드 기반 (배경 #0F172A ~ #1E293B)
- 포인트 컬러: 밝은 그라데이션 (#818CF8, #6366F1, #A78BFA)
- 텍스트: 흰색 #F8FAFC

## 출력 형식 (JSON 배열)
[
  {
    "id": "slide_1",
    "order": 1,
    "type": "cover",
    "title": "...",
    "body": "...",
    "bgColor": "#0F172A",
    "textColor": "#F8FAFC",
    "accentColor": "#818CF8"
  }
]

JSON 배열만 반환하세요.`,
      },
    ],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('Failed to parse carousel structure');
  return JSON.parse(jsonMatch[0]);
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
}) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    system: [
      {
        type: 'text',
        text: `당신은 전환율 높은 랜딩 페이지를 만드는 웹 디자이너입니다.
모던하고 세련된 한국어 랜딩 페이지 HTML을 생성합니다.
Tailwind CSS CDN을 사용하여 스타일링합니다.
다크 모드 기반의 고급스러운 디자인을 선호합니다.`,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      {
        role: 'user',
        content: `다음 정보로 완전한 랜딩 페이지 HTML을 생성하세요.

## 정보
- 제목: ${data.heroTitle}
- 부제목: ${data.heroSubtitle}
- 회사명: ${data.companyName || '회사명'}
- 제품명: ${data.productName || '제품명'}
- CTA 버튼: ${data.ctaText}
- CTA 링크: ${data.ctaUrl}
- 주요 기능:
${data.features.map((f) => `  - ${f.title}: ${f.description}`).join('\n')}

## 요구사항
1. 완전한 HTML 파일 (<!DOCTYPE html> 부터)
2. Tailwind CSS CDN 포함
3. 섹션: Hero → 기능 소개 → 소셜 프루프 → CTA → 푸터
4. 반응형 디자인
5. 다크 배경 (#0F172A) + 보라색 계열 액센트
6. 부드러운 애니메이션 (CSS)
7. 한국어 UI

HTML 코드만 반환하세요. 마크다운 코드 블록 없이 순수 HTML만.`,
      },
    ],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';
  return text.trim();
}

// ===== NanoBanana 이미지 프롬프트 생성 =====
export async function generateImagePrompt(slideData: {
  title: string;
  body: string;
  type: string;
}) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `Generate a concise English image generation prompt for an SNS carousel slide.

Slide type: ${slideData.type}
Title: ${slideData.title}
Content: ${slideData.body}

Create a prompt for a modern, clean social media graphic background.
Requirements:
- Minimal abstract background
- Professional marketing aesthetic
- Dark theme with purple/indigo accent gradients
- No text in the image (text will be overlaid)
- 1080x1080 square format

Return ONLY the prompt text, nothing else.`,
      },
    ],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}
