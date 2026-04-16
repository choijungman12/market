import type { TrendingTopic } from '@/types';
import { isGenSparkAvailable, searchTrends } from './genspark';

// ===== 인메모리 캐시 (10분 TTL) =====
let cache: { data: TrendingTopic[]; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000;

// ===== 트렌딩 토픽 통합 조회 =====
export async function fetchTrendingTopics(): Promise<TrendingTopic[]> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const sources = await Promise.allSettled([
    fetchGoogleTrendsRSS(),
    fetchRedditTrends(),
    isGenSparkAvailable() ? fetchGenSparkTrends() : Promise.resolve([]),
  ]);

  const allTopics: TrendingTopic[] = [];
  for (const result of sources) {
    if (result.status === 'fulfilled') {
      allTopics.push(...result.value);
    }
  }

  const deduplicated = deduplicateTopics(allTopics);
  cache = { data: deduplicated, timestamp: Date.now() };
  return deduplicated;
}

// ===== Google Trends RSS =====
async function fetchGoogleTrendsRSS(): Promise<TrendingTopic[]> {
  try {
    const res = await fetch(
      'https://trends.google.com/trending/rss?geo=US',
      {
        headers: { 'User-Agent': 'HookFlowAI/1.0' },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!res.ok) {
      console.warn(`[Trends] Google RSS ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const topics: TrendingTopic[] = [];
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];

    for (const item of items.slice(0, 15)) {
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        || item.match(/<title>(.*?)<\/title>/)?.[1]
        || '';
      const traffic =
        item.match(/<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/)?.[1] || '';
      const description =
        item.match(/<description>(.*?)<\/description>/)?.[1] || '';
      const newsItems = item.match(/<ht:news_item_title>(.*?)<\/ht:news_item_title>/g) || [];
      const relatedQueries = newsItems
        .map((n) => n.replace(/<\/?ht:news_item_title>/g, ''))
        .slice(0, 3);

      if (title && title.trim()) {
        const cleanTitle = decodeEntities(title.trim());
        topics.push({
          id: `google_${simpleHash(cleanTitle)}`,
          title: cleanTitle,
          source: 'google',
          description: decodeEntities(description).slice(0, 300) || cleanTitle,
          traffic: traffic || '10K+',
          relatedQueries: relatedQueries.map(decodeEntities),
          category: 'trending',
          fetchedAt: new Date().toISOString(),
        });
      }
    }

    return topics;
  } catch (error) {
    console.error('[Trends] Google RSS error:', error);
    return [];
  }
}

// ===== Reddit 트렌딩 =====
async function fetchRedditTrends(): Promise<TrendingTopic[]> {
  const subreddits = ['popular', 'technology', 'business', 'marketing'];
  const results: TrendingTopic[] = [];

  for (const sub of subreddits) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=8`,
        {
          headers: { 'User-Agent': 'HookFlowAI/1.0 (Marketing Bot)' },
          signal: AbortSignal.timeout(8000),
        }
      );

      if (!res.ok) continue;
      const data = await res.json();

      for (const post of data?.data?.children || []) {
        const d = post.data;
        if (d.stickied || d.score < 500 || d.over_18) continue;

        results.push({
          id: `reddit_${d.id}`,
          title: d.title,
          source: 'reddit',
          description:
            d.selftext?.slice(0, 300) || d.title,
          traffic: formatNumber(d.score) + ' upvotes',
          relatedQueries: [
            d.subreddit,
            ...(d.link_flair_text ? [d.link_flair_text] : []),
          ],
          category: d.subreddit,
          url: `https://reddit.com${d.permalink}`,
          fetchedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.warn(`[Trends] Reddit r/${sub} error:`, error);
    }
  }

  return results.slice(0, 20);
}

// ===== GenSpark 웹 검색 기반 트렌드 =====
async function fetchGenSparkTrends(): Promise<TrendingTopic[]> {
  try {
    const result = await searchTrends(
      `Search for the top 10 most viral and high-CTR trending topics globally right now (today).
For each topic return: title, description (1-2 sentences), estimated search volume.
Focus on topics that would work well for social media marketing content.
Return as JSON array: [{"title":"...","description":"...","traffic":"..."}]`
    );

    const parsed = JSON.parse(
      result.match(/\[[\s\S]*\]/)?.[0] || '[]'
    ) as { title: string; description: string; traffic: string }[];

    return parsed.map((item, i) => ({
      id: `genspark_${i}`,
      title: item.title,
      source: 'google' as const,
      description: item.description,
      traffic: item.traffic || '10K+',
      relatedQueries: [],
      category: 'genspark-search',
      fetchedAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.warn('[Trends] GenSpark search error:', error);
    return [];
  }
}

// ===== 유틸리티 =====
function decodeEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, '');
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 8);
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M+';
  if (n >= 1000) return Math.round(n / 1000) + 'K+';
  return n.toString();
}

function deduplicateTopics(topics: TrendingTopic[]): TrendingTopic[] {
  const seen = new Set<string>();
  return topics.filter((t) => {
    const key = t.title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, '')
      .slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
