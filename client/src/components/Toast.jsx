import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type = 'success', onClose }) => {
  const icons = {
    success: <CheckCircle2 size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />
  };

  const colors = {
    success: 'border-green-200 bg-green-50',
    error: 'border-red-200 bg-red-50',
    info: 'border-blue-200 bg-blue-50'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${colors[type]}`}
        role="alert"
      >
        {icons[type]}
        <p className="text-sm font-medium text-text">{message}</p>
        <button onClick={onClose} className="ml-2 p-1 rounded hover:bg-black/5" aria-label="Dismiss">
          <X size={16} className="text-muted" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;