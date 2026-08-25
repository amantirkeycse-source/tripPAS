import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../utils/format';
import DestinationImageCarousel from './DestinationImageCarousel';

const DestinationCard = ({ destination, index = 0 }) => {
  // Get images - use images array if available, fallback to single image
  const images = destination.images || (destination.image ? [destination.image] : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group card overflow-hidden cursor-pointer"
    >
      <Link to={`/destination/${destination.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <DestinationImageCarousel
            images={images}
            alt={`${destination.name}, ${destination.country}`}
            height="h-48"
            autoPlay={5000}
            showDots={false}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
            <div>
              <h3 className="text-white font-display font-semibold text-xl drop-shadow">
                {destination.name}
              </h3>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <MapPin size={14} />
                {destination.country}
              </p>
            </div>
          </div>
          <span className="absolute top-3 right-3 badge bg-white/90 text-primary-500 shadow pointer-events-none">
            From {formatINR(destination.startingBudget)}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted flex items-center gap-1">
              <Calendar size={14} />
              {destination.bestTime || 'Year round'}
            </span>
            <span className="text-xs font-semibold text-primary-500">
              {destination.idealDuration || '3-5 days'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {(destination.tags || []).slice(0, 3).map((tag) => (
                <span key={tag} className="badge bg-primary-50 text-primary-500">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 group-hover:gap-2 transition-all">
              Explore <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;