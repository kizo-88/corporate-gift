import React from 'react';
import { testimonials } from '../data/mockData';

export default function Testimonials() {
  const featured = testimonials.find(t => t.featured) || testimonials[0];
  const others = testimonials.filter(t => t.id !== featured.id);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">CLIENT STORIES</span>
          <h2>Words of Renewal</h2>
          <p>Read authentic reflections from our cherished guests after their Lumé Studio rituals.</p>
        </div>

        {/* Featured Testimonial Hero Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-forest)',
            color: 'var(--bg-ivory)',
            borderRadius: '8px',
            padding: '4.5rem 4rem',
            marginBottom: '3.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-hover)'
          }}
          className="featured-testimonial"
        >
          <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', lineHeight: 1, marginBottom: '1.25rem' }}>“</div>
          
          <p
            style={{
              fontSize: '1.65rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--bg-ivory)',
              lineHeight: 1.6,
              marginBottom: '3rem',
              maxWidth: '1080px',
              fontStyle: 'italic'
            }}
          >
            {featured.review}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img
              src={featured.avatar}
              alt={featured.name}
              style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
            />
            <div>
              <h4 style={{ color: 'var(--bg-ivory)', fontSize: '1.35rem', fontFamily: 'var(--font-sans)', fontWeight: 600, margin: 0 }}>
                {featured.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-gold-light)' }}>{featured.service}</span>
                <span style={{ color: 'var(--color-gold)', fontSize: '1.1rem' }}>★★★★★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Testimonial Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {others.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-cream)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '2.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.85rem', fontSize: '1.05rem' }}>
                  {'★'.repeat(item.rating)}
                </div>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-charcoal)', fontStyle: 'italic', lineHeight: 1.7 }}>
                  “{item.review}”
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-sans)', color: 'var(--color-forest)', margin: 0, fontWeight: 600 }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-warm-gray)' }}>{item.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-testimonial {
            padding: 2.5rem 1.75rem !important;
          }
          .featured-testimonial p {
            font-size: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
