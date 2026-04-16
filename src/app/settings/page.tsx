'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getApiKey, setApiKey, getActiveProvider } from '@/lib/client-api';

export default function SettingsPage() {
  const [anthropicKey, setAnthropicKey] = useState('');
  const [gensparkKey, setGensparkKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [provider, setProvider] = useState('none');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setAnthropicKey(getApiKey('anthropic'));
    setGensparkKey(getApiKey('genspark'));
    setProvider(getActiveProvider());
  }, []);

  function handleSave() {
    setApiKey('anthropic', anthropicKey.trim());
    setApiKey('genspark', gensparkKey.trim());
    setProvider(getActiveProvider());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function testConnection() {
    setTesting(true);
    setTestResult(null);
    try {
      const active = getActiveProvider();
      if (active === 'none') {
        setTestResult('API 키가 설정되지 않았습니다.');
        return;
      }

      if (active === 'anthropic') {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': getApiKey('anthropic'),
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 50,
            messages: [{ role: 'user', content: '안녕? 한 단어로 대답해.' }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTestResult(`Claude 연결 성공! 응답: "${data.content?.[0]?.text}"`);
        } else {
          setTestResult(`Claude 연결 실패 (${res.status})`);
        }
      } else if (active === 'genspark') {
        const res = await fetch('https://api.genspark.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getApiKey('genspark')}`,
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 50,
            messages: [{ role: 'user', content: '안녕? 한 단어로 대답해.' }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTestResult(`GenSpark 연결 성공! 응답: "${data.choices?.[0]?.message?.content}"`);
        } else {
          setTestResult(`GenSpark 연결 실패 (${res.status})`);
        }
      }
    } catch (e) {
      setTestResult(`연결 오류: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setTesting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="gradient-text">API 설정</span>
        </h1>
        <p className="text-foreground/50 text-sm mb-8">
          API 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
        </p>

        <div className="space-y-6">
          {/* 현재 상태 */}
          <div className="p-4 rounded-xl bg-card-bg border border-card-border">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${provider !== 'none' ? 'bg-success animate-pulse-glow' : 'bg-warning'}`} />
              <div>
                <div className="text-sm font-medium">
                  {provider === 'anthropic' && 'Claude (Anthropic) 활성'}
                  {provider === 'genspark' && 'GenSpark 활성'}
                  {provider === 'none' && 'API 미연결'}
                </div>
                <div className="text-xs text-foreground/40">
                  {provider !== 'none' ? '아래에서 키를 변경할 수 있습니다' : '키를 입력하면 플랫폼이 활성화됩니다'}
                </div>
              </div>
            </div>
          </div>

          {/* Anthropic API Key */}
          <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm">Anthropic Claude API</h2>
              <span className="text-xs text-foreground/30">우선순위 1</span>
            </div>
            <p className="text-xs text-foreground/40">
              console.anthropic.com 에서 발급. sk-ant- 으로 시작합니다.
            </p>
            <input
              type="password"
              placeholder="sk-ant-api03-..."
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* GenSpark API Key */}
          <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm">GenSpark API</h2>
              <span className="text-xs text-foreground/30">우선순위 2 + 이미지</span>
            </div>
            <p className="text-xs text-foreground/40">
              GenSpark 유료 계정의 API 키. 이미지 생성(NanoBanana)도 지원합니다.
            </p>
            <input
              type="password"
              placeholder="gsk-..."
              value={gensparkKey}
              onChange={(e) => setGensparkKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {saved ? '저장 완료!' : '저장하기'}
            </button>
            <button
              onClick={testConnection}
              disabled={testing || provider === 'none'}
              className="px-6 py-3 rounded-xl bg-card-bg border border-card-border text-sm font-medium hover:border-accent/30 transition-all disabled:opacity-40"
            >
              {testing ? '테스트 중...' : '연결 테스트'}
            </button>
          </div>

          {/* 테스트 결과 */}
          {testResult && (
            <div className={`p-4 rounded-xl border text-sm ${
              testResult.includes('성공')
                ? 'bg-success/10 border-success/30 text-success'
                : 'bg-danger/10 border-danger/30 text-danger'
            }`}>
              {testResult}
            </div>
          )}

          {/* 안내 */}
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/50 space-y-2">
            <p className="font-bold text-accent text-sm">보안 안내</p>
            <p>- API 키는 이 브라우저의 localStorage에만 저장됩니다</p>
            <p>- 외부 서버로 전송되지 않으며, API 제공자에게만 직접 전송됩니다</p>
            <p>- 브라우저 데이터를 삭제하면 키도 함께 삭제됩니다</p>
            <p>- 공용 PC에서는 사용 후 키를 삭제하세요</p>
          </div>
        </div>
      </main>
    </>
  );
}
