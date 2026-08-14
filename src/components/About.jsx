import React from 'react';

export default function About({ onBookNow }) {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-slate)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '4rem',
            alignItems: 'center'
          }}
          className="about-grid"
        >
          {/* Left Visual */}
          <div style={{ gridColumn: 'span 5', position: 'relative' }} className="about-left">
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-hover)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Luxe Corporate Gift Craftsmanship"
                style={{ width: '100%', height: '520px', objectFit: 'cover' }}
              />
            </div>
            {/* Established Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                backgroundColor: 'var(--bg-dark-secondary)',
                color: 'var(--color-gold)',
                padding: '1.25rem 1.65rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-serif)',
                textAlign: 'center',
                boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
                border: '1px solid var(--color-gold)'
              }}
              className="about-badge"
            >
              <span style={{ fontSize: '2.2rem', display: 'block', lineHeight: 1, fontWeight: 700 }}>EST.</span>
              <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-white)' }}>2018</span>
            </div>
          </div>

          {/* Right Narrative */}
          <div style={{ gridColumn: 'span 7' }} className="about-right">
            <span className="eyebrow">OUR EXECUTIVE PHILOSOPHY</span>
            <h2 style={{ fontSize: '2.85rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>
              Transforming Corporate Gifting into a High-Impact Brand Statement
            </h2>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.75 }}>
              Aura Luxe was founded with a single mission: to replace generic corporate promotional items with memorable, heirloom-quality executive gifts that express true appreciation.
            </p>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: 1.75 }}>
              We partner with HR leaders, Executive Assistants, and Enterprise Event Planners to handle every detail — from bespoke logo debossing to white-glove multi-address fulfillment worldwide.
            </p>

            <div style={{ display: 'flex', gap: '3rem', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>01.</span>
                <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', color: 'var(--color-navy)', margin: '0.2rem 0' }}>Quality First</h4>
                <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--color-text-muted)' }}>Top-grain Italian leather, FSC bamboo, &amp; premium tech.</p>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>02.</span>
                <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', color: 'var(--color-navy)', margin: '0.2rem 0' }}>Flawless Execution</h4>
                <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--color-text-muted)' }}>Pre-production physical proofs &amp; real-time tracking.</p>
              </div>
            </div>

            <button onClick={onBookNow} className="btn btn-navy" style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem' }}>
              Consult With Our Gift Concierge
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

