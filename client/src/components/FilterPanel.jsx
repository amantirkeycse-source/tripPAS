import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

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
      label: 'Travel style',
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

  const hasActiveFilters = Object.values(filters).some(arr => arr?.length > 0);

  const filterContent = (
    <div className="space-y-6">
      {filterGroups.map((group) => (
        <div key={group.key}>
          <h4 className="text-sm font-semibold text-dark mb-3">{group.label}</h4>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isActive = (filters[group.key] || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(group.key, option)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500 text-white shadow'
                      : 'bg-gray-100 text-text hover:bg-primary-50'
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
        <button onClick={clearAll} className="text-sm font-semibold text-primary-500 hover:text-primary-600">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className={className}>
      {/* Desktop */}
      <div className="hidden lg:block card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-dark flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-primary-500" />
            Filters
          </h3>
          {hasActiveFilters && (
            <span className="badge bg-primary-50 text-primary-500">
              {Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0)} active
            </span>
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
          <SlidersHorizontal size={18} />
          Filters
          {hasActiveFilters && (
            <span className="badge bg-primary-500 text-white ml-2">
              {Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0)}
            </span>
          )}
        </button>
        {isOpen && (
          <div className="card p-6 mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-dark">Filters</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close filters">
                <X size={20} className="text-muted" />
              </button>
            </div>
            {filterContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;