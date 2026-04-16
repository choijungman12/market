'use client';

import { CATEGORIES } from '@/lib/client-api';

interface Topic {
  id: string; title: string; source: string; description: string;
  traffic: string; views?: string; relatedQueries: string[]; category: string;
}

interface TrendCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
  index: number;
}

export default function TrendCard({ topic, onSelect, index }: TrendCardProps) {
  const cat = CATEGORIES.find(c => c.key === topic.category);

  return (
    <button
      onClick={() => onSelect(topic)}
      className="card-glow w-full text-left p-5 rounded-xl bg-card-bg border border-card-border hover:border-accent/50 transition-all animate-slide-up group"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* 상단: 카테고리 + 트래픽 */}
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/15 text-accent">
          {cat ? `${cat.emoji} ${cat.label}` : topic.category}
        </span>
        <div className="flex items-center gap-2 text-[10px] text-foreground/30 font-mono">
          {topic.views && <span>{topic.views}</span>}
          <span>{topic.traffic}</span>
        </div>
      </div>

      {/* 제목 */}
      <h3 className="text-sm font-bold mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
        {topic.title}
      </h3>

      {/* 설명 */}
      <p className="text-xs text-foreground/40 line-clamp-2 mb-3">
        {topic.description}
      </p>

      {/* 키워드 */}
      {topic.relatedQueries.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {topic.relatedQueries.slice(0, 3).map((q, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded bg-background text-[10px] text-foreground/30">
              #{q}
            </span>
          ))}
        </div>
      )}

      {/* 호버 */}
      <div className="mt-2 text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        클릭하여 콘텐츠 생성 &rarr;
      </div>
    </button>
  );
}
