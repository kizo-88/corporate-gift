import React from 'react';

export default function Footer({ onOpenInquiry }) {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '4rem 0 2rem 0' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '3rem', marginBottom: '3.5rem' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>
                G
              </div>
              <span className="font-serif" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                GIFTORA
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              The premier executive corporate gifting platform. Specializing in bespoke employee welcome kits, artisanal gift hampers, and precision branded merchandise.
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: '700' }}>
              ✦ ISO 9001 Quality Certified Corporate Supplier
            </div>
          </div>

          {/* Col 2: Catalog Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Collections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Executive Tech Sets</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Onboarding Welcome Kits</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Artisanal Food Hampers</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Sustainable Eco Goods</a></li>
              <li><a href="#catalog" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Drinkware</a></li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Services & Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><a href="#builder" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Kitting Studio</a></li>
              <li><a href="#calculator" style={{ color: 'inherit', textDecoration: 'none' }}>Instant Quote Estimator</a></li>
              <li><button onClick={onOpenInquiry} style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', font: 'inherit' }}>Request Sample Kit</button></li>
              <li><a href="#clients" style={{ color: 'inherit', textDecoration: 'none' }}>Corporate Client Stories</a></li>
            </ul>
          </div>

          {/* Col 4: Concierge Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Corporate Concierge</h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div><strong>Hotline:</strong> +1 (800) 555-GIFT</div>
              <div><strong>Email:</strong> concierge@giftora-corporate.com</div>
              <div><strong>Showroom:</strong> 500 Fifth Avenue, Suite 4200, New York, NY</div>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={onOpenInquiry} className="btn btn-gold btn-sm" style={{ width: '100%' }}>
                  Contact Account Mgr
                </button>
              </div>
            </div>
          </div>

        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <div>© {new Date().getFullYear()} GIFTORA Premium Corporate Branding Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Corporate Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
