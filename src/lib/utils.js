/**
 * Utility Functions
 */

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

// Calculate days ago
export const daysAgo = (dateString) => {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  } catch {
    return null;
  }
};

// Format percentage
export const formatPercent = (value) => {
  if (typeof value !== 'number') return '0%';
  return `${value.toFixed(1)}%`;
};

// Truncate text
export const truncate = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

// Generate random corporate buzzword
export const getRandomBuzzword = () => {
  const buzzwords = [
    'synergy',
    'paradigm shift',
    'disruption',
    'innovation',
    'transformation',
    'optimization',
    'strategic initiative',
    'value proposition',
    'core competency',
    'best practice',
  ];
  return buzzwords[Math.floor(Math.random() * buzzwords.length)];
};

// Classnames helper (simple version)
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Sort applications by date
export const sortByDate = (applications, field = 'Date_Applied', order = 'desc') => {
  return [...applications].sort((a, b) => {
    const dateA = new Date(a[field] || 0);
    const dateB = new Date(b[field] || 0);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Filter applications
export const filterApplications = (applications, filters) => {
  return applications.filter(app => {
    if (filters.status && !app.Status.toLowerCase().includes(filters.status.toLowerCase())) {
      return false;
    }
    if (filters.priority && app.Priority !== filters.priority) {
      return false;
    }
    if (filters.source && app.Source !== filters.source) {
      return false;
    }
    if (filters.company && !app.Company.toLowerCase().includes(filters.company.toLowerCase())) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        app.Company.toLowerCase().includes(searchLower) ||
        app.Position_Title.toLowerCase().includes(searchLower) ||
        app.Location.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};
