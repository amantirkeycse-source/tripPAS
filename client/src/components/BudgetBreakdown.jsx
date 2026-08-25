import { motion } from 'framer-motion';
import { formatINR } from '../utils/format';

const BudgetBreakdown = ({ breakdown, total }) => {
  const maxAmount = Math.max(...breakdown.map(item => item.amount));

  return (
    <div className="space-y-4">
      {breakdown.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-text">{item.label}</span>
            <span className="text-sm font-semibold text-dark">{formatINR(item.amount)}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(item.amount / maxAmount) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
        </motion.div>
      ))}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="font-semibold text-dark">Total</span>
        <span className="text-xl font-display font-bold text-primary-500">{formatINR(total)}</span>
      </div>
    </div>
  );
};

export default BudgetBreakdown;