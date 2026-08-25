import { motion } from 'framer-motion';
import { formatINR } from '../utils/format';

const BudgetSlider = ({ value, min, max, onChange, step = 500, label = 'Your budget' }) => {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="budget-slider" className="text-sm font-semibold text-text">
          {label}
        </label>
        <motion.span
          key={value}
          initial={{ scale: 1.1, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-display font-bold text-primary-500"
        >
          {formatINR(value)}
        </motion.span>
      </div>
      <input
        id="budget-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ '--range-progress': `${progress}%` }}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="flex justify-between mt-2 text-sm text-muted">
        <span>{formatINR(min)}</span>
        <span>{formatINR(max)}</span>
      </div>
    </div>
  );
};

export default BudgetSlider;