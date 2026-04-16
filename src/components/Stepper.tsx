'use client';

import type { WorkflowStep } from '@/types';

const steps: { key: WorkflowStep; label: string; icon: string }[] = [
  { key: 'topic', label: '토픽 선택', icon: '1' },
  { key: 'hooks', label: '대본 작성', icon: '2' },
  { key: 'carousel', label: 'SNS 이미지', icon: '3' },
];

export default function Stepper({ currentStep }: { currentStep: WorkflowStep }) {
  const ci = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((step, i) => (
        <div key={step.key} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i === ci ? 'bg-accent text-white shadow-lg shadow-accent/30' :
              i < ci ? 'bg-success/20 text-success' : 'bg-card-bg text-foreground/30 border border-card-border'
            }`}>{i < ci ? '✓' : step.icon}</div>
            <span className={`text-sm font-medium hidden sm:block ${
              i === ci ? 'text-accent' : i < ci ? 'text-success' : 'text-foreground/30'
            }`}>{step.label}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-8 sm:w-12 h-0.5 mx-2 ${i < ci ? 'bg-success/50' : 'bg-card-border'}`} />}
        </div>
      ))}
    </div>
  );
}
