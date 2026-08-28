import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Filter, Compass } from 'lucide-react';
import { getExperiences } from '../services/api';
import ExperienceCard from '../components/ExperienceCard';
import EmptyState from '../components/EmptyState';
import localExperiences from '../data/experiences';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    rating: '',
    style: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getExperiences();
        if (res.success) setExperiences(res.experiences?.length ? res.experiences : localExperiences);
      } catch (error) {
        console.error('Failed to load experiences:', error);
        setExperiences(localExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const destinations = useMemo(() => {
    const unique = [...new Set(experiences.map(e => e.destination))];
    return unique.sort();
  }, [experiences]);

  const filteredExperiences = useMemo(() => {
    let result = experiences;

    if (filters.destination) {
      result = result.filter(e => e.destination === filters.destination);
    }

    if (filters.budget) {
      const [min, max] = filters.budget.split('-').map(Number);
      result = result.filter(e => e.budget >= min && (max ? e.budget <= max : true));
    }

    if (filters.rating) {
      const minRating = Number(filters.rating);
      result = result.filter(e => e.rating >= minRating);
    }

    if (filters.style) {
      result = result.filter(e => e.travelStyle === filters.style);
    }

    return result;
  }, [filters, experiences]);

  const budgetOptions = [
    { value: '0-10000', label: 'Under ₹10k' },
    { value: '10000-20000', label: '₹10k – ₹20k' },
    { value: '20000-30000', label: '₹20k – ₹30k' },
    { value: '30000-999999', label: '₹30k+' }
  ];

  const ratingOptions = ['4.5', '4.0', '3.5'];
  const styleOptions = ['Budget', 'Beach', 'Culture', 'Adventure', 'Nature', 'Family', 'Solo', 'Trekking', 'Biker trip'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-28 pb-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-28 pb-12">
      <div className="container-tp">
        {/* Header with decorative glows */}
        <div className="relative text-center mb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -top-10 -right-20 w-[200px] h-[200px] bg-primary-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-20 w-[200px] h-[200px] bg-primary-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 mb-5">
              <Compass size={32} className="text-primary-500" />
            </div>
            <h1 className="text-4xl font-display font-bold text-dark mb-3">
              Travel stories from people who have been there.
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Real experiences, honest budgets, and advice you can actually use.
            </p>
            <Link to="/experiences/new" className="btn-primary mt-6">
              <Plus size={18} />
              Share Your Experience
            </Link>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card rounded-3xl overflow-hidden mb-8"
        >
          <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                <Filter size={18} className="text-primary-500" />
              </div>
              <h2 className="font-bold text-dark text-lg">Filter Experiences</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label-field">Destination</label>
                <select
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  className="input-field"
                >
                  <option value="">All destinations</option>
                  {destinations.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">Budget</label>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any budget</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any rating</option>
                  {ratingOptions.map(rating => (
                    <option key={rating} value={rating}>{rating}+ stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">Travel Style</label>
                <select
                  value={filters.style}
                  onChange={(e) => setFilters({ ...filters, style: e.target.value })}
                  className="input-field"
                >
                  <option value="">Any style</option>
                  {styleOptions.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stat badges row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="badge-primary">
            {experiences.length} {experiences.length === 1 ? 'Story' : 'Stories'}
          </span>
          {filters.destination && (
            <span className="badge-primary">{filters.destination}</span>
          )}
          {filters.style && (
            <span className="badge-primary">{filters.style}</span>
          )}
          {filteredExperiences.length !== experiences.length && (
            <span className="badge-accent">
              {filteredExperiences.length} shown
            </span>
          )}
        </div>

        {/* Experience grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card rounded-3xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <Compass size={40} className="text-primary-300" />
            </div>
            <h3 className="text-xl font-display font-bold text-dark mb-2">
              No experiences found
            </h3>
            <p className="text-muted max-w-md mx-auto mb-6">
              Try adjusting your filters or be the first to share your experience.
            </p>
            <Link to="/experiences/new" className="btn-primary">
              <Plus size={18} />
              Share Your Experience
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
