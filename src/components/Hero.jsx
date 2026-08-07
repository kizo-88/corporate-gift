import React from 'react';

export default function Hero({ onOpenInquiry }) {
  return (
    <section style={{ position: 'relative', padding: '5rem 0 4rem 0', overflow: 'hidden' }}>
      
      {/* Background Radial Glow */}
      <div 
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, var(--gold-glow) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Hero Left Text Column */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }} className="badge badge-gold">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Premier Corporate Branding & Executive Gifting</span>
            </div>

            <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Elevate Every <br />
              <span className="text-gold-gradient">Corporate Impression</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: '1.7' }}>
              Handcrafted executive gift hampers, laser-engraved tech sets, and bespoke employee onboarding kits. Designed to inspire loyalty and commemorate milestones.
            </p>

            {/* CTA Action Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <a href="#builder" className="btn btn-gold btn-lg">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Build Custom Box
              </a>

              <a href="#calculator" className="btn btn-secondary btn-lg">
                <svg width="20" height="20" fill="none" stroke="var(--gold-primary)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Instant Pricing Calculator
              </a>
            </div>

            {/* Stat Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>50,000+</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Gifts Shipped Worldwide</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)' }}>99.8%</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>On-Time Corporate Delivery</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--emerald-primary)', fontFamily: 'var(--font-serif)' }}>4.9 / 5.0</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>From 350+ Global Clients</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card glass-card-gold animate-float" style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80" 
                alt="Luxury Corporate Gift Box"
                style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: 'calc(var(--radius-lg) - 4px)' }}
              />

              {/* Floating Badge Overlay */}
              <div 
                className="glass-card" 
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  left: '25px',
                  right: '25px',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid var(--border-gold)'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--gold-primary)' }}>
                  <svg width="24" height="24" fill="none" stroke="var(--gold-primary)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>Executive Reserve Hamper</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Laser Engraved & Metallic Foil Stamping Available</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
