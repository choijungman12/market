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

// ===== SNS 이미지 세트 =====
export type DynamicSlide = Record<string, unknown>;

export interface CarouselSet {
  id: string;
  hookContentId: string;
  slides: DynamicSlide[];
  format: 'instagram' | 'tiktok' | 'facebook';
  generatedImages: string[];
}

// ===== 워크플로우 (3단계) =====
export type WorkflowStep = 'topic' | 'hooks' | 'carousel';

// ===== 작업 히스토리 =====
export interface WorkHistory {
  id: string;
  createdAt: string;
  topic: string;
  headline: string;
  platform: string;
  slideCount: number;
  images: string[];
  scripts: { title: string; body: string }[];
}
