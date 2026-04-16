'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getApiKey, setApiKey, getActiveProvider, hasGeminiKey, generateNanoBananaImage } from '@/lib/client-api';

export default function SettingsPage() {
  const [anthropicKey, setAK] = useState('');
  const [geminiKey, setGK] = useState('');
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testImg, setTestImg] = useState<string | null>(null);

  useEffect(() => {
    setAK(getApiKey('anthropic'));
    setGK(getApiKey('gemini'));
  }, []);

  function handleSave() {
    setApiKey('anthropic', anthropicKey.trim());
    setApiKey('gemini', geminiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function testClaude() {
    setTesting(true); setTestResult(null);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey.trim(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 30,
          messages: [{ role: 'user', content: '"연결 성공"이라고만 답해주세요.' }],
        }),
      });
      if (res.ok) {
        const d = await res.json();
        setTestResult(`Claude 연결 성공! "${d.content?.[0]?.text}"`);
      } else {
        setTestResult(`Claude 실패 (${res.status})`);
      }
    } catch (e) {
      setTestResult(`오류: ${e instanceof Error ? e.message : String(e)}`);
    } finally { setTesting(false); }
  }

  async function testNanoBanana() {
    setTesting(true); setTestResult(null); setTestImg(null);
    try {
      setApiKey('gemini', geminiKey.trim());
      const img = await generateNanoBananaImage(
        'A beautiful minimal abstract gradient background, dark purple and indigo, no text, square format'
      );
      if (img) {
        setTestImg(img);
        setTestResult('NanoBanana 이미지 생성 성공!');
      } else {
        setTestResult('NanoBanana 이미지 생성 실패. 키를 확인하세요.');
      }
    } catch (e) {
      setTestResult(`오류: ${e instanceof Error ? e.message : String(e)}`);
    } finally { setTesting(false); }
  }

  const provider = typeof window !== 'undefined' ? getActiveProvider() : 'none';
  const geminiOk = typeof window !== 'undefined' ? hasGeminiKey() : false;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6"><span className="gradient-text">API 설정</span></h1>

        <div className="space-y-6">
          {/* 상태 */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl border text-center ${provider !== 'none' ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30'}`}>
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${provider !== 'none' ? 'bg-success' : 'bg-danger'}`} />
              <div className="text-xs font-bold">{provider !== 'none' ? 'Claude 연결됨' : 'Claude 미연결'}</div>
              <div className="text-[10px] text-foreground/40 mt-1">텍스트 생성</div>
            </div>
            <div className={`p-4 rounded-xl border text-center ${geminiOk ? 'bg-success/10 border-success/30' : 'bg-warning/10 border-warning/30'}`}>
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${geminiOk ? 'bg-success' : 'bg-warning'}`} />
              <div className="text-xs font-bold">{geminiOk ? 'NanoBanana 연결됨' : 'NanoBanana 미연결'}</div>
              <div className="text-[10px] text-foreground/40 mt-1">이미지 생성</div>
            </div>
          </div>

          {/* Claude API */}
          <div className="p-6 rounded-xl bg-card-bg border border-accent/30 space-y-3">
            <h2 className="font-bold text-sm">Anthropic Claude API <span className="text-accent">(필수)</span></h2>
            <p className="text-xs text-foreground/40">후킹 콘텐츠, 카루셀 구조, 랜딩 페이지 생성에 사용</p>
            <input type="password" placeholder="sk-ant-api03-..." value={anthropicKey}
              onChange={(e) => setAK(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent" />
            <p className="text-[10px] text-foreground/30">발급: console.anthropic.com → API Keys → Create Key</p>
          </div>

          {/* Gemini (NanoBanana) */}
          <div className="p-6 rounded-xl bg-card-bg border border-purple-500/30 space-y-3">
            <h2 className="font-bold text-sm">Gemini API = NanoBanana <span className="text-purple-400">(이미지 생성)</span></h2>
            <p className="text-xs text-foreground/40">카루셀 배경 이미지 자동 생성. 무료 키 사용 가능!</p>
            <input type="password" placeholder="AIzaSy..." value={geminiKey}
              onChange={(e) => setGK(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-card-border text-sm font-mono focus:outline-none focus:border-accent" />
            <p className="text-[10px] text-foreground/30">발급: aistudio.google.com → Get API Key → Create (무료)</p>
          </div>

          {/* 저장 + 테스트 */}
          <button onClick={handleSave}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-purple-500 text-white font-bold text-sm hover:opacity-90">
            {saved ? '저장 완료!' : '저장하기'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={testClaude} disabled={testing || !anthropicKey}
              className="py-2.5 rounded-xl bg-card-bg border border-card-border text-sm font-medium hover:border-accent/30 disabled:opacity-40">
              {testing ? '...' : 'Claude 테스트'}
            </button>
            <button onClick={testNanoBanana} disabled={testing || !geminiKey}
              className="py-2.5 rounded-xl bg-card-bg border border-purple-500/30 text-sm font-medium hover:border-purple-500/50 disabled:opacity-40">
              {testing ? '...' : 'NanoBanana 테스트'}
            </button>
          </div>

          {testResult && (
            <div className={`p-4 rounded-xl border text-sm ${testResult.includes('성공') ? 'bg-success/10 border-success/30 text-success' : 'bg-danger/10 border-danger/30 text-danger'}`}>
              {testResult}
            </div>
          )}

          {testImg && (
            <div className="rounded-xl overflow-hidden border border-card-border">
              <img src={testImg} alt="NanoBanana test" className="w-full aspect-square object-cover" />
              <div className="p-2 bg-card-bg text-xs text-center text-foreground/40">NanoBanana 테스트 이미지</div>
            </div>
          )}

          {/* 가이드 */}
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-xs text-foreground/50 space-y-2">
            <p className="font-bold text-accent text-sm">빠른 시작</p>
            <p>1. Claude API 키 입력 → 저장 → 테스트</p>
            <p>2. (선택) Gemini 키 입력 → NanoBanana 이미지 활성화</p>
            <p>3. 트렌드 페이지에서 토픽 선택 → 자동 생성!</p>
          </div>
        </div>
      </main>
    </>
  );
}
