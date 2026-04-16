'use client';

import type { WorkflowStep } from '@/types';

const steps: { key: WorkflowStep; label: string; icon: string }[] = [
  { key: 'topic', label: '토픽 선택', icon: '1' },
  { key: 'hooks', label: '후킹 생성', icon: '2' },
  { key: 'carousel', label: '카루셀 제작', icon: '3' },
  { key: 'landing', label: '랜딩 페이지', icon: '4' },
];

interface StepperProps {
  currentStep: WorkflowStep;
}

export default function Stepper({ currentStep }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((step, i) => {
        const isActive = i === currentIndex;
        const isCompleted = i < currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            {/* 스텝 */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : isCompleted
                      ? 'bg-success/20 text-success'
                      : 'bg-card-bg text-foreground/30 border border-card-border'
                }`}
              >
                {isCompleted ? '✓' : step.icon}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  isActive
                    ? 'text-accent'
                    : isCompleted
                      ? 'text-success'
                      : 'text-foreground/30'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* 연결선 */}
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 mx-2 ${
                  isCompleted ? 'bg-success/50' : 'bg-card-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
