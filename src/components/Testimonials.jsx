import React from 'react';
import { testimonials, clientLogos } from '../data/mockData';

export default function Testimonials() {
  const featured = testimonials.find(t => t.featured) || testimonials[0];
  const others = testimonials.filter(t => t.id !== featured.id);

  return (
    <section id="portfolio" className="section-padding" style={{ backgroundColor: 'var(--bg-slate)' }}>
      <div className="container">
        {/* Enterprise Client Logos Bar */}
        <div style={{ marginBottom: '5.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '2rem' }}>
            TRUSTED BY HR DIRECTORS &amp; EVENT EXECUTIVES AT LEADING GLOBAL BRANDS
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.8 }}>
            {clientLogos.map((logo, idx) => (
              <div key={idx} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', letterSpacing: '0.04em' }}>
                {logo.symbol}
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">CLIENT STORIES</span>
          <h2>Enterprise Case Studies &amp; Feedback</h2>
          <p>Read how leading corporate leaders leverage Aura Luxe to power their gift programs.</p>
        </div>

        {/* Featured Testimonial Hero Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-dark-secondary)',
            color: 'var(--color-text-white)',
            borderRadius: '12px',
            padding: '4rem 3.5rem',
            marginBottom: '3.5rem',
            position: 'relative',
            border: '1px solid var(--color-gold)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.3)'
          }}
          className="featured-testimonial"
        >
          <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', lineHeight: 1, marginBottom: '1rem' }}>“</div>
          
          <p
            style={{
              fontSize: '1.45rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-text-white)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '1080px',
              fontStyle: 'italic'
            }}
          >
            {featured.review}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={featured.avatar}
              alt={featured.name}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
            />
            <div>
              <h4 style={{ color: 'var(--color-text-white)', fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600, margin: 0 }}>
                {featured.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)' }}>{featured.role}</span>
                <span style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>★★★★★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Testimonial Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {others.map((item) => (
            <div
              key={item.id}
              className="card-white"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.75rem', fontSize: '1rem' }}>
                  {'★'.repeat(item.rating)}
                </div>
                <p style={{ fontSize: '1.025rem', color: 'var(--color-text-main)', fontStyle: 'italic', lineHeight: 1.65 }}>
                  “{item.review}”
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', color: 'var(--color-navy)', margin: 0, fontWeight: 600 }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-testimonial {
            padding: 2.25rem 1.5rem !important;
          }
          .featured-testimonial p {
            font-size: 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}

