import React from 'react';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button',
  style = {},
  ...props 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gold':
        return {
          background: 'var(--gold-gradient)',
          color: '#000000',
          fontWeight: '700',
          boxShadow: 'var(--shadow-gold)',
          border: '1px solid transparent'
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--gold-primary)',
          border: '1px solid var(--gold-primary)'
        };
      case 'secondary':
        return {
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)'
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent'
        };
      case 'emerald':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          fontWeight: '700',
          border: '1px solid transparent'
        };
      default:
        return {
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-hover)'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.4rem 0.85rem', fontSize: '0.82rem', borderRadius: 'var(--radius-sm)' };
      case 'lg':
        return { padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' };
      case 'icon':
        return { width: '40px', height: '40px', padding: 0, borderRadius: '50%' };
      default:
        return { padding: '0.65rem 1.35rem', fontSize: '0.92rem', borderRadius: 'var(--radius-md)' };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'var(--transition-bounce)',
        outline: 'none',
        whiteSpace: 'nowrap',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style
      }}
      className={`shadcn-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
