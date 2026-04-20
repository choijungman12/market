'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TrendCard from '@/components/TrendCard';
import { fetchTrends, getActiveProvider, CATEGORIES, type TrendItem, type CategoryKey } from '@/lib/client-api';

export default function Dashboard() {
  const router = useRouter();
  const [topics, setTopics] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [customTopic, setCustomTopic] = useState('');

  useEffect(() => { loadTrends(); }, []);

  async function loadTrends(force = false) {
    setLoading(true);
    try { setTopics(await fetchTrends(force)); }
    catch { console.error('트렌드 로딩 실패'); }
    finally { setLoading(false); }
  }

  function handleSelectTopic(topic: TrendItem) {
    sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
    router.push('/generate');
  }

  function handleCustomTopic() {
    if (!customTopic.trim()) return;
    handleSelectTopic({
      id: `custom_${Date.now()}`, title: customTopic.trim(), source: '직접입력',
      description: customTopic.trim(), traffic: '-', views: '-',
      relatedQueries: [], category: 'custom', fetchedAt: new Date().toISOString(),
    });
  }

  const filtered = activeCategory === 'all' ? topics : topics.filter(t => t.category === activeCategory);
  const provider = typeof window !== 'undefined' ? getActiveProvider() : 'none';
  const lastUpdated = topics[0]?.fetchedAt ? new Date(topics[0].fetchedAt).toLocaleDateString('ko-KR') : '';

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1"><span className="gradient-text">오늘의 바이럴 트렌드</span></h1>
          <p className="text-foreground/40 text-sm">
            네이버/구글/유튜브 웹 검색 기반 실시간 트렌드
            {lastUpdated && <span className="ml-2 text-foreground/20">| 마지막 업데이트: {lastUpdated}</span>}
          </p>
        </div>

        {/* API 안내 */}
        {provider === 'none' && (
          <div className="mb-4 p-3 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-between text-sm">
            <span><span className="font-bold text-warning">API 키 필요</span><span className="text-foreground/50 ml-2">실시간 트렌드 생성에는 Claude API 키가 필요합니다</span></span>
            <button onClick={() => router.push('/settings')} className="px-3 py-1 rounded-lg bg-warning/20 text-warning text-xs font-medium shrink-0 ml-3">설정</button>
          </div>
        )}

        {/* 직접 입력 */}
        <div className="mb-6 flex gap-3">
          <input type="text" placeholder="직접 토픽 입력 (예: AI 자동화 부업, 다이어트 식단...)" value={customTopic}
            onChange={e => setCustomTopic(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCustomTopic()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-card-bg border border-card-border text-sm focus:outline-none focus:border-accent" />
          <button onClick={handleCustomTopic} disabled={!customTopic.trim()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 shrink-0">
            생성 &rarr;
          </button>
        </div>

        {/* 카테고리 탭 */}
        <div className="mb-6 flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => {
            const count = cat.key === 'all' ? topics.length : topics.filter(t => t.category === cat.key).length;
            return (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.key
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-card-bg text-foreground/50 border border-card-border hover:border-accent/20'
                }`}>
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {count > 0 && <span className="text-[10px] opacity-50">{count}</span>}
              </button>
            );
          })}
        </div>

        {/* 통계 바 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xs text-foreground/40">
            {filtered.length}개 트렌드 {activeCategory !== 'all' && `(${CATEGORIES.find(c => c.key === activeCategory)?.label})`}
          </div>
          <button onClick={() => loadTrends(true)} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card-bg border border-card-border text-xs text-foreground/50 hover:text-accent hover:border-accent/30 disabled:opacity-40">
            <span className={loading ? 'animate-spin' : ''}>&#8635;</span>
            {loading ? '웹 검색 중... (30초~1분)' : '실시간 새로고침'}
          </button>
        </div>

        {/* 트렌드 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-44 rounded-xl bg-card-bg border border-card-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-foreground/30">
            <div className="text-3xl mb-3">&#128269;</div>
            <p>이 카테고리에 트렌드가 없습니다.</p>
            <p className="text-xs mt-1">다른 카테고리를 선택하거나 직접 입력해보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((topic, i) => (
              <TrendCard key={topic.id} topic={topic as never} onSelect={handleSelectTopic as never} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
