// Formatting utilities for TripPAS

export const formatINR = (amount) => {
  if (!amount && amount !== 0) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

export const formatNumber = (num) => {
  return Number(num || 0).toLocaleString('en-IN');
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
};

export const formatDuration = (days) => {
  if (!days) return '';
  if (days === 1) return '1 day';
  return `${days} days`;
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const formatBudgetRange = (min, max) => {
  return `${formatINR(min)} – ${formatINR(max)}`;
};