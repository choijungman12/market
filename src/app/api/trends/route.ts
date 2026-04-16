import { NextResponse } from 'next/server';
import { fetchTrendingTopics } from '@/lib/trends';
import { getActiveProvider } from '@/lib/anthropic';

export async function GET() {
  try {
    const topics = await fetchTrendingTopics();
    const provider = getActiveProvider();

    return NextResponse.json({
      topics,
      meta: {
        count: topics.length,
        provider,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[API] Trends error:', error);
    return NextResponse.json(
      {
        topics: [],
        error: '트렌드 데이터를 가져오는데 실패했습니다.',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
