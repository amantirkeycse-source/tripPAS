import { Link } from 'react-router-dom';
import { Heart, Bookmark, MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { formatINR, getInitials } from '../utils/format';

const ExperienceCard = ({ experience, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.33, 1, 0.68, 1] }}
      className="card p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* User Header */}
      <div className="flex items-center gap-3 mb-4">
        {experience.user?.avatar ? (
          <img
            src={experience.user.avatar}
            alt={experience.user.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center ring-2 ring-white shadow-md">
            <span className="text-white font-bold text-sm">
              {getInitials(experience.user?.name)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-dark text-sm truncate">
            {experience.user?.name || 'Anonymous traveler'}
            {experience.user?.verified && (
              <span className="ml-1.5 text-primary-500 text-xs" aria-label="Verified">&#10003;</span>
            )}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {experience.destination} &middot; {experience.duration}
          </p>
        </div>
        <Rating value={experience.rating || 0} size={14} />
      </div>

      {/* Content */}
      <Link to={`/experience/${experience.id}`} className="block group/content">
        <h3 className="font-display font-bold text-base text-dark mb-2 group-hover/content:text-primary-600 transition-colors line-clamp-2">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {experience.storyPreview || experience.story?.slice(0, 150) || ''}
        </p>
      </Link>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
        <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
          <MapPin size={12} />
          {experience.destination}
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
          <Clock size={12} />
          {experience.date}
        </span>
        <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
          <Users size={12} />
          {experience.travelers || 2}
        </span>
        <span className="ml-auto font-bold text-primary-600 text-sm">
          ~{formatINR(experience.budget)}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Link
          to={`/experience/${experience.id}`}
          className="text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors"
        >
          Read Story
        </Link>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-xl hover:bg-red-50 transition-colors" aria-label="Like">
            <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
          </button>
          <span className="text-xs text-gray-400 font-medium min-w-[20px]">{experience.likes || 0}</span>
          <button className="p-2 rounded-xl hover:bg-primary-50 transition-colors" aria-label="Save">
            <Bookmark size={16} className="text-gray-400 hover:text-primary-500 transition-colors" />
          </button>
          <span className="text-xs text-gray-400 font-medium min-w-[20px]">{experience.saves || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
