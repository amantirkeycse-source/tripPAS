import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterPanel = ({ filters, onFilterChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterGroups = [
    {
      key: 'country',
      label: 'Country',
      options: ['India', 'Nepal']
    },
    {
      key: 'budget',
      label: 'Budget',
      options: ['Under ₹10k', '₹10k–₹20k', '₹20k–₹40k', '₹40k+']
    },
    {
      key: 'style',
      label: 'Travel Style',
      options: ['Adventure', 'Beach', 'Mountains', 'Culture', 'Nature', 'Spiritual', 'Luxury', 'Family']
    },
    {
      key: 'duration',
      label: 'Duration',
      options: ['Weekend', '3–5 days', '6–10 days', '10+ days']
    }
  ];

  const toggleOption = (groupKey, option) => {
    const current = filters[groupKey] || [];
    const next = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];
    onFilterChange({ ...filters, [groupKey]: next });
  };

  const clearAll = () => {
    onFilterChange({ country: [], budget: [], style: [], duration: [] });
  };

  const activeCount = Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0);
  const hasActiveFilters = activeCount > 0;

  const filterContent = (
    <div className="space-y-5">
      {filterGroups.map((group) => (
        <div key={group.key}>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">{group.label}</h4>
          <div className="flex flex-wrap gap-1.5">
            {group.options.map((option) => {
              const isActive = (filters[group.key] || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(group.key, option)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-pressed={isActive}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          <RotateCcw size={13} />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Desktop */}
      <div className="hidden lg:block card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark flex items-center gap-2 text-sm">
            <SlidersHorizontal size={16} className="text-primary-500" />
            Filters
          </h3>
          {hasActiveFilters && (
            <span className="badge-primary">{activeCount} active</span>
          )}
        </div>
        {filterContent}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-secondary w-full"
          aria-expanded={isOpen}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="badge-primary ml-1">{activeCount}</span>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="card p-5 mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-dark text-sm">Filters</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close filters"
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
                {filterContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterPanel;
