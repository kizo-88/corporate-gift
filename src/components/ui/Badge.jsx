import React from 'react';

export function Badge({ children, variant = 'gold', className = '', style = {} }) {
  const getBadgeClass = () => {
    switch (variant) {
      case 'emerald': return 'badge-emerald';
      case 'indigo': return 'badge-indigo';
      case 'gold':
      default: return 'badge-gold';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()} ${className}`} style={style}>
      {children}
    </span>
  );
}
