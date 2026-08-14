import React from 'react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--color-text-light)', paddingTop: '5.5rem', paddingBottom: '3rem', borderTop: '1px solid var(--color-border-dark)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            marginBottom: '4.5rem'
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-white)', fontSize: '2.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #E5C158 0%, #C5A059 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0B1325',
                fontWeight: 800,
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)'
              }}>
                A
              </div>
              <span>Aura Luxe Corporate</span>
            </h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.98rem', marginBottom: '1.75rem', lineHeight: 1.7, maxWidth: '360px' }}>
              Bespoke luxury corporate gifts, custom-branded executive hampers, and multi-address fulfillment for global enterprises.
            </p>
            <button onClick={onOpenBooking} className="btn btn-gold btn-sm">
              Build Custom Quote
            </button>
          </div>

          {/* Navigation */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.25rem', fontWeight: 700 }}>
              SOLUTIONS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { name: 'Gift Catalog', href: '#catalog' },
                { name: 'Custom Branding', href: '#branding' },
                { name: 'Curated Kits', href: '#kits' },
                { name: 'Enterprise Workflow', href: '#solutions' },
                { name: 'Client Case Studies', href: '#portfolio' },
                { name: 'Inquire', href: '#contact' }
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{ color: 'var(--color-text-light)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.25s ease' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-text-light)'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.25rem', fontWeight: 700 }}>
              POPULAR CATEGORIES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', color: 'var(--color-text-light)' }}>
              <li>Executive Tech &amp; Gadgets</li>
              <li>Handcrafted Tuscan Leatherware</li>
              <li>Artisanal Wine &amp; Truffle Hampers</li>
              <li>Day-One Employee Onboarding Kits</li>
              <li>ESG Eco-Friendly &amp; Wellness Suites</li>
              <li>C-Suite VIP Legacy Chests</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', marginBottom: '1.25rem', fontWeight: 700 }}>
              CONCIERGE DESK
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
              Suite 3800, 500 Executive Pkwy, New York, NY 10022
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', margin: '0 0 0.4rem 0' }}>
              Phone: +1 (800) 589-9438
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', margin: '0 0 1.5rem 0' }}>
              Email: concierge@auraluxegifts.com
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border-dark)',
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
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)'
          }}
          className="footer-bottom"
        >
          <span>© {new Date().getFullYear()} Aura Luxe Corporate Gifting Solutions LLC. All rights reserved.</span>
          <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1rem' }}>
            Elevating Executive Relationships Through Curated Craft.
          </span>
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
            gap: 0.75rem !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

