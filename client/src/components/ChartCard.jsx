import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`card p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-display font-semibold text-dark text-lg">{title}</h3>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
};

export default ChartCard;