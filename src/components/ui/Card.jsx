import React from 'react';

export function Card({ children, className = '', style = {}, goldBorder = false, ...props }) {
  return (
    <div 
      className={`glass-card ${goldBorder ? 'glass-card-gold' : ''} ${className}`}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, style = {} }) {
  return (
    <div style={{ marginBottom: '1rem', ...style }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, style = {}, className = '' }) {
  return (
    <h3 
      className={className} 
      style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3, ...style }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, style = {} }) {
  return (
    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5, ...style }}>
      {children}
    </p>
  );
}

export function CardContent({ children, style = {} }) {
  return (
    <div style={{ flexGrow: 1, ...style }}>
      {children}
    </div>
  );
}

export function CardFooter({ children, style = {} }) {
  return (
    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', ...style }}>
      {children}
    </div>
  );
}
