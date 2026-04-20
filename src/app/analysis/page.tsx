'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { generateAnalysisReport, reportToMarkdown, getActiveProvider, type AnalysisReport, type ViralVideo } from '@/lib/client-api';

export default function AnalysisPage() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'categories' | 'performance' | 'trends'>('summary');

  async function runAnalysis() {
    if (getActiveProvider() === 'none') { setError('설정에서 Anthropic API 키를 먼저 입력하세요.'); return; }
    setLoading(true); setError(null);
    try {
      const result = await generateAnalysisReport();
      setReport(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : '분석 실패');
    } finally {
      setLoading(false);
    }
  }

  function downloadReport() {
    if (!report) return;
    const md = reportToMarkdown(report);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viral-report-${report.date}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold"><span className="gradient-text">일일 바이럴 분석</span></h1>
            <p className="text-foreground/40 text-sm mt-1">오늘의 바이럴 영상 60개 분석 + 성능 지표 + 트렌드 예측</p>
          </div>
          <div className="flex gap-2">
            {report && (
              <button onClick={downloadReport}
                className="px-4 py-2 rounded-lg bg-accent/15 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/25">
                📄 보고서 다운로드 (.md)
              </button>
            )}
            <button onClick={runAnalysis} disabled={loading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-purple-500 text-white text-sm font-bold disabled:opacity-50">
              {loading ? '분석 중...' : report ? '재분석' : '오늘 분석 시작'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-danger/10 border border-danger/30 text-sm text-danger">{error}</div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-[3px] border-accent/30 border-t-accent animate-spin mb-4" />
            <p className="text-foreground/60 text-sm font-medium">웹 검색으로 60개 바이럴 영상 분석 중...</p>
            <p className="text-foreground/30 text-xs mt-2">2-3분 소요 (카테고리 10개 × 영상 6개)</p>
          </div>
        )}

        {!report && !loading && (
          <div className="p-12 rounded-2xl border border-card-border bg-card-bg text-center">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-lg font-bold mb-2">오늘의 바이럴 영상 분석</h2>
            <p className="text-foreground/50 text-sm mb-1">10개 카테고리 × 6개 영상 = 60개 실시간 분석</p>
            <p className="text-foreground/40 text-xs">CPM, 참여율, 바이럴 속도, 훅 패턴, 다음 주 예측까지 자동 생성</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
              {['철학/지혜', '지식/교육', '일상', '웹툰/애니', '아이교육', '해외 바이럴', '자기계발', '재테크', '건강', '테크/IT'].map(c => (
                <div key={c} className="px-3 py-2 rounded-lg bg-background border border-card-border text-xs text-foreground/50">{c}</div>
              ))}
            </div>
          </div>
        )}

        {report && !loading && (
          <>
            {/* 탭 */}
            <div className="flex gap-1 mb-6 border-b border-card-border">
              {[
                { key: 'summary', label: '📊 요약' },
                { key: 'categories', label: '📁 카테고리' },
                { key: 'performance', label: '💰 성과' },
                { key: 'trends', label: '🔮 트렌드 예측' },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key as 'summary' | 'categories' | 'performance' | 'trends')}
                  className={`px-4 py-2.5 text-sm font-medium transition-all ${activeTab === t.key ? 'text-accent border-b-2 border-accent' : 'text-foreground/50 hover:text-foreground/80'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === 'summary' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-accent/5 border border-accent/20">
                  <h3 className="text-sm font-bold text-accent mb-3">💡 오늘의 핵심 인사이트</h3>
                  <p className="text-foreground/80 leading-relaxed">{report.executiveSummary}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-card-bg border border-card-border">
                    <div className="text-2xl font-bold text-accent">{report.totalVideos}</div>
                    <div className="text-xs text-foreground/40 mt-1">분석 영상</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card-bg border border-card-border">
                    <div className="text-2xl font-bold text-purple-400">{Object.keys(report.categories).length}</div>
                    <div className="text-xs text-foreground/40 mt-1">카테고리</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card-bg border border-card-border">
                    <div className="text-2xl font-bold text-success">{report.shortsVsLong.shorts}</div>
                    <div className="text-xs text-foreground/40 mt-1">Shorts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card-bg border border-card-border">
                    <div className="text-2xl font-bold text-warning">{report.shortsVsLong.long}</div>
                    <div className="text-xs text-foreground/40 mt-1">장편</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                    <h3 className="text-sm font-bold text-foreground/70 mb-3">🎣 훅 패턴 분포</h3>
                    <div className="space-y-2">
                      {Object.entries(report.hookPatternDistribution).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{k}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-1.5 bg-background rounded-full overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${(v / report.totalVideos) * 100}%` }} />
                            </div>
                            <span className="text-foreground/50 text-xs w-10 text-right">{v}개</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-card-bg border border-card-border">
                    <h3 className="text-sm font-bold text-foreground/70 mb-3">🌍 지역 분포</h3>
                    <div className="space-y-2">
                      {Object.entries(report.regionDistribution).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-sm">
                          <span>{k}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-1.5 bg-background rounded-full overflow-hidden">
                              <div className="h-full bg-purple-400" style={{ width: `${(v / report.totalVideos) * 100}%` }} />
                            </div>
                            <span className="text-foreground/50 text-xs w-10 text-right">{v}개</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                {Object.entries(report.categories).map(([cat, videos]) => (
                  <div key={cat} className="p-5 rounded-xl bg-card-bg border border-card-border">
                    <h3 className="text-base font-bold mb-4">{cat.replace('_', '/')}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-card-border text-foreground/40">
                            <th className="py-2 px-2 text-left">순위</th>
                            <th className="py-2 px-2 text-left">제목</th>
                            <th className="py-2 px-2 text-left">채널</th>
                            <th className="py-2 px-2 text-right">조회수</th>
                            <th className="py-2 px-2 text-right">참여율</th>
                            <th className="py-2 px-2 text-right">CPM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videos.map((v: ViralVideo, i: number) => (
                            <tr key={i} className="border-b border-card-border/30 hover:bg-accent/5">
                              <td className="py-2 px-2 text-foreground/50">{i+1}</td>
                              <td className="py-2 px-2 font-medium max-w-md truncate">{v.title}</td>
                              <td className="py-2 px-2 text-foreground/60">{v.channel}</td>
                              <td className="py-2 px-2 text-right text-accent">{v.viewsStr}</td>
                              <td className="py-2 px-2 text-right">{v.engagementRate}%</td>
                              <td className="py-2 px-2 text-right text-success">${v.estimatedCPM}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-base font-bold mb-4">💰 CPM TOP 10 (광고 수익 관점)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-card-border text-foreground/40">
                          <th className="py-2 px-2 text-left">순위</th>
                          <th className="py-2 px-2 text-left">제목</th>
                          <th className="py-2 px-2 text-left">카테고리</th>
                          <th className="py-2 px-2 text-right">CPM</th>
                          <th className="py-2 px-2 text-right">예상 수익</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(report.topCPM || []).slice(0, 10).map((v, i) => (
                          <tr key={i} className="border-b border-card-border/30">
                            <td className="py-2 px-2">{i+1}</td>
                            <td className="py-2 px-2 font-medium max-w-md truncate">{v.title}</td>
                            <td className="py-2 px-2 text-foreground/60">{v.category?.replace('_', '/')}</td>
                            <td className="py-2 px-2 text-right text-success font-bold">${v.estimatedCPM}</td>
                            <td className="py-2 px-2 text-right">${v.estimatedRevenue?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-card-bg border border-card-border">
                  <h3 className="text-base font-bold mb-4">🚀 바이럴 속도 TOP 10</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-card-border text-foreground/40">
                          <th className="py-2 px-2 text-left">순위</th>
                          <th className="py-2 px-2 text-left">제목</th>
                          <th className="py-2 px-2 text-right">일평균 조회</th>
                          <th className="py-2 px-2 text-left">카테고리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(report.topViralSpeed || []).slice(0, 10).map((v, i) => (
                          <tr key={i} className="border-b border-card-border/30">
                            <td className="py-2 px-2">{i+1}</td>
                            <td className="py-2 px-2 font-medium max-w-md truncate">{v.title}</td>
                            <td className="py-2 px-2 text-right text-accent font-bold">{v.viralSpeed?.toLocaleString()}</td>
                            <td className="py-2 px-2 text-foreground/60">{v.category?.replace('_', '/')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-4">
                <h3 className="text-sm text-foreground/70 mb-2">📅 다음 주 트렌드 예측</h3>
                {(report.nextWeekPredictions || []).map((p, i) => (
                  <div key={i} className="p-5 rounded-xl bg-gradient-to-br from-accent/5 to-purple-500/5 border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{i+1}. {p.trend}</h4>
                      <span className="px-3 py-1 rounded-full bg-success/20 text-success text-sm font-bold">{p.growth}</span>
                    </div>
                    <p className="text-foreground/60 text-sm">{p.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
