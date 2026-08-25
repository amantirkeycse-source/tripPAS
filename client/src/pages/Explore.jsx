import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import destinations from '../data/destinations';
import DestinationGrid from '../components/DestinationGrid';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: [],
    budget: [],
    style: [],
    duration: []
  });
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredDestinations = useMemo(() => {
    let result = destinations;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.state?.toLowerCase().includes(q) ||
        d.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Country filter
    if (filters.country.length > 0) {
      result = result.filter(d => filters.country.includes(d.country));
    }

    // Budget filter
    if (filters.budget.length > 0) {
      result = result.filter(d => {
        return filters.budget.some(range => {
          const budget = d.startingBudget;
          if (range === 'Under ₹10k') return budget < 10000;
          if (range === '₹10k–₹20k') return budget >= 10000 && budget <= 20000;
          if (range === '₹20k–₹40k') return budget > 20000 && budget <= 40000;
          if (range === '₹40k+') return budget > 40000;
          return false;
        });
      });
    }

    // Style filter
    if (filters.style.length > 0) {
      result = result.filter(d =>
        d.tags?.some(tag => filters.style.includes(tag)) ||
        d.travelStyle?.some(style => filters.style.includes(style))
      );
    }

    // Duration filter
    if (filters.duration.length > 0) {
      result = result.filter(d => {
        return filters.duration.some(duration => {
          const ideal = d.idealDuration || '';
          if (duration === 'Weekend') return ideal.includes('1-2') || ideal.includes('2 days');
          if (duration === '3–5 days') return ideal.includes('3') || ideal.includes('4') || ideal.includes('5');
          if (duration === '6–10 days') return ideal.includes('6') || ideal.includes('7') || ideal.includes('8') || ideal.includes('9') || ideal.includes('10');
          if (duration === '10+ days') return ideal.includes('10+');
          return false;
        });
      });
    }

    return result;
  }, [searchQuery, filters]);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDestinations.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-dark text-white py-16">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Explore Destinations
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Discover incredible places across India and Nepal with realistic starting budgets.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Where do you want to go?" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12">
        <div className="container-tp">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <FilterPanel filters={filters} onFilterChange={setFilters} />

            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted">
                  Showing <span className="font-semibold text-dark">{visibleDestinations.length}</span> of{' '}
                  <span className="font-semibold text-dark">{filteredDestinations.length}</span> destinations
                </p>
                <span className="badge bg-primary-50 text-primary-500">
                  <MapPin size={14} className="mr-1" />
                  India & Nepal
                </span>
              </div>

              {filteredDestinations.length === 0 ? (
                <EmptyState
                  title="No destinations found"
                  description="Try adjusting your search or filters to find more destinations."
                />
              ) : (
                <>
                  <DestinationGrid destinations={visibleDestinations} />
                  {hasMore && (
                    <div className="text-center mt-10">
                      <button onClick={() => setVisibleCount(visibleCount + 9)} className="btn-secondary">
                        Load More Destinations
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;