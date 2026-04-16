'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { generateSlideImages, hasGeminiKey, saveToHistory } from '@/lib/client-api';

export default function CustomPage() {
  const router = useRouter();
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook'>('instagram');
  const [scripts, setScripts] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
    { title: '', body: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  function updateScript(i: number, field: 'title' | 'body', value: string) {
    setScripts(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }
  function addScript() { setScripts(prev => [...prev, { title: '', body: '' }]); }
  function removeScript(i: number) { if (scripts.length > 2) setScripts(prev => prev.filter((_, idx) => idx !== i)); }

  async function generate() {
    const validScripts = scripts.filter(s => s.title.trim() || s.body.trim());
    if (validScripts.length < 2) { alert('최소 2장 이상의 대본을 작성해주세요.'); return; }
    if (!hasGeminiKey()) { alert('설정에서 Gemini(NanoBanana) 키를 입력해주세요.'); return; }

    setLoading(true);
    try {
      const slides = validScripts.map((s, i) => ({
        id: `s_${i}`, order: i + 1,
        type: i === 0 ? 'cover' : i === validScripts.length - 1 ? 'cta' : 'content',
        title: s.title, body: s.body,
        bgColor: '#0F172A', textColor: '#F8FAFC', accentColor: '#818CF8',
      }));

      const imgs = await generateSlideImages(slides as Record<string, unknown>[], platform);
      setImages(imgs);
      setDone(true);

      saveToHistory({
        topic: '커스텀 대본',
        headline: validScripts[0].title || '커스텀',
        platform,
        slideCount: validScripts.length,
        images: imgs,
        scripts: validScripts,
      });
    } catch (e) {
      alert(e instanceof Error ? e.message : '생성 실패');
    } finally { setLoading(false); }
  }

  function downloadImage(i: number) {
    if (!images[i]) return;
    const a = document.createElement('a');
    a.href = images[i];
    a.download = `custom-${platform}-${i+1}.png`;
    a.click();
  }

  async function downloadAll() {
    for (let i = 0; i < images.length; i++) { if (images[i]) { downloadImage(i); await new Promise(r => setTimeout(r, 500)); } }
  }

  const platformLabel = { instagram: 'Instagram (1:1)', tiktok: 'TikTok (9:16)', facebook: 'Facebook (16:9)' }[platform];

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-1"><span className="gradient-text">커스텀 대본</span></h1>
        <p className="text-foreground/40 text-sm mb-6">원하는 주제와 내용을 직접 작성하여 SNS 이미지를 만드세요.</p>

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center p-8 rounded-2xl bg-card-bg border border-card-border">
              <div className="w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
              <p className="text-foreground/70 text-sm">NanoBanana로 이미지 생성 중...</p>
            </div>
          </div>
        )}

        {!done ? (
          <div className="space-y-5">
            {/* 플랫폼 선택 */}
            <div className="flex gap-2">
              {[
                { key: 'instagram' as const, label: '📸 Instagram' },
                { key: 'tiktok' as const, label: '🎵 TikTok' },
                { key: 'facebook' as const, label: '📘 Facebook' },
              ].map(p => (
                <button key={p.key} onClick={() => setPlatform(p.key)}
                  className={`px-4 py-2 rounded-lg text-sm border ${platform === p.key ? 'border-accent bg-accent/10 text-accent' : 'border-card-border text-foreground/50'}`}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* 대본 입력 */}
            <div className="space-y-3">
              {scripts.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-card-bg border border-card-border group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${i === 0 ? 'text-accent' : 'text-foreground/40'}`}>
                      {i === 0 ? '1장 (메인 어그로)' : `${i+1}장`}
                    </span>
                    {scripts.length > 2 && (
                      <button onClick={() => removeScript(i)} className="text-xs text-danger/50 hover:text-danger opacity-0 group-hover:opacity-100">삭제</button>
                    )}
                  </div>
                  <input type="text" value={s.title} onChange={e => updateScript(i, 'title', e.target.value)}
                    placeholder={i === 0 ? '시선을 사로잡는 메인 제목' : `${i+1}장 제목`}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm font-bold mb-2 focus:outline-none focus:border-accent" />
                  <textarea value={s.body} onChange={e => updateScript(i, 'body', e.target.value)}
                    placeholder="이미지에 들어갈 내용을 작성하세요"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-card-border text-sm resize-none focus:outline-none focus:border-accent" rows={2} />
                </div>
              ))}
            </div>

            <button onClick={addScript} className="w-full py-2 rounded-lg border border-dashed border-card-border text-sm text-foreground/40 hover:text-accent hover:border-accent/30">
              + 장면 추가
            </button>

            <button onClick={generate} disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50">
              {platformLabel} 이미지 {scripts.filter(s => s.title || s.body).length}장 생성
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`grid gap-4 ${platform === 'tiktok' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              {images.map((img, i) => (
                <div key={i} className="group relative">
                  <div className={`rounded-xl border border-card-border overflow-hidden bg-card-bg ${platform === 'tiktok' ? 'aspect-[9/16]' : platform === 'facebook' ? 'aspect-[16/9]' : 'aspect-square'}`}>
                    {img ? <img src={img} alt={`${i+1}`} className="w-full h-full object-cover" /> :
                      <div className="flex items-center justify-center h-full text-foreground/30 text-sm">생성 실패</div>}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold">{i === 0 ? '메인' : i+1}</div>
                  {img && <button onClick={() => downloadImage(i)} className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100">다운로드</button>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button onClick={downloadAll} className="py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm">전체 다운로드</button>
              <button onClick={() => { setDone(false); setImages([]); }} className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm">대본 수정</button>
              <button onClick={() => router.push('/history')} className="py-3 rounded-xl bg-card-bg border border-card-border text-foreground/70 text-sm">히스토리</button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
