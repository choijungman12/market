'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActiveProvider, hasGeminiKey } from '@/lib/client-api';

const navItems = [
  { href: '/', label: '트렌드', icon: '📊' },
  { href: '/generate', label: '생성', icon: '🚀' },
  { href: '/custom', label: '커스텀', icon: '✏' },
  { href: '/history', label: '히스토리', icon: '📋' },
  { href: '/settings', label: '설정', icon: '⚙' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [status, setStatus] = useState({ claude: false, nano: false });

  useEffect(() => {
    setStatus({ claude: getActiveProvider() !== 'none', nano: hasGeminiKey() });
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-sm">HF</div>
            <span className="text-lg font-bold"><span className="gradient-text">HookFlow</span> <span className="text-foreground/60">AI</span></span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-accent/15 text-accent' : 'text-foreground/60 hover:text-foreground hover:bg-card-bg'}`}>
                <span className="mr-1">{item.icon}</span>{item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]">
              <div className={`w-2 h-2 rounded-full ${status.claude ? 'bg-success' : 'bg-danger'}`} />
              <span className="text-foreground/50">{status.claude ? 'Claude' : '미연결'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-bg border border-card-border text-[10px]">
              <div className={`w-2 h-2 rounded-full ${status.nano ? 'bg-purple-400' : 'bg-foreground/20'}`} />
              <span className="text-foreground/50">{status.nano ? 'NanoBanana' : '이미지 꺼짐'}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
