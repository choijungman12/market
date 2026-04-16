'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import type { CarouselSet, DynamicSlide } from '@/types';

export default function PreviewPage() {
  const router = useRouter();
  const [carousel, setCarousel] = useState<CarouselSet | null>(null);
  const [landingHtml, setLandingHtml] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'landing'>('carousel');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const carouselData = sessionStorage.getItem('carouselData');
    const landing = sessionStorage.getItem('landingHtml');
    if (carouselData) {
      try { setCarousel(JSON.parse(carouselData)); } catch {}
    }
    if (landing) setLandingHtml(landing);
  }, []);

  // ===== 슬라이드를 Canvas로 렌더링 후 PNG 다운로드 =====
  function downloadSlide(index: number) {
    if (!carousel) return;
    const slide = carousel.slides[index];
    if (!slide) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    const bgColor = (slide.bgColor as string) || '#0F172A';
    const textColor = (slide.textColor as string) || '#F8FAFC';
    const accentColor = (slide.accentColor as string) || '#818CF8';
    const title = (slide.title as string) || '';
    const body = (slide.body as string) || '';
    const order = (slide.order as number) || index + 1;
    const bullets = (slide.bullets as string[]) || [];

    // 배경
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    // 그라데이션 오버레이
    const grad = ctx.createRadialGradient(W * 0.3, H * 0.3, 0, W * 0.3, H * 0.3, W * 0.6);
    grad.addColorStop(0, accentColor + '33');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 배경 이미지가 있으면 그리기
    const bgImage = carousel.generatedImages?.[index];
    if (bgImage && bgImage.startsWith('data:image/svg')) {
      // SVG 플레이스홀더는 오버레이로만 사용
    }

    // 슬라이드 번호
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`${order} / ${carousel.slides.length}`, 80, 150);

    // 제목
    ctx.fillStyle = textColor;
    ctx.font = 'bold 52px sans-serif';
    const titleLines = wrapCanvasText(ctx, title, W - 160);
    let y = H * 0.35;
    for (const line of titleLines) {
      ctx.fillText(line, 80, y);
      y += 65;
    }

    // 본문
    ctx.globalAlpha = 0.7;
    ctx.font = '28px sans-serif';
    const bodyLines = wrapCanvasText(ctx, body, W - 160);
    y += 20;
    for (const line of bodyLines.slice(0, 4)) {
      ctx.fillText(line, 80, y);
      y += 40;
    }

    // 불릿
    if (bullets.length > 0) {
      y += 10;
      ctx.font = '24px sans-serif';
      for (const bullet of bullets.slice(0, 5)) {
        ctx.fillText(`  •  ${bullet}`, 80, y);
        y += 36;
      }
    }

    ctx.globalAlpha = 1;

    // 브랜딩
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.4;
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('HookFlow AI', 80, H - 60);
    ctx.globalAlpha = 1;

    // 다운로드
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hookflow-slide-${index + 1}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  async function downloadAll() {
    if (!carousel) return;
    for (let i = 0; i < carousel.slides.length; i++) {
      downloadSlide(i);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!carousel) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4 opacity-30">&#128444;</div>
            <p className="text-foreground/40 mb-4">미리볼 콘텐츠가 없습니다.</p>
            <button
              onClick={() => router.push('/generate')}
              className="px-6 py-2.5 rounded-lg bg-accent/15 text-accent text-sm font-medium"
            >
              콘텐츠 생성하기
            </button>
          </div>
        </main>
      </>
    );
  }

  const slide = carousel.slides[currentSlide] as DynamicSlide;

  return (
    <>
      <Navbar />
      {/* 숨겨진 Canvas (이미지 생성용) */}
      <canvas ref={canvasRef} className="hidden" />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* 뷰 모드 토글 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'bg-card-bg text-foreground/50 border border-card-border'
              }`}
            >
              카루셀 미리보기
            </button>
            {landingHtml && (
              <button
                onClick={() => setViewMode('landing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'landing'
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-card-bg text-foreground/50 border border-card-border'
                }`}
              >
                랜딩 페이지
              </button>
            )}
          </div>

          <button
            onClick={downloadAll}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-medium hover:opacity-90"
          >
            전체 PNG 다운로드
          </button>
        </div>

        {viewMode === 'carousel' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 큰 미리보기 */}
            <div className="space-y-4">
              <div
                className="aspect-square rounded-2xl border border-card-border overflow-hidden relative"
                style={{ backgroundColor: (slide?.bgColor as string) || '#0F172A' }}
              >
                {carousel.generatedImages?.[currentSlide] && (
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage: `url(${carousel.generatedImages[currentSlide]})`,
                      backgroundSize: 'cover',
                    }}
                  />
                )}
                <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                  <div className="text-sm font-bold mb-3 opacity-60" style={{ color: (slide?.accentColor as string) || '#818CF8' }}>
                    {(slide?.order as number) || currentSlide + 1} / {carousel.slides.length}
                  </div>
                  <h2 className="text-2xl font-bold mb-3" style={{ color: (slide?.textColor as string) || '#F8FAFC' }}>
                    {slide?.title as string}
                  </h2>
                  <p className="text-base opacity-70 mb-4" style={{ color: (slide?.textColor as string) || '#F8FAFC' }}>
                    {slide?.body as string}
                  </p>
                  {(slide?.bullets as string[])?.length > 0 && (
                    <ul className="space-y-2">
                      {(slide.bullets as string[]).map((b, i) => (
                        <li key={i} className="text-sm opacity-60 flex items-start gap-2" style={{ color: (slide?.textColor as string) || '#F8FAFC' }}>
                          <span className="shrink-0" style={{ color: (slide?.accentColor as string) || '#818CF8' }}>&#8226;</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm disabled:opacity-30 hover:border-accent/30 transition-all"
                >
                  &#8592; 이전
                </button>
                <span className="text-sm text-foreground/40">
                  {currentSlide + 1} / {carousel.slides.length}
                </span>
                <button
                  onClick={() => setCurrentSlide(Math.min(carousel.slides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === carousel.slides.length - 1}
                  className="px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm disabled:opacity-30 hover:border-accent/30 transition-all"
                >
                  다음 &#8594;
                </button>
              </div>
            </div>

            {/* 썸네일 + 다운로드 */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground/50">전체 슬라이드</h3>
              <div className="grid grid-cols-3 gap-3">
                {carousel.slides.map((s: DynamicSlide, i: number) => (
                  <button
                    key={(s.id as string) || i}
                    onClick={() => setCurrentSlide(i)}
                    className={`aspect-square rounded-lg border overflow-hidden relative transition-all ${
                      currentSlide === i
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-card-border hover:border-accent/30'
                    }`}
                    style={{ backgroundColor: (s.bgColor as string) || '#0F172A' }}
                  >
                    <div className="p-2 h-full flex flex-col justify-center">
                      <div className="text-[8px] font-bold mb-0.5" style={{ color: (s.accentColor as string) || '#818CF8' }}>
                        {(s.order as number) || i + 1}
                      </div>
                      <div className="text-[10px] font-bold line-clamp-2" style={{ color: (s.textColor as string) || '#F8FAFC' }}>
                        {s.title as string}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => downloadSlide(currentSlide)}
                className="w-full py-2.5 rounded-lg bg-card-bg border border-card-border text-sm text-foreground/60 hover:text-accent hover:border-accent/30 transition-all"
              >
                현재 슬라이드 PNG 다운로드
              </button>

              {/* 사용 가이드 */}
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/50 space-y-2">
                <p className="font-bold text-accent text-sm">사용 가이드</p>
                <p>1. 슬라이드를 PNG로 다운로드합니다</p>
                <p>2. Instagram/Facebook에 카루셀로 업로드합니다</p>
                <p>3. 마지막 슬라이드의 CTA로 랜딩 페이지를 연결합니다</p>
                <p>4. 랜딩 페이지 HTML을 서버에 배포합니다</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-card-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-card-bg border-b border-card-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 px-3 py-1 rounded-md bg-background text-xs text-foreground/30 text-center">
                  your-product.com
                </div>
              </div>
              <iframe
                srcDoc={landingHtml}
                className="w-full h-[700px] bg-white"
                title="Landing Page"
                sandbox="allow-scripts"
              />
            </div>
            <button
              onClick={() => {
                const blob = new Blob([landingHtml], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'landing-page.html';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              랜딩 페이지 HTML 다운로드
            </button>
          </div>
        )}
      </main>
    </>
  );
}

// ===== Canvas 텍스트 줄바꿈 =====
function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = '';

  for (const char of text) {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = char;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
