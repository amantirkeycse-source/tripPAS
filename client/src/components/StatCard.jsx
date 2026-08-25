import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, sublabel, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card p-6 text-center hover:shadow-card-hover transition-all duration-300"
    >
      <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-3">
        <Icon size={24} className="text-primary-500" />
      </div>
      <p className="text-2xl font-display font-bold text-dark">{value}</p>
      <p className="text-sm font-medium text-text mt-1">{label}</p>
      {sublabel && <p className="text-xs text-muted mt-1">{sublabel}</p>}
    </motion.div>
  );
};

export default StatCard;