import DestinationCard from './DestinationCard';
import EmptyState from './EmptyState';

const DestinationGrid = ({ destinations, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card h-72 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-2xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!destinations?.length) {
    return (
      <EmptyState
        title="No destinations found"
        description="Try adjusting your filters or search query."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((dest, index) => (
        <DestinationCard key={dest.id} destination={dest} index={index} />
      ))}
    </div>
  );
};

export default DestinationGrid;