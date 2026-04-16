// ===== 트렌딩 토픽 =====
export interface TrendingTopic {
  id: string;
  title: string;
  source: 'google' | 'reddit' | 'twitter';
  description: string;
  traffic: string;
  relatedQueries: string[];
  category?: string;
  url?: string;
  fetchedAt: string;
}

// ===== 후킹 콘텐츠 =====
export interface HookContent {
  id: string;
  topicId: string;
  headline: string;
  subheadline: string;
  bodyPoints: string[];
  callToAction: string;
  tone: 'informative' | 'provocative' | 'storytelling';
  targetAudience: string;
}

// ===== 카루셀 슬라이드 =====
export interface CarouselSlide {
  id: string;
  order: number;
  type: 'cover' | 'content' | 'list' | 'stats' | 'cta';
  title: string;
  body: string;
  bullets?: string[];
  bgColor: string;
  textColor: string;
  accentColor: string;
}

// AI에서 반환되는 슬라이드는 동적 필드가 있을 수 있음
export type DynamicSlide = Record<string, unknown>;

export interface CarouselSet {
  id: string;
  hookContentId: string;
  slides: DynamicSlide[];
  format: 'instagram' | 'facebook';
  generatedImages: string[];
}

// ===== 랜딩 페이지 =====
export interface LandingPageData {
  hookContentId: string;
  heroTitle: string;
  heroSubtitle: string;
  features: { title: string; description: string }[];
  ctaText: string;
  ctaUrl: string;
  companyName?: string;
  productName?: string;
  generatedHtml?: string;
}

// ===== 워크플로우 상태 =====
export type WorkflowStep = 'topic' | 'hooks' | 'carousel' | 'landing';
