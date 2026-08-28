import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { getDestinations } from '../services/api';
import DestinationGrid from '../components/DestinationGrid';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import { destinations as localDestinations } from '../data/destinations';

const Explore = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: [],
    budget: [],
    style: [],
    duration: []
  });
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDestinations();
        if (res.success) {
          setDestinations(res.destinations?.length ? res.destinations : localDestinations);
        }
      } catch (error) {
        console.error('Failed to load destinations:', error);
        setDestinations(localDestinations);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDestinations = useMemo(() => {
    let result = destinations;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.state?.toLowerCase().includes(q) ||
        d.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (filters.country.length > 0) {
      result = result.filter(d => filters.country.includes(d.country));
    }

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

    if (filters.style.length > 0) {
      result = result.filter(d =>
        d.tags?.some(tag => filters.style.includes(tag)) ||
        d.travelStyle?.some(style => filters.style.includes(style))
      );
    }

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
  }, [searchQuery, filters, destinations]);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDestinations.length;

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + (arr?.length || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-xl font-display font-bold text-dark mb-2">Discovering destinations</p>
          <p className="text-sm text-gray-500">Finding the best places for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative bg-dark text-white py-24 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="container-tp relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm font-medium mb-6">
              <MapPin size={14} className="text-primary-400" />
              {filteredDestinations.length}+ destinations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight">
              Explore Destinations
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mb-10 leading-relaxed">
              Discover incredible places across India and Nepal with realistic starting budgets.
            </p>
            <div className="max-w-xl">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, country, or tag..." />
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
                <p className="text-sm text-gray-500">
                  Showing{' '}
                  <span className="font-bold text-dark">{visibleDestinations.length}</span>
                  {' '}of{' '}
                  <span className="font-bold text-dark">{filteredDestinations.length}</span>
                  {' '}destinations
                </p>
                {activeFilterCount > 0 && (
                  <span className="badge-primary">
                    <SlidersHorizontal size={12} />
                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                  </span>
                )}
              </div>

              {filteredDestinations.length === 0 ? (
                <EmptyState
                  title="No destinations found"
                  description="Try adjusting your search or filters to find more destinations."
                  action={(
                    <button
                      onClick={() => setFilters({ country: [], budget: [], style: [], duration: [] })}
                      className="btn-secondary"
                    >
                      Clear Filters
                    </button>
                  )}
                />
              ) : (
                <>
                  <DestinationGrid destinations={visibleDestinations} />
                  {hasMore && (
                    <div className="text-center mt-12">
                      <button onClick={() => setVisibleCount(visibleCount + 9)} className="btn-secondary px-8 py-3">
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
