import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Where do you want to go?', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-12 py-3.5 text-base"
        aria-label="Search destinations"
      />
    </div>
  );
};

export default SearchBar;