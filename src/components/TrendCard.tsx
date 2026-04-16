'use client';

import type { TrendingTopic } from '@/types';

const sourceColors = {
  google: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Google' },
  reddit: { bg: 'bg-orange-500/15', text: 'text-orange-400', label: 'Reddit' },
  twitter: { bg: 'bg-sky-500/15', text: 'text-sky-400', label: 'X/Twitter' },
};

interface TrendCardProps {
  topic: TrendingTopic;
  onSelect: (topic: TrendingTopic) => void;
  index: number;
}

export default function TrendCard({ topic, onSelect, index }: TrendCardProps) {
  const source = sourceColors[topic.source];

  return (
    <button
      onClick={() => onSelect(topic)}
      className="card-glow w-full text-left p-5 rounded-xl bg-card-bg border border-card-border hover:border-accent/50 transition-all animate-slide-up group"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
    >
      {/* 상단: 소스 + 트래픽 */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${source.bg} ${source.text}`}
        >
          {source.label}
        </span>
        <span className="text-xs text-foreground/40 font-mono">
          {topic.traffic}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {topic.title}
      </h3>

      {/* 설명 */}
      <p className="text-sm text-foreground/50 line-clamp-2 mb-3">
        {topic.description}
      </p>

      {/* 관련 키워드 */}
      {topic.relatedQueries.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {topic.relatedQueries.slice(0, 3).map((q, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-background text-xs text-foreground/40"
            >
              #{q}
            </span>
          ))}
        </div>
      )}

      {/* 호버 시 화살표 */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        <span>콘텐츠 생성하기</span>
        <span>→</span>
      </div>
    </button>
  );
}
