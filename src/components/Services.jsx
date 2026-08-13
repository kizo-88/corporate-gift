import React, { useState } from 'react';
import { categories, services } from '../data/mockData';

export default function Services({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">OUR CURATED MENU</span>
          <h2>Bespoke Treatments &amp; Rituals</h2>
          <p>
            Every treatment is tailored to your unique skin type, body alignment, and personal beauty goals using organic botanical preparations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '4.5rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.8rem 1.75rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: '30px',
                  border: isActive ? '1px solid var(--color-forest)' : '1px solid var(--color-border)',
                  backgroundColor: isActive ? 'var(--color-forest)' : 'var(--bg-cream)',
                  color: isActive ? 'var(--bg-ivory)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Services Grid (3 columns on large desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
            gap: '2.5rem'
          }}
          className="services-grid"
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-ivory"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-cream)'
              }}
            >
              {/* Image Banner */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    backgroundColor: 'rgba(31, 74, 60, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--bg-ivory)',
                    padding: '0.45rem 1rem',
                    borderRadius: '3px',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  {service.duration}
                </div>
              </div>

              {/* Service Details */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: '0 0 0.85rem 0' }}>
                    {service.name}
                  </h3>

                  <p style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', marginBottom: '2rem', lineHeight: 1.65 }}>
                    {service.shortDesc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-warm-gray)', display: 'block', fontWeight: 600 }}>INVESTMENT</span>
                    <span style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-forest)' }}>
                      RM {service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="btn btn-primary"
                    style={{ padding: '0.85rem 1.65rem', fontSize: '0.95rem' }}
                  >
                    Book Treatment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
