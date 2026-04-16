import { NextRequest, NextResponse } from 'next/server';
import { generateHookContent } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, tone = 'informative', count = 3 } = body;

    if (!topic?.title) {
      return NextResponse.json(
        { error: '토픽 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    const hooks = await generateHookContent(topic, tone, count);

    // topicId 매핑
    const enrichedHooks = hooks.map(
      (hook: Record<string, unknown>, i: number) => ({
        ...hook,
        id: hook.id || `hook_${i + 1}`,
        topicId: topic.id,
        tone,
      })
    );

    return NextResponse.json({ hooks: enrichedHooks });
  } catch (error) {
    console.error('Generate hooks error:', error);
    return NextResponse.json(
      { error: '후킹 콘텐츠 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}
