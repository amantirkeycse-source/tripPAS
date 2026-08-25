import { getInitials } from '../utils/format';

/**
 * UserAvatar - Reusable avatar component.
 *
 * Props:
 *   user     - { name, avatar } object (or null)
 *   size     - 'sm' | 'md' | 'lg' | 'xl'  (default 'md')
 *   className - additional classes
 *   showRing  - optional ring on hover (default false)
 */
const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

// Deterministic gradient based on name string
const gradients = [
  'from-primary-400 to-primary-600',
  'from-emerald-400 to-teal-600',
  'from-violet-400 to-purple-600',
  'from-rose-400 to-pink-600',
  'from-amber-400 to-orange-600',
  'from-sky-400 to-blue-600',
  'from-fuchsia-400 to-pink-600',
  'from-lime-400 to-green-600',
];

function getGradient(name) {
  if (!name) return gradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

const UserAvatar = ({ user, size = 'md', className = '', showRing = false }) => {
  const sizeClass = sizeMap[size] || sizeMap.md;
  const name = user?.name || '';
  const hasAvatar = user?.avatar && user.avatar.trim().length > 0;
  const initials = getInitials(name);
  const gradient = getGradient(name);

  if (hasAvatar) {
    return (
      <img
        src={user.avatar}
        alt={name || 'User avatar'}
        className={`${sizeClass} rounded-full object-cover border-2 border-white shadow-sm ${
          showRing ? 'ring-2 ring-primary-200 hover:ring-primary-400 transition-all' : ''
        } ${className}`}
        onError={(e) => {
          // If image fails to load, hide it so fallback shows
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-sm ${
        showRing ? 'ring-2 ring-primary-200 hover:ring-primary-400 transition-all' : ''
      } ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
