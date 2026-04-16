'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActiveProvider } from '@/lib/client-api';

const navItems = [
  { href: '/', label: '트렌드', icon: '📊' },
  { href: '/generate', label: '생성', icon: '🚀' },
  { href: '/preview', label: '미리보기', icon: '🖼' },
  { href: '/settings', label: '설정', icon: '⚙' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [provider, setProvider] = useState<string>('확인 중...');

  useEffect(() => {
    const p = getActiveProvider();
    if (p === 'anthropic') setProvider('Claude 연결됨');
    else if (p === 'genspark') setProvider('GenSpark 연결됨');
    else setProvider('설정 필요');
  }, []);

  const isConnected = provider.includes('연결됨');

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              HF
            </div>
            <span className="text-lg font-bold">
              <span className="gradient-text">HookFlow</span>{' '}
              <span className="text-foreground/60">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/15 text-accent'
                      : 'text-foreground/60 hover:text-foreground hover:bg-card-bg'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-xs">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected
                    ? 'bg-success animate-pulse-glow'
                    : 'bg-warning'
                }`}
              />
              <span className="text-foreground/60">{provider}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
