import { Star } from 'lucide-react';

const Rating = ({ value = 0, size = 16, showValue = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rating: ${value} out of 5`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.round(value)
                ? 'fill-accent text-accent'
                : 'fill-gray-200 text-gray-200'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-text ml-1">{value.toFixed(1)}</span>
      )}
    </div>
  );
};

export default Rating;