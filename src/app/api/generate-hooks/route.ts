import { NextRequest, NextResponse } from 'next/server';
import { generateHookContent, getActiveProvider } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const provider = getActiveProvider();
    if (provider === 'none') {
      return NextResponse.json(
        {
          error: 'AI API 키가 설정되지 않았습니다.',
          detail:
            '.env.local에 ANTHROPIC_API_KEY 또는 GENSPARK_API_KEY를 설정하세요.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { topic, tone = 'informative', count = 3 } = body;

    if (!topic?.title) {
      return NextResponse.json(
        { error: '토픽 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    const hooks = await generateHookContent(
      {
        title: topic.title,
        description: topic.description || topic.title,
        relatedQueries: topic.relatedQueries || [],
      },
      tone,
      count
    );

    const enrichedHooks = hooks.map((hook, i) => ({
      ...hook,
      id: (hook.id as string) || `hook_${i + 1}`,
      topicId: topic.id,
      tone,
    }));

    return NextResponse.json({ hooks: enrichedHooks, provider });
  } catch (error) {
    console.error('[API] Generate hooks error:', error);
    return NextResponse.json(
      {
        error: '후킹 콘텐츠 생성에 실패했습니다.',
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
