'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TrendCard from '@/components/TrendCard';
import { fetchTrends, getActiveProvider, type TrendItem } from '@/lib/client-api';

export default function Dashboard() {
  const router = useRouter();
  const [topics, setTopics] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [customTopic, setCustomTopic] = useState('');

  useEffect(() => { loadTrends(); }, []);

  async function loadTrends() {
    setLoading(true);
    try {
      const data = await fetchTrends();
      setTopics(data);
    } catch (e) {
      console.error('[HookFlow] Trends error:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectTopic(topic: TrendItem) {
    sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
    router.push('/generate');
  }

  function handleCustomTopic() {
    if (!customTopic.trim()) return;
    const topic: TrendItem = {
      id: `custom_${Date.now()}`,
      title: customTopic.trim(),
      source: 'google',
      description: customTopic.trim(),
      traffic: 'Custom',
      relatedQueries: [],
      category: 'custom',
      fetchedAt: new Date().toISOString(),
    };
    sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
    router.push('/generate');
  }

  const provider = typeof window !== 'undefined' ? getActiveProvider() : 'none';

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">실시간 글로벌 트렌드</span>
          </h1>
          <p className="text-foreground/50">
            트렌드를 클릭하거나 직접 토픽을 입력하면, AI가 후킹 콘텐츠를 자동 생성합니다.
          </p>
        </div>

        {/* API 미설정 안내 */}
        {provider === 'none' && (
          <div className="mb-6 p-4 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-bold text-warning">API 키가 필요합니다</span>
              <span className="text-foreground/50 ml-2">설정에서 Anthropic API 키를 입력하세요.</span>
            </div>
            <button onClick={() => router.push('/settings')}
              className="px-4 py-1.5 rounded-lg bg-warning/20 text-warning text-xs font-medium hover:bg-warning/30 shrink-0 ml-4">
              설정하기
            </button>
          </div>
        )}

        {/* 직접 토픽 입력 */}
        <div className="mb-8 p-6 rounded-xl bg-card-bg border border-accent/30">
          <h2 className="text-sm font-bold text-accent mb-3">직접 토픽 입력</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="예: AI 자동화로 월 1000만원 벌기, 틱톡 마케팅 전략..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomTopic()}
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-card-border text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button
              onClick={handleCustomTopic}
              disabled={!customTopic.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 shrink-0"
            >
              콘텐츠 생성 &rarr;
            </button>
          </div>
        </div>

        {/* 통계 + 새로고침 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-foreground/50">
            {topics.length > 0 ? `${topics.length}개 트렌드 발견` : '트렌드 로딩 중...'}
          </div>
          <button onClick={loadTrends} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm text-foreground/60 hover:text-accent hover:border-accent/30 transition-all disabled:opacity-50">
            <span className={loading ? 'animate-spin' : ''}>&#8635;</span>
            새로고침
          </button>
        </div>

        {/* 트렌드 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-card-bg border border-card-border animate-pulse" />
            ))}
          </div>
        ) : topics.length === 0 ? (
          <div className="text-center py-12 text-foreground/30">
            <div className="text-4xl mb-4">&#128161;</div>
            <p className="mb-2">위 입력창에 원하는 토픽을 직접 입력하세요!</p>
            <p className="text-xs">예: &quot;AI 부업&quot;, &quot;SNS 마케팅&quot;, &quot;1인 창업&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((topic, i) => (
              <TrendCard key={topic.id} topic={topic as never} onSelect={handleSelectTopic as never} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
