interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div
            key={step}
            className={[
              "rounded-full transition-all duration-300",
              isActive
                ? "w-6 h-2 bg-primary"
                : isCompleted
                  ? "w-2 h-2 bg-primary/60"
                  : "w-2 h-2 bg-border",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
