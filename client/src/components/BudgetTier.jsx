import { motion } from 'framer-motion';
import { Check, ArrowUp } from 'lucide-react';
import { formatINR } from '../utils/format';

const tierStyles = {
  budget: 'border-primary-200 bg-primary-50',
  comfort: 'border-secondary/30 bg-teal-50',
  premium: 'border-accent/30 bg-amber-50',
  luxury: 'border-purple-200 bg-purple-50'
};

const BudgetTier = ({ tier, current, next, additionalRequired, onSelect }) => {
  const tierKey = tier?.key || 'budget';
  const style = tierStyles[tierKey] || tierStyles.budget;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`card p-6 ${style} border-2`}
      role="region"
      aria-label={`${tier?.name || 'Budget'} tier unlocked`}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-display font-semibold text-dark">
          {current ? 'Current Tier' : 'Available'} — {tier?.name}
        </h4>
        {current && (
          <span className="badge bg-primary-500 text-white">Selected</span>
        )}
      </div>
      <p className="text-3xl font-display font-bold text-primary-500 mb-4">
        {formatINR(tier?.price)}
      </p>

      {(tier?.accommodation || tier?.transport || tier?.food) && (
        <div className="space-y-2 mb-4">
          {tier?.accommodation && (
            <p className="text-sm text-text">
              <span className="font-medium text-primary-500">Stay:</span> {tier.accommodation}
            </p>
          )}
          {tier?.transport && (
            <p className="text-sm text-text">
              <span className="font-medium text-primary-500">Travel:</span> {tier.transport}
            </p>
          )}
          {tier?.food && (
            <p className="text-sm text-text">
              <span className="font-medium text-primary-500">Food:</span> {tier.food}
            </p>
          )}
        </div>
      )}

      <ul className="space-y-2">
        {(tier?.benefits || []).map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm font-medium text-text">
            <Check size={16} className="text-primary-500 mt-0.5 shrink-0" />
            {benefit}
          </li>
        ))}
      </ul>

      {next && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onSelect}
            className="w-full btn-secondary text-sm py-2.5"
          >
            <ArrowUp size={16} />
            {next.name} — {formatINR(next.price)}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default BudgetTier;