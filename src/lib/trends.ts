import type { TrendingTopic } from '@/types';

// ===== 인메모리 캐시 (10분 TTL) =====
let cache: { data: TrendingTopic[]; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000;

// ===== 트렌딩 토픽 통합 조회 =====
export async function fetchTrendingTopics(): Promise<TrendingTopic[]> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const [redditTopics, googleTopics] = await Promise.all([
    fetchRedditTrends(),
    fetchGoogleTrends(),
  ]);

  const merged = [...googleTopics, ...redditTopics];
  const deduplicated = deduplicateTopics(merged);

  cache = { data: deduplicated, timestamp: Date.now() };
  return deduplicated;
}

// ===== Reddit 트렌딩 =====
async function fetchRedditTrends(): Promise<TrendingTopic[]> {
  try {
    const subreddits = ['popular', 'technology', 'business', 'marketing'];
    const results: TrendingTopic[] = [];

    for (const sub of subreddits) {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=10`,
        {
          headers: {
            'User-Agent': 'HookFlowAI/1.0 (Marketing Research Bot)',
          },
        }
      );

      if (!res.ok) continue;
      const data = await res.json();

      const posts = data?.data?.children || [];
      for (const post of posts) {
        const d = post.data;
        if (d.stickied || d.score < 500) continue;

        results.push({
          id: `reddit_${d.id}`,
          title: d.title,
          source: 'reddit',
          description: d.selftext?.slice(0, 200) || d.title,
          traffic: `${Math.round(d.score / 1000)}K+ upvotes`,
          relatedQueries: [d.subreddit, ...(d.link_flair_text ? [d.link_flair_text] : [])],
          category: d.subreddit,
          url: `https://reddit.com${d.permalink}`,
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    return results.slice(0, 15);
  } catch (error) {
    console.error('Reddit fetch error:', error);
    return [];
  }
}

// ===== Google Trends (기본 데이터) =====
async function fetchGoogleTrends(): Promise<TrendingTopic[]> {
  try {
    // Google Trends RSS 피드 활용
    const res = await fetch(
      'https://trends.google.com/trending/rss?geo=US',
      { headers: { 'User-Agent': 'HookFlowAI/1.0' } }
    );

    if (!res.ok) {
      return getDefaultTrends();
    }

    const xml = await res.text();
    const topics: TrendingTopic[] = [];

    // 간단한 XML 파싱
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    for (const item of items.slice(0, 10)) {
      const title = item.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const traffic =
        item.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/)?.[1] || '';
      const description =
        item.match(/<description>(.*?)<\/description>/)?.[1] || '';

      if (title) {
        topics.push({
          id: `google_${Buffer.from(title).toString('base64').slice(0, 12)}`,
          title: decodeHtmlEntities(title),
          source: 'google',
          description: decodeHtmlEntities(description).slice(0, 200),
          traffic: traffic || '10K+',
          relatedQueries: [],
          category: 'trending',
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    return topics.length > 0 ? topics : getDefaultTrends();
  } catch (error) {
    console.error('Google Trends error:', error);
    return getDefaultTrends();
  }
}

// ===== 기본 트렌드 (API 실패 시) =====
function getDefaultTrends(): TrendingTopic[] {
  const trends = [
    { title: 'AI Agent Revolution 2026', traffic: '500K+', desc: 'Autonomous AI agents are transforming how businesses operate, from customer service to content creation.' },
    { title: 'No-Code AI Apps', traffic: '200K+', desc: 'Building AI-powered applications without writing code is becoming the fastest growing trend.' },
    { title: 'Short-Form Video Marketing', traffic: '1M+', desc: 'TikTok and Reels dominate digital marketing with 60% higher engagement rates.' },
    { title: 'Passive Income with AI', traffic: '300K+', desc: 'How creators are using AI tools to build automated income streams.' },
    { title: 'Personal Branding 2026', traffic: '150K+', desc: 'Building a strong personal brand is now essential for career growth.' },
    { title: 'Micro-SaaS Business', traffic: '100K+', desc: 'Small, focused SaaS products built by solo founders are generating $10K+ MRR.' },
  ];

  return trends.map((t, i) => ({
    id: `default_${i}`,
    title: t.title,
    source: 'google' as const,
    description: t.desc,
    traffic: t.traffic,
    relatedQueries: [],
    category: 'trending',
    fetchedAt: new Date().toISOString(),
  }));
}

// ===== 유틸리티 =====
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function deduplicateTopics(topics: TrendingTopic[]): TrendingTopic[] {
  const seen = new Set<string>();
  return topics.filter((topic) => {
    const key = topic.title.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
