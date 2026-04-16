'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import type { TrendingTopic, HookContent, CarouselSet, WorkflowStep } from '@/types';

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState<WorkflowStep>('topic');
  const [topic, setTopic] = useState<TrendingTopic | null>(null);
  const [tone, setTone] = useState('informative');
  const [hooks, setHooks] = useState<HookContent[]>([]);
  const [selectedHook, setSelectedHook] = useState<HookContent | null>(null);
  const [carousel, setCarousel] = useState<CarouselSet | null>(null);
  const [landingHtml, setLandingHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('selectedTopic');
    if (saved) {
      try { setTopic(JSON.parse(saved)); } catch {}
    }
  }, []);

  // ===== 에러 표시 컴포넌트 =====
  function ErrorBanner() {
    if (!error) return null;
    return (
      <div className="mb-4 p-4 rounded-xl bg-danger/10 border border-danger/30 text-sm text-danger flex items-start gap-3">
        <span className="shrink-0 mt-0.5">&#9888;</span>
        <div>
          <p className="font-medium">오류 발생</p>
          <p className="text-danger/70 mt-1">{error}</p>
        </div>
        <button onClick={() => setError(null)} className="ml-auto shrink-0 text-danger/50 hover:text-danger">
          &#10005;
        </button>
      </div>
    );
  }

  // ===== API 호출 래퍼 =====
  async function apiCall<T>(url: string, body: unknown): Promise<T | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error + (data.detail ? `\n${data.detail}` : ''));
        return null;
      }
      return data as T;
    } catch (e) {
      setError(e instanceof Error ? e.message : '네트워크 오류가 발생했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  // ===== Step 2: 후킹 콘텐츠 생성 =====
  async function generateHooks() {
    if (!topic) return;
    const data = await apiCall<{ hooks: HookContent[] }>('/api/generate-hooks', {
      topic,
      tone,
      count: 3,
    });
    if (data?.hooks?.length) {
      setHooks(data.hooks);
      setStep('hooks');
    }
  }

  // ===== Step 3: 카루셀 생성 =====
  async function generateCarousel() {
    if (!selectedHook) return;
    const data = await apiCall<{ carousel: CarouselSet }>('/api/generate-carousel', {
      hook: selectedHook,
      format: 'instagram',
    });
    if (data?.carousel) {
      setCarousel(data.carousel);
      setStep('carousel');
    }
  }

  // ===== Step 4: 랜딩 페이지 생성 =====
  async function generateLanding() {
    if (!selectedHook) return;
    const data = await apiCall<{ landing: { generatedHtml: string } }>('/api/generate-landing', {
      hook: selectedHook,
      companyName: companyName || undefined,
      productName: productName || undefined,
      ctaUrl: '#contact',
    });
    if (data?.landing?.generatedHtml) {
      setLandingHtml(data.landing.generatedHtml);
      setStep('landing');
    }
  }

  function goToPreview() {
    if (carousel) {
      sessionStorage.setItem('carouselData', JSON.stringify(carousel));
    }
    if (landingHtml) {
      sessionStorage.setItem('landingHtml', landingHtml);
    }
    router.push('/preview');
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Stepper currentStep={step} />
        <ErrorBanner />

        {/* 로딩 오버레이 */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-8 rounded-2xl bg-card-bg border border-card-border">
              <div className="w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
              <p className="text-foreground/60 text-sm">
                {step === 'topic' && 'AI가 후킹 콘텐츠를 분석하고 있습니다...'}
                {step === 'hooks' && 'NanoBanana(Gemini)로 이미지를 생성 중입니다...'}
                {step === 'carousel' && '랜딩 페이지를 디자인하고 있습니다...'}
              </p>
              <p className="text-foreground/30 text-xs mt-2">30초~1분 소요될 수 있습니다</p>
            </div>
          </div>
        )}

        {/* ===== STEP 1: 토픽 확인 ===== */}
        {step === 'topic' && (
          <div className="animate-slide-up">
            {topic ? (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent">
                      선택된 토픽
                    </span>
                    <span className="text-xs text-foreground/40">{topic.source} | {topic.traffic}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
                  <p className="text-foreground/50 text-sm">{topic.description}</p>
                  {topic.relatedQueries.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {topic.relatedQueries.slice(0, 5).map((q, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-background text-xs text-foreground/40">#{q}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">콘텐츠 톤 선택</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'informative', label: '정보 전달형', desc: '데이터와 팩트 중심' },
                      { key: 'provocative', label: '자극형', desc: '논쟁과 호기심 유발' },
                      { key: 'storytelling', label: '스토리텔링', desc: '감정과 공감 중심' },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTone(t.key)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          tone === t.key
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-card-border hover:border-accent/30'
                        }`}
                      >
                        <div className="font-medium text-sm">{t.label}</div>
                        <div className="text-xs text-foreground/40 mt-1">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">
                    제품/회사 정보 (선택 - 랜딩 페이지에 사용)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="회사명"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="제품/서비스명"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={generateHooks}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 disabled:opacity-50"
                >
                  AI 후킹 콘텐츠 생성하기
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/40 mb-4">먼저 대시보드에서 토픽을 선택해주세요.</p>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-2.5 rounded-lg bg-accent/15 text-accent text-sm font-medium hover:bg-accent/25 transition-colors"
                >
                  대시보드로 이동
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 2: 후킹 콘텐츠 선택 ===== */}
        {step === 'hooks' && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">생성된 후킹 콘텐츠 ({hooks.length}개)</h2>
              <button
                onClick={() => { setStep('topic'); setHooks([]); setSelectedHook(null); }}
                className="text-sm text-foreground/40 hover:text-foreground transition-colors"
              >
                &#8592; 이전 단계
              </button>
            </div>

            {hooks.map((hook, i) => (
              <button
                key={hook.id || i}
                onClick={() => setSelectedHook(hook)}
                className={`w-full text-left p-6 rounded-xl border transition-all card-glow ${
                  selectedHook?.id === hook.id
                    ? 'border-accent bg-accent/5'
                    : 'border-card-border bg-card-bg hover:border-accent/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold gradient-text">{hook.headline}</h3>
                  {selectedHook?.id === hook.id && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs shrink-0 ml-2">선택됨</span>
                  )}
                </div>
                <p className="text-sm text-foreground/60 mb-3">{hook.subheadline}</p>
                <div className="space-y-1.5 mb-3">
                  {(hook.bodyPoints || []).map((point: string, j: number) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-foreground/50">
                      <span className="text-accent mt-0.5 text-xs shrink-0">&#9679;</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/30">타겟: {hook.targetAudience}</span>
                  <span className="text-accent font-medium">{hook.callToAction}</span>
                </div>
              </button>
            ))}

            {selectedHook && (
              <button
                onClick={generateCarousel}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                카루셀 이미지 생성 (NanoBanana + Gemini)
              </button>
            )}
          </div>
        )}

        {/* ===== STEP 3: 카루셀 미리보기 ===== */}
        {step === 'carousel' && carousel && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">카루셀 슬라이드 ({carousel.slides.length}장)</h2>
              <button onClick={() => setStep('hooks')} className="text-sm text-foreground/40 hover:text-foreground transition-colors">
                &#8592; 이전 단계
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {carousel.slides.map((slide: Record<string, unknown>, i: number) => (
                <div
                  key={(slide.id as string) || i}
                  className="aspect-square rounded-xl border border-card-border overflow-hidden relative"
                  style={{ backgroundColor: (slide.bgColor as string) || '#0F172A' }}
                >
                  {carousel.generatedImages?.[i] && (
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        backgroundImage: `url(${carousel.generatedImages[i]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  )}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                    <div className="text-[10px] font-bold mb-1 opacity-60" style={{ color: (slide.accentColor as string) || '#818CF8' }}>
                      {slide.order as number}/{carousel.slides.length}
                    </div>
                    <h4 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: (slide.textColor as string) || '#F8FAFC' }}>
                      {slide.title as string}
                    </h4>
                    <p className="text-xs line-clamp-3 opacity-70" style={{ color: (slide.textColor as string) || '#F8FAFC' }}>
                      {slide.body as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={generateLanding}
                disabled={loading}
                className="py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                랜딩 페이지 생성
              </button>
              <button
                onClick={goToPreview}
                className="py-3.5 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-bold text-sm hover:border-accent/30 transition-all"
              >
                미리보기 &amp; 다운로드
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: 랜딩 페이지 ===== */}
        {step === 'landing' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">랜딩 페이지 미리보기</h2>
              <button onClick={() => setStep('carousel')} className="text-sm text-foreground/40 hover:text-foreground transition-colors">
                &#8592; 이전 단계
              </button>
            </div>

            <div className="rounded-xl border border-card-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-card-bg border-b border-card-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 px-3 py-1 rounded-md bg-background text-xs text-foreground/30 text-center">
                  {companyName || 'your-product'}.com
                </div>
              </div>
              <iframe
                srcDoc={landingHtml}
                className="w-full h-[600px] bg-white"
                title="Landing Page Preview"
                sandbox="allow-scripts"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => {
                  const blob = new Blob([landingHtml], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${productName || 'landing'}-page.html`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30 transition-all"
              >
                HTML 다운로드
              </button>
              <button
                onClick={generateLanding}
                disabled={loading}
                className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30 transition-all disabled:opacity-50"
              >
                다시 생성
              </button>
              <button
                onClick={goToPreview}
                className="py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity"
              >
                전체 미리보기
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
