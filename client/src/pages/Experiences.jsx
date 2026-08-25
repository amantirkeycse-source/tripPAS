import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import experiences from '../data/experiences';
import ExperienceCard from '../components/ExperienceCard';
import EmptyState from '../components/EmptyState';

const Experiences = () => {
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    rating: '',
    style: ''
  });

  const destinations = useMemo(() => {
    const unique = [...new Set(experiences.map(e => e.destination))];
    return unique.sort();
  }, []);

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
  }, [filters]);

  const budgetOptions = [
    { value: '0-10000', label: 'Under ₹10k' },
    { value: '10000-20000', label: '₹10k – ₹20k' },
    { value: '20000-30000', label: '₹20k – ₹30k' },
    { value: '30000-999999', label: '₹30k+' }
  ];

  const ratingOptions = ['4.5', '4.0', '3.5'];
  const styleOptions = ['Budget', 'Beach', 'Culture', 'Adventure', 'Nature', 'Family', 'Solo', 'Trekking', 'Biker trip'];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp">
        <div className="text-center mb-10">
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
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-primary-500" />
            <h2 className="font-semibold text-dark">Filter Experiences</h2>
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

        {/* Experience grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No experiences found"
            description="Try adjusting your filters or be the first to share your experience."
            action={<Link to="/experiences/new" className="btn-primary">Share Your Experience</Link>}
          />
        )}
      </div>
    </div>
  );
};

export default Experiences;