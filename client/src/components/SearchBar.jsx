import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Where do you want to go?', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-900 text-sm font-medium
                   placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-primary-500
                   transition-all duration-200 shadow-sm focus:shadow-md focus:shadow-primary-500/10"
        aria-label="Search destinations"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
