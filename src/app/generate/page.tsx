'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import {
  generateHooks, generateCarouselSlides, generateSlideImages,
  getActiveProvider, hasGeminiKey, saveToHistory,
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
  const [editingScripts, setEditingScripts] = useState<{
    title: string;
    subtitle: string;
    body: string;
    imagePrompt?: string;
    textEmphasis?: string;
    colorScheme?: string;
    emotion?: string;
    type?: string;
  }[]>([]);
  const [carousel, setCarousel] = useState<CarouselSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook'>('instagram');
  const [slideCount, setSlideCount] = useState(8);

  useEffect(() => {
    const s = sessionStorage.getItem('selectedTopic');
    if (s) { try { setTopic(JSON.parse(s)); } catch {} }
  }, []);

  // Step 2: 대본 생성
  async function doGenHooks() {
    if (!topic || getActiveProvider() === 'none') { setError('설정에서 API 키를 입력해주세요.'); return; }
    setLoading(true); setLoadingMsg('웹 검색 1라운드 → 2라운드 교차검증 → 최신 팩트 기반 대본 작성 중...'); setError(null);
    try {
      const result = await generateHooks(topic, tone, 3);
      setHooks(result.map((h: Record<string, unknown>, i: number) => ({
        ...h, id: `hook_${i+1}`, topicId: topic.id, tone,
      })) as HookContent[]);
      setStep('hooks');
    } catch (e) { setError(e instanceof Error ? e.message : '생성 실패'); }
    finally { setLoading(false); }
  }

  // 대본 선택 → AI로 풍부한 대본 자동 생성
  async function selectHook(hook: HookContent) {
    setSelectedHook(hook);
    setLoading(true);
    setLoadingMsg('AI가 각 장면별 상세 대본을 작성 중... (제목/부제목/본문/예시)');
    try {
      const slides = await generateCarouselSlides({
        headline: hook.headline,
        subheadline: hook.subheadline,
        bodyPoints: hook.bodyPoints || [],
        callToAction: hook.callToAction,
      }, slideCount);
      const topicKey = hook.headline + ' ' + hook.subheadline;
      setEditingScripts((slides as Record<string, unknown>[]).map((s, i) => {
        const title = String(s.title || '');
        const subtitle = String(s.subtitle || '');
        const body = String(s.body || '');
        const stageName = String(s.type || (i === 0 ? 'Hook' : i === slides.length - 1 ? 'CTA' : 'Content'));

        // AI가 imagePrompt 안 넣었으면 주제 기반 자동 생성
        const autoImagePrompt = `한국 ${topicKey} 주제. 장면: ${body}. 인물: 30대 한국인. 스타일: realistic photo, cinematic, 4k, DSLR quality. 느낌: ${stageName === 'Hook' ? '충격' : stageName === 'CTA' ? '결심' : '진지함'}`;

        return {
          title,
          subtitle,
          body,
          imagePrompt: String(s.imagePrompt || '') || autoImagePrompt,
          textEmphasis: String(s.textEmphasis || '') || title,
          colorScheme: String(s.colorScheme || '') || '다크 + 보라 액센트',
          emotion: String(s.emotion || '') || (stageName === 'Hook' ? '궁금증 유발' : '공감'),
          type: stageName,
        };
      }));
    } catch (e) {
      // AI 생성 실패 (Rate limit 등) → 주제/본문 기반 스마트 폴백
      setError(`AI 대본 생성 실패로 자동 폴백 사용 중: ${e instanceof Error ? e.message : ''}. 1-2분 후 "다른 대본 선택" 후 재시도 가능.`);
      const topicKey = hook.headline + ' ' + hook.subheadline;
      const total = hook.bodyPoints?.length || 5;
      setEditingScripts((hook.bodyPoints || []).map((p, i) => {
        const isFirst = i === 0;
        const isLast = i === total - 1;
        const stageName = isFirst ? 'Hook' : isLast ? 'CTA' : i === 1 ? 'Proof' : i === 2 ? 'Differentiation' : 'Result';

        // 주제/본문 기반 이미지 프롬프트 자동 생성
        const imagePrompt = `한국 ${topicKey} 주제에 맞는 사실적 장면.
장면: ${p}
인물: 30대 한국인, 해당 주제와 관련된 표정/상황
장소: ${p.includes('헬스') || p.includes('운동') ? '헬스장' : p.includes('투자') || p.includes('주식') ? '사무실/카페' : p.includes('음식') || p.includes('식단') ? '주방/식당' : '실내 공간'}
스타일: realistic photo, cinematic lighting, 4k, DSLR quality
느낌: ${stageName === 'Hook' ? '충격과 놀람' : stageName === 'CTA' ? '결심과 동기부여' : '진지함과 신뢰'}`;

        return {
          title: isFirst ? hook.headline : p.length > 15 ? p.slice(0, 15) : p,
          subtitle: isFirst ? hook.subheadline : `${stageName}: 핵심 포인트`,
          body: p,
          imagePrompt,
          textEmphasis: isFirst ? hook.headline : p.slice(0, 20),
          colorScheme: isFirst ? '강렬한 레드+블랙' : isLast ? '밝은 오렌지+화이트' : '차분한 다크+보라',
          emotion: stageName === 'Hook' ? '나도 해볼까?' : stageName === 'CTA' ? '지금 시작!' : '그럴 수 있네',
          type: stageName,
        };
      }));
    } finally {
      setLoading(false);
    }
  }

  // 대본 편집
  function updateScript(index: number, field: 'title' | 'subtitle' | 'body' | 'imagePrompt' | 'textEmphasis' | 'colorScheme' | 'emotion', value: string) {
    setEditingScripts(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  }

  // 대본 추가/삭제
  function addScript() { setEditingScripts(prev => [...prev, { title: '새 장면', subtitle: '부제목', body: '내용을 입력하세요', imagePrompt: '', textEmphasis: '', colorScheme: '', emotion: '' }]); }
  function removeScript(index: number) { if (editingScripts.length > 2) setEditingScripts(prev => prev.filter((_, i) => i !== index)); }

  // Step 3: 이미지 생성
  async function doGenImages() {
    if (!selectedHook || editingScripts.length === 0) return;
    setLoading(true); setError(null);
    try {
      // 편집된 대본으로 슬라이드 구조 직접 생성
      const slides = editingScripts.map((s, i) => ({
        id: `slide_${i+1}`, order: i+1,
        type: s.type || (i === 0 ? 'Hook' : i === editingScripts.length - 1 ? 'CTA' : 'Content'),
        title: s.title, subtitle: s.subtitle, body: s.body,
        imagePrompt: s.imagePrompt, textEmphasis: s.textEmphasis || s.title,
        colorScheme: s.colorScheme, emotion: s.emotion,
        bullets: [], bgColor: '#0F172A', textColor: '#F8FAFC', accentColor: '#818CF8',
      }));

      let images: string[] = [];
      if (hasGeminiKey()) {
        setLoadingMsg(`NanoBanana로 ${platform} 이미지 ${slides.length}장 생성 중... (각 이미지에 대본 포함)`);
        images = await generateSlideImages(slides as Record<string, unknown>[], platform);
      } else {
        setLoadingMsg('이미지 생성 중 (Gemini 키 없음 - 텍스트만)...');
      }

      const result: CarouselSet = {
        id: `c_${Date.now()}`, hookContentId: selectedHook.id,
        slides: slides as Record<string, unknown>[],
        format: platform, generatedImages: images,
      };

      setCarousel(result);

      // 히스토리 저장 (IndexedDB - 이미지 포함)
      await saveToHistory({
        topic: topic?.title || '커스텀',
        headline: selectedHook.headline,
        platform,
        slideCount: slides.length,
        images,
        scripts: editingScripts,
      });

      setStep('carousel');
    } catch (e) { setError(e instanceof Error ? e.message : '이미지 생성 실패'); }
    finally { setLoading(false); }
  }

  // 개별 이미지 다운로드
  function downloadImage(index: number) {
    const img = carousel?.generatedImages[index];
    if (!img) return;
    const a = document.createElement('a');
    a.href = img;
    a.download = `hookflow-${platform}-${index + 1}.png`;
    a.click();
  }

  // 전체 다운로드
  async function downloadAll() {
    if (!carousel) return;
    for (let i = 0; i < carousel.generatedImages.length; i++) {
      if (carousel.generatedImages[i]) { downloadImage(i); await new Promise(r => setTimeout(r, 500)); }
    }
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
            <div className="flex-1">{error}</div>
            <button onClick={() => setError(null)} className="text-danger/50">&#10005;</button>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-8 rounded-2xl bg-card-bg border border-card-border max-w-sm">
              <div className="w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
              <p className="text-foreground/70 text-sm font-medium">{loadingMsg}</p>
            </div>
          </div>
        )}

        {/* ===== STEP 1: 토픽 선택 ===== */}
        {step === 'topic' && (
          <div className="animate-slide-up space-y-5">
            {topic ? (
              <>
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/15 text-accent">선택된 토픽</span>
                  <h2 className="text-xl font-bold mt-3 mb-2">{topic.title}</h2>
                  <p className="text-foreground/50 text-sm">{topic.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                    <h3 className="text-sm font-bold mb-3 text-foreground/70">톤</h3>
                    <div className="space-y-2">
                      {[{ key: 'informative', label: '정보형' }, { key: 'provocative', label: '자극형' }, { key: 'storytelling', label: '스토리' }].map(t => (
                        <button key={t.key} onClick={() => setTone(t.key)}
                          className={`w-full p-2.5 rounded-lg border text-left text-sm ${tone === t.key ? 'border-accent bg-accent/10' : 'border-card-border'}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                    <h3 className="text-sm font-bold mb-3 text-foreground/70">플랫폼</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'instagram' as const, label: '📸 Instagram', size: '1:1' },
                        { key: 'tiktok' as const, label: '🎵 TikTok', size: '9:16' },
                        { key: 'facebook' as const, label: '📘 Facebook', size: '16:9' },
                      ].map(p => (
                        <button key={p.key} onClick={() => setPlatform(p.key)}
                          className={`w-full p-2.5 rounded-lg border text-left text-sm ${platform === p.key ? 'border-accent bg-accent/10' : 'border-card-border'}`}>
                          {p.label} <span className="text-foreground/30 text-xs">({p.size})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-sm font-bold mb-3 text-foreground/70">이미지 수 &amp; 브랜드</h3>
                  <div className="flex gap-2 mb-3">
                    {[5, 6, 7, 8, 10].map(n => (
                      <button key={n} onClick={() => setSlideCount(n)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${slideCount === n ? 'border-accent bg-accent/10 text-accent' : 'border-card-border text-foreground/50'}`}>
                        {n}장
                      </button>
                    ))}
                  </div>
                  <input type="text" placeholder="브랜드/회사명 (선택)" value={companyName} onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent" />
                </div>

                <button onClick={doGenHooks} disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-accent/20 disabled:opacity-50">
                  AI 후킹 대본 생성
                </button>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-foreground/40 mb-4">대시보드에서 토픽을 선택해주세요.</p>
                <button onClick={() => router.push('/')} className="px-6 py-2.5 rounded-lg bg-accent/15 text-accent text-sm font-medium">대시보드로 이동</button>
              </div>
            )}
          </div>
        )}

        {/* ===== STEP 2: 대본 선택 + 편집 ===== */}
        {step === 'hooks' && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">대본 선택 &amp; 편집</h2>
              <button onClick={() => { setStep('topic'); setHooks([]); setSelectedHook(null); setEditingScripts([]); }} className="text-sm text-foreground/40">&#8592; 이전</button>
            </div>

            {/* 대본 후보 목록 */}
            {!selectedHook && hooks.map((h, i) => (
              <button key={h.id || i} onClick={() => selectHook(h)}
                className="w-full text-left p-5 rounded-xl border border-card-border bg-card-bg hover:border-accent/30 transition-all card-glow">
                <h3 className="text-lg font-bold gradient-text mb-1">{h.headline}</h3>
                <p className="text-sm text-foreground/60 mb-2">{h.subheadline}</p>
                <div className="text-xs text-foreground/30">{(h.bodyPoints || []).length}컷 대본 | 타겟: {h.targetAudience}</div>
              </button>
            ))}

            {/* 선택 후 편집 모드 */}
            {selectedHook && (
              <>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-between">
                  <span className="text-sm font-bold text-accent">대본 편집 모드 - 내용을 자유롭게 수정하세요</span>
                  <button onClick={() => { setSelectedHook(null); setEditingScripts([]); }} className="text-xs text-foreground/40">다른 대본 선택</button>
                </div>

                <div className="space-y-4">
                  {editingScripts.map((script, i) => (
                    <div key={i} className={`p-5 rounded-xl bg-card-bg border group ${i === 0 ? 'border-accent/50' : 'border-card-border'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-accent text-white' : 'bg-card-border text-foreground/50'}`}>{i+1}</span>
                          <span className={`text-xs font-bold ${i === 0 ? 'text-accent' : 'text-foreground/40'}`}>
                            {script.type || (i === 0 ? 'Hook' : i === editingScripts.length - 1 ? 'CTA' : 'Content')}
                          </span>
                        </div>
                        {editingScripts.length > 2 && (
                          <button onClick={() => removeScript(i)} className="text-xs text-danger/50 hover:text-danger opacity-0 group-hover:opacity-100">삭제</button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* 기본 콘텐츠 */}
                        <div className="space-y-2 p-3 rounded-lg bg-background/50 border border-card-border/50">
                          <div className="text-[10px] text-accent font-bold">콘텐츠</div>
                          <div>
                            <label className="text-[10px] text-foreground/50 mb-1 block">제목 (10-15자, 강한 어그로)</label>
                            <input type="text" value={script.title} onChange={e => updateScript(i, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm font-bold focus:outline-none focus:border-accent" />
                          </div>
                          <div>
                            <label className="text-[10px] text-foreground/50 mb-1 block">부제 (20-30자, 문제+해결)</label>
                            <input type="text" value={script.subtitle} onChange={e => updateScript(i, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm focus:outline-none focus:border-accent" />
                          </div>
                          <div>
                            <label className="text-[10px] text-foreground/50 mb-1 block">본문 (80-120자, 쉬운 설명+궁금증)</label>
                            <textarea value={script.body} onChange={e => updateScript(i, 'body', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm resize-none focus:outline-none focus:border-accent" rows={3} />
                          </div>
                        </div>

                        {/* 이미지 프롬프트 */}
                        <div className="space-y-2 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                          <div className="text-[10px] text-purple-400 font-bold">이미지 설정 (NanoBanana)</div>
                          <div>
                            <label className="text-[10px] text-foreground/50 mb-1 block">이미지 프롬프트 (인물+장소+행동+감정+스타일)</label>
                            <textarea value={script.imagePrompt || ''} onChange={e => updateScript(i, 'imagePrompt', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-xs focus:outline-none focus:border-accent" rows={2}
                              placeholder="30대 한국 남성이 헬스장에서 땀 흘리며 운동, 놀란 표정, realistic, cinematic, 4k" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-foreground/50 mb-1 block">이미지 내 강조 텍스트</label>
                              <input type="text" value={script.textEmphasis || ''} onChange={e => updateScript(i, 'textEmphasis', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-xs focus:outline-none focus:border-accent"
                                placeholder="30분 = 지방 삭제?" />
                            </div>
                            <div>
                              <label className="text-[10px] text-foreground/50 mb-1 block">색상 톤</label>
                              <input type="text" value={script.colorScheme || ''} onChange={e => updateScript(i, 'colorScheme', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-xs focus:outline-none focus:border-accent"
                                placeholder="레드 + 블랙 대비" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-foreground/50 mb-1 block">유도 감정</label>
                            <input type="text" value={script.emotion || ''} onChange={e => updateScript(i, 'emotion', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-xs focus:outline-none focus:border-accent"
                              placeholder="나도 해볼까?" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={addScript} className="w-full py-2 rounded-lg border border-dashed border-card-border text-sm text-foreground/40 hover:text-accent hover:border-accent/30">
                  + 장면 추가
                </button>

                <button onClick={doGenImages} disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 shadow-lg shadow-accent/20 disabled:opacity-50">
                  {platformLabel} 이미지 {editingScripts.length}장 생성 (대본 텍스트 포함)
                </button>
              </>
            )}
          </div>
        )}

        {/* ===== STEP 3: 완성 이미지 ===== */}
        {step === 'carousel' && carousel && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{platformLabel} 이미지 완성 ({carousel.slides.length}장)</h2>
              <button onClick={() => setStep('hooks')} className="text-sm text-foreground/40">&#8592; 대본 수정</button>
            </div>

            {/* 이미지 그리드 */}
            <div className={`grid gap-4 ${platform === 'tiktok' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
              {carousel.slides.map((s: Record<string, unknown>, i: number) => {
                const hasImg = !!carousel.generatedImages[i];
                return (
                  <div key={String(s.id || i)} className="group relative">
                    <div className={`rounded-xl border border-card-border overflow-hidden ${platform === 'tiktok' ? 'aspect-[9/16]' : platform === 'facebook' ? 'aspect-[16/9]' : 'aspect-square'}`}
                      style={{ backgroundColor: '#0F172A' }}>
                      {hasImg ? (
                        <img src={carousel.generatedImages[i]} alt={`${i+1}장`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="p-4 h-full flex flex-col justify-center">
                          <h4 className="text-sm font-bold text-white mb-1">{String(s.title)}</h4>
                          <p className="text-xs text-white/60">{String(s.body)}</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold">
                      {i === 0 ? '메인' : `${i+1}`}
                    </div>
                    {hasImg && (
                      <button onClick={() => downloadImage(i)}
                        className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                        다운로드
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 액션 버튼 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button onClick={downloadAll}
                className="py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90">
                전체 다운로드
              </button>
              <button onClick={() => alert('SNS 연동은 다음 업데이트에서 제공됩니다.\n\n현재는 이미지를 다운로드 후 직접 업로드해주세요.')}
                className="py-3 rounded-xl bg-card-bg border border-accent/30 text-accent font-medium text-sm hover:bg-accent/10">
                SNS 올리기
              </button>
              <button onClick={() => alert('예약 발행 기능은 다음 업데이트에서 제공됩니다.')}
                className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30">
                예약 발행
              </button>
              <button onClick={doGenImages} disabled={loading}
                className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 font-medium text-sm hover:border-accent/30 disabled:opacity-50">
                다시 생성
              </button>
            </div>

            {/* 대본 확인 */}
            <details className="rounded-xl bg-card-bg border border-card-border" open>
              <summary className="p-4 text-sm font-bold text-foreground/70 cursor-pointer">대본 확인 ({carousel.slides.length}컷)</summary>
              <div className="px-4 pb-4 space-y-4">
                {editingScripts.map((s, i) => (
                  <div key={i} className="p-3 rounded-lg bg-background/50 border border-card-border">
                    <div className="flex items-start gap-3">
                      <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-accent text-white' : 'bg-card-border text-foreground/50'}`}>{i+1}</span>
                      <div className="flex-1 space-y-1.5">
                        <div>
                          <div className="text-[10px] text-accent font-bold">제목</div>
                          <div className="text-sm font-bold">{s.title}</div>
                        </div>
                        {s.subtitle && (
                          <div>
                            <div className="text-[10px] text-foreground/40 font-bold">부제목</div>
                            <div className="text-sm text-foreground/70">{s.subtitle}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-[10px] text-foreground/40 font-bold">본문</div>
                          <div className="text-sm text-foreground/60 leading-relaxed">{s.body}</div>
                        </div>
                        {s.emotion && (
                          <div>
                            <div className="text-[10px] text-purple-400 font-bold">유도 감정</div>
                            <div className="text-xs text-foreground/50 italic">{s.emotion}</div>
                          </div>
                        )}
                        {s.imagePrompt && (
                          <div>
                            <div className="text-[10px] text-purple-400 font-bold">이미지 프롬프트</div>
                            <div className="text-[10px] text-foreground/40 font-mono">{s.imagePrompt}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </main>
    </>
  );
}
