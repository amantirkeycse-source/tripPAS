import { Link } from 'react-router-dom';
import { Heart, Bookmark, MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { formatINR, getInitials } from '../utils/format';

const ExperienceCard = ({ experience, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="card p-6 hover:shadow-card-hover transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        {experience.user?.avatar ? (
          <img
            src={experience.user.avatar}
            alt={experience.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-500 font-semibold text-sm">
              {getInitials(experience.user?.name)}
            </span>
          </div>
        )}
        <div className="flex-1">
          <p className="font-medium text-dark text-sm">
            {experience.user?.name || 'Anonymous traveler'}
            {experience.user?.verified && (
              <span className="ml-1 text-xs text-primary-500" aria-label="Verified">✓</span>
            )}
          </p>
          <p className="text-xs text-muted">
            {experience.destination} · {experience.duration}
          </p>
        </div>
        <Rating value={experience.rating || 0} size={14} />
      </div>

      <Link to={`/experience/${experience.id}`} className="block">
        <h3 className="font-display font-semibold text-lg text-dark mb-2 hover:text-primary-500 transition-colors">
          {experience.title}
        </h3>
        <p className="text-sm text-text line-clamp-3 mb-4">
          {experience.storyPreview || experience.story?.slice(0, 150) || ''}...
        </p>
      </Link>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {experience.destination}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {experience.date}
        </span>
        <span className="flex items-center gap-1">
          <Users size={14} />
          {experience.travelers || 2} travelers
        </span>
        <span className="ml-auto font-semibold text-primary-500">
          ~{formatINR(experience.budget)}
        </span>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <Link to={`/experience/${experience.id}`} className="text-sm font-semibold text-primary-500 hover:text-primary-600">
          Read Story
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Like">
            <Heart size={18} className="text-muted hover:text-red-500 transition-colors" />
          </button>
          <span className="text-xs text-muted">{experience.likes || 0}</span>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Save">
            <Bookmark size={18} className="text-muted hover:text-primary-500 transition-colors" />
          </button>
          <span className="text-xs text-muted">{experience.saves || 0}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
