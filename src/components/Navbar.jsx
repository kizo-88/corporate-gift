import React, { useState } from 'react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenInquiry, 
  theme, 
  onToggleTheme,
  searchTerm,
  onSearchChange
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300" style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Emblem */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-gold)',
            color: '#000',
            fontWeight: '800',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-serif)'
          }}>
            G
          </div>
          <div>
            <span className="font-serif" style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              GIFTORA
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: '700' }}>
              Corporate Luxury
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <a href="#catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'var(--transition-fast)' }}>
            Catalog
          </a>
          <a href="#builder" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'var(--transition-fast)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>Studio</span>
            Kitting Builder
          </a>
          <a href="#calculator" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'var(--transition-fast)' }}>
            Bulk Calculator
          </a>
          <a href="#clients" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'var(--transition-fast)' }}>
            Clients & Proof
          </a>
        </nav>

        {/* Right Action Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Quick Search Input */}
          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search gifts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1rem 0.5rem 2.2rem',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '170px',
                transition: 'var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.width = '230px'}
              onBlur={(e) => e.target.style.width = '170px'}
            />
            <svg style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          {/* Theme Switcher Button */}
          <button 
            onClick={onToggleTheme}
            className="btn-secondary"
            title="Toggle Light/Dark Theme"
            style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" fill="none" stroke="var(--gold-primary)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" stroke="var(--text-primary)" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Cart Drawer Trigger Button */}
          <button 
            onClick={onOpenCart}
            className="btn-secondary"
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span style={{ fontSize: '0.85rem' }}>Sample Quote</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--gold-gradient)',
                color: '#000',
                fontSize: '0.75rem',
                fontWeight: '800',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-gold)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary RFP Button */}
          <button onClick={onOpenInquiry} className="btn btn-gold btn-sm">
            Request Proposal
          </button>
        </div>

      </div>
    </header>
  );
}
