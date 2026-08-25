import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../utils/format';

const BudgetCard = ({ tier, name, price, benefits, isActive = false, onClick, index = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className={`card p-6 text-left transition-all duration-300 ${
        isActive
          ? 'ring-2 ring-primary-500 shadow-card-hover transform -translate-y-1'
          : 'hover:shadow-card-hover hover:-translate-y-0.5'
      }`}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-semibold text-dark text-lg">{name}</h4>
        {isActive && (
          <span className="badge bg-primary-500 text-white">Current</span>
        )}
      </div>
      <p className="text-3xl font-display font-bold text-primary-500 mb-4">
        {formatINR(price)}
      </p>
      <ul className="space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-text">
            <Check size={16} className="text-primary-500 mt-0.5 shrink-0" />
            {benefit}
          </li>
        ))}
      </ul>
    </motion.button>
  );
};

export default BudgetCard;