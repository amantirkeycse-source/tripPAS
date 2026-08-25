import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TextReveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block overflow-hidden mr-[0.3em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.3 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              delay: delay + i * 0.05,
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1]
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
};

export default TextReveal;
