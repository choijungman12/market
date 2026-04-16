'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getHistory, deleteHistory } from '@/lib/client-api';

type HistoryItem = {
  id: string; createdAt: string; topic: string; headline: string;
  platform: string; slideCount: number; imageCount?: number;
  scripts: { title: string; body: string }[];
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => { setHistory(getHistory()); }, []);

  function handleDelete(id: string) {
    if (!confirm('삭제하시겠습니까?')) return;
    deleteHistory(id);
    setHistory(getHistory());
    if (selected?.id === id) setSelected(null);
  }

  function clearAll() {
    if (!confirm('모든 기록을 삭제하시겠습니까?')) return;
    localStorage.removeItem('hookflow_history');
    setHistory([]);
    setSelected(null);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold"><span className="gradient-text">작업 히스토리</span></h1>
            <p className="text-foreground/40 text-sm mt-1">생성한 콘텐츠 기록</p>
          </div>
          {history.length > 0 && (
            <button onClick={clearAll} className="text-xs text-danger/50 hover:text-danger px-3 py-1.5 rounded-lg border border-danger/20">전체 삭제</button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 text-foreground/30">
            <div className="text-4xl mb-4">&#128203;</div>
            <p>아직 작업 기록이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-sm text-foreground/50">{history.length}개 작업</div>
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
                      {item.imageCount && <span className="text-[10px] text-purple-400">{item.imageCount}이미지</span>}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm">{item.headline}</h3>
                  <p className="text-xs text-foreground/40 mt-0.5">{item.topic}</p>
                </button>
              ))}
            </div>

            {selected ? (
              <div className="space-y-4 sticky top-20">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">{selected.headline}</h2>
                  <button onClick={() => handleDelete(selected.id)} className="text-xs text-danger/50 hover:text-danger">삭제</button>
                </div>

                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">{selected.platform}</span>
                  <span className="px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50">{selected.slideCount}장</span>
                  <span className="px-2 py-1 rounded-full bg-card-bg border border-card-border text-foreground/50">{selected.topic}</span>
                </div>

                <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-3">
                  <h3 className="text-sm font-bold text-foreground/70">대본 ({selected.scripts.length}컷)</h3>
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
        )}
      </main>
    </>
  );
}
