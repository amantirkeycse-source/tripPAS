import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = '', glareColor = 'rgba(255,255,255,0.2)' }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = clientX - left;
    const mouseY = clientY - top;

    const rotateX = ((mouseY - height / 2) / height) * -10;
    const rotateY = ((mouseX - width / 2) / width) * 10;

    setPosition({ x: mouseX, y: mouseY });
    setOpacity(1);
    setRotate({ x: rotateX, y: rotateY });
  };

  const reset = () => {
    setOpacity(0);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${glareColor}, transparent 60%)`,
          opacity
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
