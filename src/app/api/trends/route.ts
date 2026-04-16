import { NextResponse } from 'next/server';
import { fetchTrendingTopics } from '@/lib/trends';

export async function GET() {
  try {
    const topics = await fetchTrendingTopics();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Trends API error:', error);
    return NextResponse.json(
      { error: '트렌드 데이터를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
