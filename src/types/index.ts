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

export interface CarouselSet {
  id: string;
  hookContentId: string;
  slides: CarouselSlide[];
  format: 'instagram' | 'facebook';
  generatedImages: string[]; // base64 PNG or NanoBanana URLs
}

// ===== 랜딩 페이지 =====
export interface LandingPageData {
  hookContentId: string;
  heroTitle: string;
  heroSubtitle: string;
  features: { icon: string; title: string; description: string }[];
  testimonial?: { quote: string; author: string };
  ctaText: string;
  ctaUrl: string;
  companyName?: string;
  productName?: string;
  generatedHtml?: string;
}

// ===== NanoBanana 이미지 생성 =====
export interface NanoBananaRequest {
  prompt: string;
  width: number;
  height: number;
  style?: string;
  negativePrompt?: string;
}

export interface NanoBananaResponse {
  imageUrl: string;
  imageBase64?: string;
}

// ===== 워크플로우 상태 =====
export type WorkflowStep = 'topic' | 'hooks' | 'carousel' | 'landing';

export interface WorkflowState {
  currentStep: WorkflowStep;
  selectedTopic: TrendingTopic | null;
  selectedHook: HookContent | null;
  carouselSet: CarouselSet | null;
  landingPage: LandingPageData | null;
}
