import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBooking, onOpenAppointments, appointmentCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gift Catalog', href: '#catalog' },
    { name: 'Custom Branding', href: '#branding' },
    { name: 'Curated Kits', href: '#kits' },
    { name: 'Enterprise Solutions', href: '#solutions' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(11, 19, 37, 0.94)' : 'var(--bg-dark)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: '1px solid var(--color-border-dark)',
          transition: 'all 0.35s ease',
          padding: isScrolled ? '1rem 0' : '1.5rem 0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--color-text-white)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #E5C158 0%, #C5A059 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B1325',
              fontWeight: 800,
              fontSize: '1.25rem',
              fontFamily: 'var(--font-serif)'
            }}>
              A
            </div>
            <span>Aura Luxe</span>
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold)',
              padding: '0.2rem 0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              backgroundColor: 'rgba(212, 175, 55, 0.1)'
            }}>Corporate</span>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--color-text-light)',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.25s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-light)')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-actions">
            <button
              onClick={onOpenAppointments}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border-dark)',
                color: 'var(--color-text-white)',
                padding: '0.65rem 1.15rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.target.style.borderColor = 'var(--color-border-dark)')}
            >
              Quote List
              <span
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: '#0B1325',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                {appointmentCount}
              </span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="btn btn-gold btn-sm"
            >
              Build Custom Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--color-text-white)'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-dark-secondary)',
              borderBottom: '1px solid var(--color-border-dark)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--color-text-white)',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </a>
            ))}

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border-dark)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAppointments(); }}
                className="btn btn-outline-gold btn-full"
              >
                Quote List ({appointmentCount})
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="btn btn-gold btn-full"
              >
                Build Custom Quote
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

