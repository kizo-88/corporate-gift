import React from 'react';

export default function Hero({ onBookNow, onExploreServices }) {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: 'var(--bg-cream)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3.5rem',
        paddingBottom: '5rem'
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 51%',
            justifyContent: 'space-between',
            gap: '4rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column - Headline & CTA */}
          <div className="hero-left">
            <span className="eyebrow">PREMIUM BEAUTY &amp; WELLNESS</span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                color: 'var(--color-forest)',
                marginTop: '0.75rem',
                marginBottom: '2rem',
                lineHeight: 1.05
              }}
            >
              Your Time.<br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Your Ritual.</span><br />
              Your Glow.
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--color-warm-gray)',
                marginBottom: '3rem',
                maxWidth: '620px',
                lineHeight: 1.75
              }}
            >
              Lumé Studio delivers tailored beauty, hair, skin, and spa rituals crafted with precision. Reclaim your stillness in a serene space dedicated entirely to your renewal.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onBookNow()}
                className="btn btn-primary"
                style={{ padding: '1.25rem 2.85rem', fontSize: '1.1rem' }}
              >
                Book an Appointment
              </button>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreServices();
                }}
                className="btn btn-secondary"
                style={{ padding: '1.25rem 2.6rem', fontSize: '1.1rem' }}
              >
                Explore Services
              </a>
            </div>

            {/* Subtle Key Highlights */}
            <div
              style={{
                display: 'flex',
                gap: '3.5rem',
                marginTop: '4rem',
                paddingTop: '2.5rem',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--color-forest)', fontWeight: 600 }}>100%</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Organic Formulations</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '3.5rem' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--color-forest)', fontWeight: 600 }}>Private</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Treatment Suites</span>
              </div>
            </div>
          </div>

          {/* Right Column - Large Premium Spa Visual */}
          <div className="hero-right" style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-hover)',
                border: '1px solid var(--color-border)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"
                alt="Lumé Studio Spa Sanctuary"
                style={{
                  width: '100%',
                  height: '660px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {/* Subtle overlay accent card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: '2.5rem',
                  right: '2.5rem',
                  backgroundColor: 'rgba(255, 253, 248, 0.94)',
                  backdropFilter: 'blur(16px)',
                  padding: '1.65rem 2.25rem',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>CURATED EXPERIENCE</span>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: '0.3rem 0 0 0' }}>Botanical Aromatherapy &amp; Dermal Care</h4>
                </div>
                <div style={{ fontSize: '1.85rem', color: 'var(--color-forest)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>✧</div>
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
            height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}
