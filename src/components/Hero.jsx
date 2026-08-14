import React from 'react';

export default function Hero({ onBookNow, onExploreServices }) {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--color-text-white)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '4rem',
        paddingBottom: '5.5rem'
      }}
    >
      {/* Subtle Background Glow Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(11, 19, 37, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '48% 48%',
            justifyContent: 'space-between',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column */}
          <div className="hero-left">
            <span className="eyebrow">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
              ENTERPRISE &amp; EXECUTIVE GIFTING
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: 'var(--color-text-white)',
                marginTop: '0.75rem',
                marginBottom: '1.75rem',
                lineHeight: 1.1
              }}
            >
              Curated Luxury<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Corporate Gifts</span><br />
              That Elevate Your Brand.
            </h1>
            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--color-text-light)',
                marginBottom: '2.5rem',
                maxWidth: '600px',
                lineHeight: 1.75
              }}
            >
              From bespoke C-Suite mahogany hampers to precision-branded onboarding kits for distributed teams, Aura Luxe engineers unforgettable corporate gifting experiences.
            </p>
            
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onBookNow()}
                className="btn btn-gold"
                style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem' }}
              >
                Build Custom Quote
              </button>
              <a
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreServices();
                }}
                className="btn btn-outline-gold"
                style={{ padding: '1.1rem 2.2rem', fontSize: '1.05rem' }}
              >
                Explore Catalog
              </a>
            </div>

            {/* Key Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginTop: '3.5rem',
                paddingTop: '2.25rem',
                borderTop: '1px solid var(--color-border-dark)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 700, lineHeight: 1 }}>500+</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '0.4rem', display: 'block' }}>Enterprise Clients</span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 700, lineHeight: 1 }}>150k+</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '0.4rem', display: 'block' }}>Gifts Delivered</span>
              </div>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 700, lineHeight: 1 }}>99.8%</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '0.4rem', display: 'block' }}>On-Time Logistics</span>
              </div>
            </div>
          </div>

          {/* Right Column Visual */}
          <div className="hero-right" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                border: '1px solid var(--color-border)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80"
                alt="Aura Luxe Corporate Gifting Packaging"
                style={{
                  width: '100%',
                  height: '580px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Glassmorphic Overlay Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(16px)',
                  padding: '1.5rem 2rem',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>BESPOKE LOGO BRANDING</span>
                  <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-white)', margin: '0.2rem 0 0 0' }}>Laser Engraving &amp; Foil Debossing</h4>
                </div>
                <div style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--color-gold)',
                  fontSize: '0.85rem',
                  color: 'var(--color-gold)',
                  fontWeight: 600
                }}>
                  Zero MOQ Pressure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .hero-left, .hero-right {
            width: 100% !important;
          }
          .hero-right img {
            height: 420px !important;
          }
        }
      `}</style>
    </section>
  );
}

