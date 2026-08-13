import React from 'react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer style={{ backgroundColor: 'var(--color-forest)', color: 'var(--bg-cream)', paddingTop: '6.5rem', paddingBottom: '3.5rem' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '4rem',
            marginBottom: '5rem'
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--bg-ivory)', fontSize: '2.35rem', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Lumé</span> Studio
            </h3>
            <p style={{ color: 'rgba(247, 241, 231, 0.8)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.75, maxWidth: '360px' }}>
              Your Time. Your Ritual. Your Glow. Dedicated to bespoke beauty treatments and serene wellness experiences in Kuala Lumpur.
            </p>
            <button onClick={onOpenBooking} className="btn btn-gold" style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}>
              Book Appointment
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem', fontWeight: 700 }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {['Home', 'Services', 'Specialists', 'Packages', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{ color: 'rgba(247, 241, 231, 0.85)', textDecoration: 'none', fontSize: '1.025rem', transition: 'color 0.25s ease' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(247, 241, 231, 0.85)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment Menu */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem', fontWeight: 700 }}>
              SERVICES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '1.025rem', color: 'rgba(247, 241, 231, 0.85)' }}>
              <li>Signature Glow Facial</li>
              <li>Aromatherapy Massage</li>
              <li>Botanical Hair Spa</li>
              <li>Luxury Spa Manicure</li>
              <li>Precision Brow Sculpting</li>
              <li>Holistic Wellness Ritual</li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem', fontWeight: 700 }}>
              HOURS &amp; ADDRESS
            </h4>
            <p style={{ fontSize: '1rem', color: 'rgba(247, 241, 231, 0.85)', margin: '0 0 1.25rem 0', lineHeight: 1.6 }}>
              18, Jalan Telawi 3, Bangsar, 59100 Kuala Lumpur
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 231, 0.75)', margin: '0 0 0.5rem 0' }}>
              Mon – Fri: 10:00 AM – 8:00 PM
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(247, 241, 231, 0.75)', margin: '0 0 1.75rem 0' }}>
              Sat – Sun: 9:00 AM – 7:00 PM
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid rgba(198, 161, 91, 0.45)',
                    color: 'var(--color-gold)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(247, 241, 231, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.95rem',
            color: 'rgba(247, 241, 231, 0.65)'
          }}
          className="footer-bottom"
        >
          <span>© {new Date().getFullYear()} Lumé Studio. All rights reserved.</span>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-light)', fontSize: '1.05rem' }}>Your Time. Your Ritual. Your Glow.</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .footer-col {
            width: 100% !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 0.85rem !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
