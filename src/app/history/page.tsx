'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getHistory, deleteHistory } from '@/lib/client-api';

type HistoryItem = {
  id: string; createdAt: string; topic: string; headline: string;
  platform: string; slideCount: number; images: string[];
  scripts: { title: string; body: string }[];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => { setHistory(getHistory()); }, []);

  function handleDelete(id: string) {
    if (!confirm('이 작업을 삭제하시겠습니까?')) return;
    deleteHistory(id);
    setHistory(getHistory());
    if (selected?.id === id) setSelected(null);
  }

  function downloadImage(img: string, index: number) {
    const a = document.createElement('a');
    a.href = img;
    a.download = `hookflow-${index + 1}.png`;
    a.click();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-1"><span className="gradient-text">작업 히스토리</span></h1>
        <p className="text-foreground/40 text-sm mb-6">지금까지 생성한 모든 콘텐츠를 확인하세요.</p>

        {history.length === 0 ? (
          <div className="text-center py-20 text-foreground/30">
            <div className="text-4xl mb-4">&#128203;</div>
            <p>아직 작업 기록이 없습니다.</p>
            <p className="text-xs mt-1">콘텐츠를 생성하면 자동으로 저장됩니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 목록 */}
            <div className="space-y-3">
              <div className="text-sm text-foreground/50 mb-2">총 {history.length}개 작업</div>
              {history.map(item => (
                <button key={item.id} onClick={() => setSelected(item)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === item.id ? 'border-accent bg-accent/5' : 'border-card-border bg-card-bg hover:border-accent/30'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground/30">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px]">{item.platform}</span>
                      <span className="text-[10px] text-foreground/30">{item.slideCount}장</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm">{item.headline}</h3>
                  <p className="text-xs text-foreground/40 mt-0.5">{item.topic}</p>
                  <div className="flex gap-1 mt-2">
                    {item.images.slice(0, 4).map((img, i) => (
                      img ? <div key={i} className="w-8 h-8 rounded bg-card-border overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div> : null
                    ))}
                    {item.images.length > 4 && <div className="w-8 h-8 rounded bg-card-border flex items-center justify-center text-[10px] text-foreground/30">+{item.images.length - 4}</div>}
                  </div>
                </button>
              ))}
            </div>

            {/* 상세 */}
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{selected.headline}</h2>
                  <button onClick={() => handleDelete(selected.id)} className="text-xs text-danger/50 hover:text-danger">삭제</button>
                </div>

                {/* 이미지 */}
                <div className="grid grid-cols-3 gap-2">
                  {selected.images.map((img, i) => (
                    img ? (
                      <div key={i} className="group relative rounded-lg overflow-hidden border border-card-border aspect-square">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => downloadImage(img, i)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          다운로드
                        </button>
                      </div>
                    ) : null
                  ))}
                </div>

                {/* 대본 */}
                <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-2">
                  <h3 className="text-sm font-bold text-foreground/70">대본</h3>
                  {selected.scripts.map((s, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium">{i+1}. {s.title}</span>
                      <span className="text-foreground/40 ml-2">{s.body}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-foreground/30">
                  {new Date(selected.createdAt).toLocaleString('ko-KR')} | {selected.platform} | {selected.slideCount}장
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-foreground/30 text-sm">
                왼쪽에서 작업을 선택하세요
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
