import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8" aria-label="Progress">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isComplete
                    ? 'bg-primary-500 text-white'
                    : isCurrent
                    ? 'bg-primary-100 text-primary-500 ring-2 ring-primary-500'
                    : 'bg-gray-100 text-muted'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isComplete ? <Check size={20} /> : <span className="font-semibold">{index + 1}</span>}
              </div>
              <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-primary-500' : 'text-muted'}`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-6 ${isComplete ? 'bg-primary-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;