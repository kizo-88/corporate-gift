import React from 'react';

export default function About({ onBookNow }) {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '4.5rem',
            alignItems: 'center'
          }}
          className="about-grid"
        >
          {/* Left Column: Image Stack */}
          <div style={{ gridColumn: 'span 5', position: 'relative' }} className="about-left">
            <div
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-hover)',
                border: '1px solid var(--color-border)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1512290900673-700200411b51?auto=format&fit=crop&w=1000&q=80"
                alt="Lumé Studio Philosophy"
                style={{ width: '100%', height: '540px', objectFit: 'cover' }}
              />
            </div>
            {/* Small accent badge */}
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                left: '-24px',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-gold)',
                padding: '1.5rem 1.85rem',
                borderRadius: '6px',
                fontFamily: 'var(--font-serif)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-soft)'
              }}
              className="about-badge"
            >
              <span style={{ fontSize: '2.4rem', display: 'block', lineHeight: 1, fontWeight: 600 }}>EST.</span>
              <span style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>2024</span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div style={{ gridColumn: 'span 7' }} className="about-right">
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2 style={{ fontSize: '3.25rem', marginBottom: '1.75rem', color: 'var(--color-forest)' }}>
              Reclaiming Self-Care as an Effortless Daily Ritual
            </h2>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--color-warm-gray)', marginBottom: '1.5rem', lineHeight: 1.75 }}>
              Lumé Studio was founded on a simple premise: true beauty thrives when the mind and body find quiet alignment. In a world of hurried routines, we provide a peaceful haven where personalized treatment meets modern dermal science.
            </p>

            <p style={{ fontSize: '1.125rem', color: 'var(--color-warm-gray)', marginBottom: '3rem', lineHeight: 1.75 }}>
              From custom botanical hair therapies to clinical skin regeneration, our senior therapists listen carefully before crafting your experience. We remove the friction from self-care so your time remains sacred.
            </p>

            <div style={{ display: 'flex', gap: '3.5rem', marginBottom: '3rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.35rem', color: 'var(--color-forest)', fontWeight: 600, display: 'block' }}>01.</span>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', color: 'var(--color-forest)', margin: '0.3rem 0' }}>Bespoke Consultation</h4>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>Every service tailored to your skin &amp; scalp profile.</p>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.35rem', color: 'var(--color-forest)', fontWeight: 600, display: 'block' }}>02.</span>
                <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-sans)', color: 'var(--color-forest)', margin: '0.3rem 0' }}>Clean Formulations</h4>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>Paraben-free, cruelty-free organic oils &amp; serums.</p>
              </div>
            </div>

            <button onClick={onBookNow} className="btn btn-primary" style={{ padding: '1.25rem 2.85rem', fontSize: '1.1rem' }}>
              Reserve Your Ritual
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .about-left, .about-right {
            width: 100% !important;
          }
          .about-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
