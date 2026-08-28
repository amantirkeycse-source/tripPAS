import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../utils/format';
import DestinationImageCarousel from './DestinationImageCarousel';

const DestinationCard = ({ destination, index = 0 }) => {
  const images = destination.images || (destination.image ? [destination.image] : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="group card overflow-hidden"
    >
      <Link to={`/destination/${destination.id}`} className="block">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <DestinationImageCarousel
            images={images}
            alt={`${destination.name}, ${destination.country}`}
            height="h-full"
            autoPlay={5000}
            showDots={false}
            className="group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-xs font-bold text-primary-700 shadow-lg">
              From {formatINR(destination.startingBudget)}
            </span>
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-display font-bold text-2xl leading-tight drop-shadow-lg">
              {destination.name}
            </h3>
            <p className="text-white/70 text-sm flex items-center gap-1.5 mt-1">
              <MapPin size={14} className="text-primary-300" />
              {destination.country}
              {destination.state ? `, ${destination.state}` : ''}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <Calendar size={14} />
              {destination.bestTime || 'Year round'}
            </span>
            <span className="text-xs font-bold text-primary-600">
              {destination.idealDuration || '3-5 days'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {(destination.tags || []).slice(0, 2).map((tag) => (
                <span key={tag} className="badge-primary text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-500 group-hover:gap-2.5 transition-all duration-200">
              Explore <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
