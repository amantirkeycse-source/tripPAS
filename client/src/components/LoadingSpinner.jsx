import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, label = 'Loading...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`} role="status" aria-live="polite">
      <Loader2 size={size} className="animate-spin text-primary-500" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
};

export default LoadingSpinner;