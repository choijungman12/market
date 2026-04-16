'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TrendCard from '@/components/TrendCard';
import type { TrendingTopic } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'google' | 'reddit'>('all');

  useEffect(() => {
    fetchTrends();
  }, []);

  async function fetchTrends() {
    setLoading(true);
    try {
      const res = await fetch('/api/trends');
      const data = await res.json();
      setTopics(data.topics || []);
    } catch {
      console.error('Failed to fetch trends');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectTopic(topic: TrendingTopic) {
    sessionStorage.setItem('selectedTopic', JSON.stringify(topic));
    router.push('/generate');
  }

  const filteredTopics =
    filter === 'all' ? topics : topics.filter((t) => t.source === filter);

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">실시간 글로벌 트렌드</span>
          </h1>
          <p className="text-foreground/50">
            클릭률이 가장 높은 해외 이슈를 발견하고, AI가 후킹 콘텐츠를
            자동으로 만들어 드립니다.
          </p>
        </div>

        {/* 필터 + 새로고침 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {(['all', 'google', 'reddit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-accent/15 text-accent border border-accent/30'
                    : 'bg-card-bg text-foreground/50 border border-card-border hover:border-card-border/80'
                }`}
              >
                {f === 'all' ? '전체' : f === 'google' ? 'Google' : 'Reddit'}
              </button>
            ))}
          </div>

          <button
            onClick={fetchTrends}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card-bg border border-card-border text-sm text-foreground/60 hover:text-accent hover:border-accent/30 transition-all disabled:opacity-50"
          >
            <span className={loading ? 'animate-spin' : ''}>&#8635;</span>
            새로고침
          </button>
        </div>

        {/* 통계 바 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '발견된 트렌드', value: topics.length, color: 'text-accent' },
            { label: 'Google 트렌드', value: topics.filter((t) => t.source === 'google').length, color: 'text-blue-400' },
            { label: 'Reddit 인기', value: topics.filter((t) => t.source === 'reddit').length, color: 'text-orange-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-card-bg border border-card-border text-center"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-foreground/40 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 트렌드 그리드 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-card-bg border border-card-border animate-pulse"
              />
            ))}
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="text-center py-20 text-foreground/30">
            <div className="text-4xl mb-4">&#128225;</div>
            <p>트렌드 데이터가 없습니다. 새로고침을 시도하세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTopics.map((topic, i) => (
              <TrendCard
                key={topic.id}
                topic={topic}
                onSelect={handleSelectTopic}
                index={i}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
