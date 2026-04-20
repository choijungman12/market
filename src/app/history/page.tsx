'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getHistory, deleteHistory, clearAllHistory } from '@/lib/client-api';
import type { HistoryRecord } from '@/lib/history-db';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [selected, setSelected] = useState<HistoryRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const data = await getHistory();
    setHistory(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return;
    await deleteHistory(id);
    load();
    if (selected?.id === id) setSelected(null);
  }

  async function handleClearAll() {
    if (!confirm('모든 기록을 삭제하시겠습니까?')) return;
    await clearAllHistory();
    setHistory([]);
    setSelected(null);
  }

  function downloadImage(img: string, index: number, headline: string) {
    if (!img) return;
    const a = document.createElement('a');
    a.href = img;
    a.download = `${headline.slice(0, 20)}-${index + 1}.png`;
    a.click();
  }

  async function downloadAll(record: HistoryRecord) {
    for (let i = 0; i < record.images.length; i++) {
      if (record.images[i]) {
        downloadImage(record.images[i], i, record.headline);
        await new Promise(r => setTimeout(r, 500));
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold"><span className="gradient-text">작업 히스토리</span></h1>
            <p className="text-foreground/40 text-sm mt-1">생성한 모든 콘텐츠 기록 (이미지 포함)</p>
          </div>
          {history.length > 0 && (
            <button onClick={handleClearAll} className="text-xs text-danger/50 hover:text-danger px-3 py-1.5 rounded-lg border border-danger/20">전체 삭제</button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-foreground/30">
            <div className="w-8 h-8 mx-auto rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mb-4" />
            <p>로딩 중...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 text-foreground/30">
            <div className="text-4xl mb-4">&#128203;</div>
            <p>아직 작업 기록이 없습니다.</p>
            <p className="text-xs mt-1">콘텐츠를 생성하면 이미지와 함께 자동 저장됩니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 목록 */}
            <div className="space-y-3 lg:col-span-1">
              <div className="text-sm text-foreground/50 mb-2">{history.length}개 작업</div>
              {history.map(item => (
                <button key={item.id} onClick={() => setSelected(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === item.id ? 'border-accent bg-accent/5' : 'border-card-border bg-card-bg hover:border-accent/30'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/30">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px]">{item.platform}</span>
                      <span className="text-[10px] text-foreground/30">{item.slideCount}장</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{item.headline}</h3>
                  <p className="text-xs text-foreground/40 mb-2">{item.topic}</p>
                  {/* 썸네일 */}
                  <div className="flex gap-1">
                    {item.images.slice(0, 5).map((img, i) => img ? (
                      <div key={i} className="w-10 h-10 rounded overflow-hidden border border-card-border">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : null)}
                    {item.images.length > 5 && (
                      <div className="w-10 h-10 rounded bg-card-border flex items-center justify-center text-[10px] text-foreground/30">+{item.images.length - 5}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* 상세 */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="space-y-4 sticky top-20">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">{selected.headline}</h2>
                    <div className="flex gap-2">
                      <button onClick={() => downloadAll(selected)}
                        className="text-xs text-accent hover:text-accent/80 px-3 py-1.5 rounded-lg border border-accent/20">
                        전체 다운로드
                      </button>
                      <button onClick={() => handleDelete(selected.id)}
                        className="text-xs text-danger/50 hover:text-danger px-3 py-1.5 rounded-lg border border-danger/20">삭제</button>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">{selected.platform}</span>
                    <span className="px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50">{selected.slideCount}장</span>
                    <span className="px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50 truncate max-w-[200px]">{selected.topic}</span>
                  </div>

                  {/* 이미지 그리드 */}
                  <div className={`grid gap-3 ${selected.platform === 'tiktok' ? 'grid-cols-3' : 'grid-cols-3'}`}>
                    {selected.images.map((img, i) => (
                      <div key={i} className="group relative">
                        <div className={`rounded-lg overflow-hidden border border-card-border bg-card-bg ${
                          selected.platform === 'tiktok' ? 'aspect-[9/16]' :
                          selected.platform === 'facebook' ? 'aspect-[16/9]' : 'aspect-square'
                        }`}>
                          {img ? (
                            <img src={img} alt={`${i+1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-foreground/30 text-xs">이미지 없음</div>
                          )}
                        </div>
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-bold">
                          {i === 0 ? '메인' : i+1}
                        </div>
                        {img && (
                          <button onClick={() => downloadImage(img, i, selected.headline)}
                            className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                            다운로드
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 대본 */}
                  <details className="rounded-xl bg-card-bg border border-card-border">
                    <summary className="p-4 text-sm font-bold text-foreground/70 cursor-pointer">대본 ({selected.scripts.length}컷)</summary>
                    <div className="px-4 pb-4 space-y-2">
                      {selected.scripts.map((s, i) => (
                        <div key={i} className="flex gap-3">
                          <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-accent text-white' : 'bg-card-border text-foreground/50'}`}>{i+1}</span>
                          <div>
                            <div className="text-sm font-medium">{s.title}</div>
                            <div className="text-xs text-foreground/40">{s.body}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>

                  <div className="text-xs text-foreground/20">
                    {new Date(selected.createdAt).toLocaleString('ko-KR')}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center text-foreground/30 text-sm h-40">
                  왼쪽에서 작업을 선택하세요
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
