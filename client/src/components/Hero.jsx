import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ title, subtitle, primaryCta, secondaryCta, image, children }) => {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
      )}
      <div className="relative container-tp py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 badge bg-white/10 text-white backdrop-blur mb-6">
            <Compass size={16} />
            Fresh, budget-friendly travel
          </div>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            {primaryCta && (
              <Link to={primaryCta.to} className="btn-accent text-base px-8 py-4">
                {primaryCta.label}
                <ArrowRight size={20} />
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.to} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-all">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </motion.div>
        {children}
      </div>
    </section>
  );
};

export default Hero;