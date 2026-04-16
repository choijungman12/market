'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import {
  generateHooks, generateCarouselSlides, generateLandingHtml,
  generateSlideImages, getActiveProvider, hasGeminiKey,
} from '@/lib/client-api';
import type { HookContent, CarouselSet, WorkflowStep } from '@/types';

interface Topic { id: string; title: string; description: string; source: string; traffic: string; relatedQueries: string[]; }

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState<WorkflowStep>('topic');
  const [topic, setTopic] = useState<Topic | null>(null);
  const [tone, setTone] = useState('provocative');
  const [hooks, setHooks] = useState<HookContent[]>([]);
  const [selectedHook, setSelectedHook] = useState<HookContent | null>(null);
  const [carousel, setCarousel] = useState<CarouselSet | null>(null);
  const [landingHtml, setLandingHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook'>('instagram');
  const [slideCount, setSlideCount] = useState(8);

  useEffect(() => {
    const s = sessionStorage.getItem('selectedTopic');
    if (s) { try { setTopic(JSON.parse(s)); } catch {} }
  }, []);

  async function doGenHooks() {
    if (!topic || getActiveProvider() === 'none') {
      setError('설정 페이지에서 Anthropic API 키를 먼저 입력해주세요.'); return;
    }
    setLoading(true); setLoadingMsg('AI가 후킹 대본을 작성 중...'); setError(null);
    try {
      const result = await generateHooks(topic, tone, 3);
      setHooks(result.map((h: Record<string, unknown>, i: number) => ({
        ...h, id: `hook_${i+1}`, topicId: topic.id, tone,
      })) as HookContent[]);
      setStep('hooks');
    } catch (e) { setError(e instanceof Error ? e.message : '생성 실패'); }
    finally { setLoading(false); }
  }

  async function doGenImages() {
    if (!selectedHook) return;
    setLoading(true); setError(null);

    try {
      setLoadingMsg(`대본 ${slideCount}컷 구성 중...`);
      const slides = await generateCarouselSlides(selectedHook, slideCount);

      let images: string[] = [];
      if (hasGeminiKey()) {
        setLoadingMsg(`NanoBanana로 ${platform} 이미지 ${slides.length}장 생성 중...`);
        images = await generateSlideImages(slides as Record<string, unknown>[], platform);
      }

      setCarousel({
        id: `c_${Date.now()}`, hookContentId: selectedHook.id,
        slides: slides as Record<string, unknown>[],
        format: platform, generatedImages: images,
      });
      setStep('carousel');
    } catch (e) { setError(e instanceof Error ? e.message : '이미지 생성 실패'); }
    finally { setLoading(false); }
  }

  async function doGenLanding() {
    if (!selectedHook) return;
    setLoading(true); setLoadingMsg('랜딩 페이지 디자인 중...'); setError(null);
    try {
      const html = await generateLandingHtml({
        heroTitle: selectedHook.headline, heroSubtitle: selectedHook.subheadline,
        features: (selectedHook.bodyPoints || []).map(p => ({ title: p.slice(0, 30), description: p })),
        ctaText: selectedHook.callToAction || '자세히 알아보기',
        companyName: companyName || undefined, productName: productName || undefined,
      });
      setLandingHtml(html);
      setStep('landing');
    } catch (e) { setError(e instanceof Error ? e.message : '랜딩 페이지 실패'); }
    finally { setLoading(false); }
  }

  function goToPreview() {
    if (carousel) sessionStorage.setItem('carouselData', JSON.stringify(carousel));
    if (landingHtml) sessionStorage.setItem('landingHtml', landingHtml);
    router.push('/preview');
  }

  const platformLabel = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook' }[platform];

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Stepper currentStep={step} />

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-danger/10 border border-danger/30 text-sm text-danger flex items-start gap-3">
            <span>&#9888;</span>
            <div className="flex-1"><p className="font-medium">오류</p><p className="text-danger/70 mt-1">{error}</p></div>
            <button onClick={() => setError(null)} className="text-danger/50 hover:text-danger">&#10005;</button>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-8 rounded-2xl bg-card-bg border border-card-border max-w-sm">
              <div className="w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
              <p className="text-foreground/70 text-sm font-medium">{loadingMsg}</p>
              <p className="text-foreground/30 text-xs mt-2">잠시만 기다려주세요...</p>
            </div>
          </div>
        )}

        {/* ===== STEP 1: 토픽 확인 ===== */}
        {step === 'topic' && (
          <div className="animate-slide-up">
            {topic ? (
              <div className="space-y-5">
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent">선택된 토픽</span>
                  <h2 className="text-xl font-bold mt-3 mb-2">{topic.title}</h2>
                  <p className="text-foreground/50 text-sm">{topic.description}</p>
                </div>

                {/* 톤 선택 */}
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">콘텐츠 톤</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: 'informative', label: '정보형', desc: '데이터 중심' },
                      { key: 'provocative', label: '자극형', desc: '호기심 유발' },
                      { key: 'storytelling', label: '스토리', desc: '감정 공감' },
                    ].map(t => (
                      <button key={t.key} onClick={() => setTone(t.key)}
                        className={`p-3 rounded-lg border text-left transition-all ${tone === t.key ? 'border-accent bg-accent/10' : 'border-card-border hover:border-accent/30'}`}>
                        <div className="font-medium text-sm">{t.label}</div>
                        <div className="text-xs text-foreground/40 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SNS 플랫폼 + 이미지 장수 */}
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">SNS 플랫폼 &amp; 이미지 수</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {([
                      { key: 'instagram' as const, label: 'Instagram', size: '1080x1080', icon: '📸' },
                      { key: 'tiktok' as const, label: 'TikTok', size: '1080x1920', icon: '🎵' },
                      { key: 'facebook' as const, label: 'Facebook', size: '1200x628', icon: '📘' },
                    ]).map(p => (
                      <button key={p.key} onClick={() => setPlatform(p.key)}
                        className={`p-3 rounded-lg border text-left transition-all ${platform === p.key ? 'border-accent bg-accent/10' : 'border-card-border hover:border-accent/30'}`}>
                        <div className="font-medium text-sm">{p.icon} {p.label}</div>
                        <div className="text-xs text-foreground/40 mt-0.5">{p.size}</div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-foreground/50 mb-1 block">이미지 장수</label>
                    <div className="flex gap-2">
                      {[5, 6, 7, 8, 10].map(n => (
                        <button key={n} onClick={() => setSlideCount(n)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${slideCount === n ? 'border-accent bg-accent/10 text-accent' : 'border-card-border text-foreground/50'}`}>
                          {n}장
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 회사/제품 */}
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">제품/회사 (선택)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="회사명" value={companyName} onChange={e => setCompanyName(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent" />
                    <input type="text" placeholder="제품명" value={productName} onChange={e => setProductName(e.target.value)}
                      className="px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent" />
                  </div>
                </div>

                {!hasGeminiKey() && (
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 flex items-center justify-between">
                    <span>이미지 생성을 위해 설정에서 Gemini(NanoBanana) 키를 추가하세요</span>
                    <button onClick={() => router.push('/settings')} className="px-3 py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 shrink-0 ml-2">설정</button>
                  </div>
                )}

                <button onClick={doGenHooks} disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-accent/20 disabled:opacity-50">
                  AI 후킹 대본 생성하기
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/40 mb-4">대시보드에서 토픽을 선택하거나 직접 입력해주세요.</p>
                <button onClick={() => router.push('/')} className="px-6 py-2.5 rounded-lg bg-accent/15 text-accent text-sm font-medium">대시보드로 이동</button>
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 2: 대본 선택 ===== */}
        {step === 'hooks' && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">후킹 대본 ({hooks.length}개)</h2>
              <button onClick={() => { setStep('topic'); setHooks([]); setSelectedHook(null); }} className="text-sm text-foreground/40 hover:text-foreground">&#8592; 이전</button>
            </div>
            {hooks.map((h, i) => (
              <button key={h.id || i} onClick={() => setSelectedHook(h)}
                className={`w-full text-left p-5 rounded-xl border transition-all card-glow ${selectedHook?.id === h.id ? 'border-accent bg-accent/5' : 'border-card-border bg-card-bg hover:border-accent/30'}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold gradient-text">{h.headline}</h3>
                  {selectedHook?.id === h.id && <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs shrink-0 ml-2">선택됨</span>}
                </div>
                <p className="text-sm text-foreground/60 mb-3">{h.subheadline}</p>
                <div className="space-y-1 mb-3">{(h.bodyPoints || []).map((p: string, j: number) => (
                  <div key={j} className="flex gap-2 text-sm text-foreground/50"><span className="text-accent text-xs shrink-0">{j+1}.</span><span>{p}</span></div>
                ))}</div>
                <div className="flex justify-between text-xs"><span className="text-foreground/30">타겟: {h.targetAudience}</span><span className="text-accent font-medium">{h.callToAction}</span></div>
              </button>
            ))}
            {selectedHook && (
              <button onClick={doGenImages} disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-accent/20 disabled:opacity-50">
                {platformLabel} 이미지 {slideCount}장 생성 {hasGeminiKey() ? '(NanoBanana)' : '(텍스트만)'}
              </button>
            )}
          </div>
        )}

        {/* ===== STEP 3: SNS 이미지 확인 ===== */}
        {step === 'carousel' && carousel && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{platformLabel} 이미지 {carousel.slides.length}장</h2>
              <button onClick={() => setStep('hooks')} className="text-sm text-foreground/40 hover:text-foreground">&#8592; 이전</button>
            </div>

            {/* 이미지 그리드 */}
            <div className={`grid gap-4 ${platform === 'tiktok' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
              {carousel.slides.map((s: Record<string, unknown>, i: number) => {
                const hasImg = !!carousel.generatedImages[i];
                return (
                  <div key={String(s.id || i)}
                    className={`rounded-xl border border-card-border overflow-hidden relative ${platform === 'tiktok' ? 'aspect-[9/16]' : platform === 'facebook' ? 'aspect-[1.91/1]' : 'aspect-square'}`}
                    style={{ backgroundColor: String(s.bgColor || '#0F172A') }}>
                    {hasImg && (
                      <img src={carousel.generatedImages[i]} alt={`슬라이드 ${i+1}`}
                        className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    {!hasImg && (
                      <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                        <div className="text-[10px] font-bold mb-1 opacity-60" style={{ color: String(s.accentColor || '#818CF8') }}>
                          {i === 0 ? '메인' : `${Number(s.order)}/${carousel.slides.length}`}
                        </div>
                        <h4 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: String(s.textColor || '#F8FAFC') }}>{String(s.title)}</h4>
                        <p className="text-xs line-clamp-3 opacity-70" style={{ color: String(s.textColor || '#F8FAFC') }}>{String(s.body)}</p>
                      </div>
                    )}
                    {/* 순서 표시 */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                      {i === 0 ? '메인' : `${i+1}`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 대본 목록 */}
            <div className="p-5 rounded-xl bg-card-bg border border-card-border">
              <h3 className="text-sm font-bold mb-3 text-foreground/70">대본 ({carousel.slides.length}컷)</h3>
              <div className="space-y-2">
                {carousel.slides.map((s: Record<string, unknown>, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-accent text-white' : 'bg-card-border text-foreground/50'}`}>{i+1}</span>
                    <div>
                      <div className="font-medium text-foreground/80">{String(s.title)}</div>
                      <div className="text-xs text-foreground/40">{String(s.body)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button onClick={doGenLanding} disabled={loading} className="py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50">랜딩 페이지</button>
              <button onClick={goToPreview} className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30">미리보기</button>
              <button onClick={doGenImages} disabled={loading} className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30 disabled:opacity-50">다시 생성</button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: 랜딩 페이지 ===== */}
        {step === 'landing' && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">랜딩 페이지</h2>
              <button onClick={() => setStep('carousel')} className="text-sm text-foreground/40 hover:text-foreground">&#8592; 이전</button>
            </div>
            <div className="rounded-xl border border-card-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-card-bg border-b border-card-border">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-danger/60"/><div className="w-3 h-3 rounded-full bg-warning/60"/><div className="w-3 h-3 rounded-full bg-success/60"/></div>
                <div className="flex-1 px-3 py-1 rounded-md bg-background text-xs text-foreground/30 text-center">{companyName || productName || 'your-brand'}.com</div>
              </div>
              <iframe srcDoc={landingHtml} className="w-full h-[600px] bg-white" title="Preview" sandbox="allow-scripts" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => { const b=new Blob([landingHtml],{type:'text/html'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='landing.html';a.click();URL.revokeObjectURL(u); }}
                className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30">HTML 다운로드</button>
              <button onClick={doGenLanding} disabled={loading} className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30 disabled:opacity-50">다시 생성</button>
              <button onClick={goToPreview} className="py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90">전체 미리보기</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
