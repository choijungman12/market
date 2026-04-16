'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getApiKey, setApiKey, getActiveProvider, getGenSparkUrl, setGenSparkUrl } from '@/lib/client-api';

export default function SettingsPage() {
  const [anthropicKey, setAnthropicKeyState] = useState('');
  const [gensparkKey, setGensparkKeyState] = useState('');
  const [gensparkUrl, setGensparkUrlState] = useState('');
  const [saved, setSaved] = useState(false);
  const [provider, setProvider] = useState('none');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setAnthropicKeyState(getApiKey('anthropic'));
    setGensparkKeyState(getApiKey('genspark'));
    setGensparkUrlState(getGenSparkUrl());
    setProvider(getActiveProvider());
  }, []);

  function handleSave() {
    setApiKey('anthropic', anthropicKey.trim());
    setApiKey('genspark', gensparkKey.trim());
    setGenSparkUrl(gensparkUrl.trim().replace(/\/+$/, '')); // trailing slash 제거
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
        setTestResult('API 키가 설정되지 않았습니다. 저장 후 다시 시도하세요.');
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
            messages: [{ role: 'user', content: 'Say "연결 성공!" in Korean. Just those two words.' }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTestResult(`Claude 연결 성공! 응답: "${data.content?.[0]?.text}"`);
        } else {
          const err = await res.text();
          setTestResult(`Claude 연결 실패 (${res.status}): ${err.slice(0, 100)}`);
        }
      } else if (active === 'genspark') {
        const url = getGenSparkUrl();
        const res = await fetch(`${url}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getApiKey('genspark')}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            max_tokens: 50,
            messages: [{ role: 'user', content: 'Say "연결 성공!" Just those two words.' }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTestResult(`GenSpark 연결 성공! 응답: "${data.choices?.[0]?.message?.content}"`);
        } else {
          const err = await res.text();
          setTestResult(`GenSpark 연결 실패 (${res.status}): ${err.slice(0, 100)}`);
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
          API 키는 이 브라우저에만 저장됩니다. 서버로 전송되지 않습니다.
        </p>

        <div className="space-y-6">
          {/* 현재 상태 */}
          <div className={`p-4 rounded-xl border ${provider !== 'none' ? 'bg-success/10 border-success/30' : 'bg-warning/10 border-warning/30'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${provider !== 'none' ? 'bg-success animate-pulse-glow' : 'bg-warning'}`} />
              <div>
                <div className="text-sm font-bold">
                  {provider === 'anthropic' && 'Claude (Anthropic) 활성화됨'}
                  {provider === 'genspark' && 'GenSpark 활성화됨'}
                  {provider === 'none' && 'API 미연결 - 아래에서 키를 입력하세요'}
                </div>
              </div>
            </div>
          </div>

          {/* Anthropic (추천) */}
          <div className="p-6 rounded-xl bg-card-bg border border-accent/30 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm">Anthropic Claude API <span className="text-accent">(추천)</span></h2>
            </div>
            <p className="text-xs text-foreground/40">
              console.anthropic.com 에서 발급. sk-ant- 으로 시작합니다.
            </p>
            <input
              type="password"
              placeholder="sk-ant-api03-..."
              value={anthropicKey}
              onChange={(e) => setAnthropicKeyState(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* GenSpark */}
          <div className="p-6 rounded-xl bg-card-bg border border-card-border space-y-3">
            <h2 className="font-bold text-sm">GenSpark API (대안)</h2>
            <p className="text-xs text-foreground/40">
              GenSpark 유료 계정 키 + API 서버 URL이 모두 필요합니다.
            </p>
            <input
              type="password"
              placeholder="gsk-..."
              value={gensparkKey}
              onChange={(e) => setGensparkKeyState(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="text"
              placeholder="https://your-genspark-server.com/v1"
              value={gensparkUrl}
              onChange={(e) => setGensparkUrlState(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent transition-colors"
            />
            <p className="text-[10px] text-foreground/30">
              GenSpark는 자체 API 서버가 필요합니다 (genspark2api). 서버 URL을 입력하세요.
            </p>
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
              disabled={testing}
              className="px-6 py-3 rounded-xl bg-card-bg border border-card-border text-sm font-medium hover:border-accent/30 transition-all disabled:opacity-40"
            >
              {testing ? '테스트 중...' : '연결 테스트'}
            </button>
          </div>

          {/* 테스트 결과 */}
          {testResult && (
            <div className={`p-4 rounded-xl border text-sm ${testResult.includes('성공') ? 'bg-success/10 border-success/30 text-success' : 'bg-danger/10 border-danger/30 text-danger'}`}>
              {testResult}
            </div>
          )}

          {/* 퀵 가이드 */}
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/50 space-y-2">
            <p className="font-bold text-accent text-sm">빠른 시작 가이드</p>
            <p>1. 위에서 Anthropic API 키를 입력하고 <strong>저장</strong>을 누르세요</p>
            <p>2. <strong>연결 테스트</strong>로 정상 연결을 확인하세요</p>
            <p>3. 메뉴의 <strong>트렌드(📊)</strong>로 이동하세요</p>
            <p>4. 트렌드를 클릭하면 자동으로 콘텐츠가 생성됩니다!</p>
          </div>

          {/* 보안 */}
          <div className="p-4 rounded-xl bg-card-bg border border-card-border text-xs text-foreground/30 space-y-1">
            <p>- API 키는 브라우저 localStorage에만 저장됩니다</p>
            <p>- API 제공자 서버로만 직접 전송되며, 제3자에게 노출되지 않습니다</p>
            <p>- 공용 PC 사용 시 브라우저 데이터를 삭제하세요</p>
          </div>
        </div>
      </main>
    </>
  );
}
