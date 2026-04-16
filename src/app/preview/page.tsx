'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import type { CarouselSet } from '@/types';

export default function PreviewPage() {
  const router = useRouter();
  const [carousel, setCarousel] = useState<CarouselSet | null>(null);
  const [landingHtml, setLandingHtml] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'landing'>('carousel');

  useEffect(() => {
    const carouselData = sessionStorage.getItem('carouselData');
    const landing = sessionStorage.getItem('landingHtml');
    if (carouselData) setCarousel(JSON.parse(carouselData));
    if (landing) setLandingHtml(landing);
  }, []);

  function downloadSlide(index: number) {
    const slide = carousel?.slides[index];
    if (!slide) return;

    // SVG 기반 이미지 생성
    const bgImage = carousel?.generatedImages?.[index];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${slide.bgColor};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1E293B;stop-opacity:1"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#bg)"/>
      <text x="80" y="200" font-family="Arial,sans-serif" font-size="24" fill="${slide.accentColor}" font-weight="bold">${slide.order}/${carousel?.slides.length}</text>
      <text x="80" y="480" font-family="Arial,sans-serif" font-size="56" fill="${slide.textColor}" font-weight="bold">
        ${wrapText(slide.title, 18).map((line: string, i: number) => `<tspan x="80" dy="${i === 0 ? 0 : 70}">${escapeXml(line)}</tspan>`).join('')}
      </text>
      <text x="80" y="650" font-family="Arial,sans-serif" font-size="28" fill="${slide.textColor}" opacity="0.7">
        ${wrapText(slide.body, 32).map((line: string, i: number) => `<tspan x="80" dy="${i === 0 ? 0 : 40}">${escapeXml(line)}</tspan>`).join('')}
      </text>
    </svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = bgImage || url;
    a.download = `hookflow-slide-${index + 1}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadAll() {
    if (!carousel) return;

    // 개별 SVG 다운로드
    for (let i = 0; i < carousel.slides.length; i++) {
      downloadSlide(i);
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  if (!carousel) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-foreground/40 mb-4">
              미리볼 콘텐츠가 없습니다.
            </p>
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

  const slide = carousel.slides[currentSlide];

  return (
    <>
      <Navbar />
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

          <div className="flex gap-2">
            <button
              onClick={downloadAll}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-medium hover:opacity-90"
            >
              전체 다운로드
            </button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 큰 미리보기 */}
            <div className="space-y-4">
              <div
                className="aspect-square rounded-2xl border border-card-border overflow-hidden relative"
                style={{ backgroundColor: slide?.bgColor || '#0F172A' }}
              >
                {carousel.generatedImages?.[currentSlide] && (
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `url(${carousel.generatedImages[currentSlide]})`,
                      backgroundSize: 'cover',
                    }}
                  />
                )}
                <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                  <div
                    className="text-sm font-bold mb-2 opacity-60"
                    style={{ color: slide?.accentColor || '#818CF8' }}
                  >
                    {slide?.order}/{carousel.slides.length}
                  </div>
                  <h2
                    className="text-2xl font-bold mb-3"
                    style={{ color: slide?.textColor || '#F8FAFC' }}
                  >
                    {slide?.title}
                  </h2>
                  <p
                    className="text-base opacity-70"
                    style={{ color: slide?.textColor || '#F8FAFC' }}
                  >
                    {slide?.body}
                  </p>
                  {slide?.bullets && (
                    <ul className="mt-4 space-y-2">
                      {slide.bullets.map((b: string, i: number) => (
                        <li
                          key={i}
                          className="text-sm opacity-60"
                          style={{ color: slide?.textColor || '#F8FAFC' }}
                        >
                          &#8226; {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* 네비게이션 */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentSlide(Math.max(0, currentSlide - 1))
                  }
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm disabled:opacity-30"
                >
                  &larr; 이전
                </button>
                <span className="text-sm text-foreground/40">
                  {currentSlide + 1} / {carousel.slides.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentSlide(
                      Math.min(carousel.slides.length - 1, currentSlide + 1)
                    )
                  }
                  disabled={currentSlide === carousel.slides.length - 1}
                  className="px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm disabled:opacity-30"
                >
                  다음 &rarr;
                </button>
              </div>
            </div>

            {/* 썸네일 그리드 */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground/50">
                전체 슬라이드
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {carousel.slides.map(
                  (
                    s: {
                      id: string;
                      order: number;
                      title: string;
                      bgColor: string;
                      textColor: string;
                      accentColor: string;
                    },
                    i: number
                  ) => (
                    <button
                      key={s.id || i}
                      onClick={() => setCurrentSlide(i)}
                      className={`aspect-square rounded-lg border overflow-hidden relative transition-all ${
                        currentSlide === i
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-card-border hover:border-accent/30'
                      }`}
                      style={{ backgroundColor: s.bgColor || '#0F172A' }}
                    >
                      <div className="p-2 h-full flex flex-col justify-center">
                        <div
                          className="text-[8px] font-bold mb-0.5"
                          style={{ color: s.accentColor }}
                        >
                          {s.order}
                        </div>
                        <div
                          className="text-[10px] font-bold line-clamp-2"
                          style={{ color: s.textColor }}
                        >
                          {s.title}
                        </div>
                      </div>
                    </button>
                  )
                )}
              </div>

              {/* 다운로드 버튼 */}
              <button
                onClick={() => downloadSlide(currentSlide)}
                className="w-full py-2.5 rounded-lg bg-card-bg border border-card-border text-sm text-foreground/60 hover:text-accent hover:border-accent/30 transition-all"
              >
                현재 슬라이드 다운로드
              </button>
            </div>
          </div>
        ) : (
          /* 랜딩 페이지 뷰 */
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
        )}
      </main>
    </>
  );
}

// ===== 유틸리티 =====
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split('');
  const lines: string[] = [];
  let current = '';
  for (const char of words) {
    if (current.length >= maxChars) {
      lines.push(current);
      current = '';
    }
    current += char;
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
