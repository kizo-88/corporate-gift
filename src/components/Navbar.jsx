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
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Specialists', href: '#specialists' },
    { name: 'Packages', href: '#packages' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
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
          backgroundColor: isScrolled ? 'rgba(255, 253, 248, 0.96)' : 'var(--bg-cream)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition: 'all 0.35s ease',
          padding: isScrolled ? '1.15rem 0' : '1.75rem 0',
          minHeight: isScrolled ? '88px' : '98px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.25rem',
              fontWeight: 600,
              color: 'var(--color-forest)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic', fontWeight: 400, fontSize: '2.35rem' }}>Lumé</span>
            <span style={{ textTransform: 'uppercase', fontSize: '1.1rem', letterSpacing: '0.18em', fontWeight: 700, color: 'var(--color-forest)' }}>Studio</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.75rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'color 0.25s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-forest)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--color-charcoal)')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="desktop-actions">
            {appointmentCount > 0 && (
              <button
                onClick={onOpenAppointments}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-forest)',
                  padding: '0.75rem 1.35rem',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Appointments
                <span
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}
                >
                  {appointmentCount}
                </span>
              </button>
            )}

            <button
              onClick={() => onOpenBooking()}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
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
              color: 'var(--color-forest)'
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
              backgroundColor: 'var(--bg-ivory)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.75rem 2rem 2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.35rem',
              boxShadow: 'var(--shadow-hover)'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: 'var(--color-forest)',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </a>
            ))}

            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {appointmentCount > 0 && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAppointments(); }}
                  className="btn btn-secondary btn-full"
                >
                  My Appointments ({appointmentCount})
                </button>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
                className="btn btn-primary btn-full"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Responsive Inline CSS rules for Navbar */}
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
