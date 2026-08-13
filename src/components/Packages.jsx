import React from 'react';
import { packages } from '../data/mockData';

export default function Packages({ onSelectPackage }) {
  return (
    <section id="packages" className="section-padding" style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">SAVINGS &amp; COMBINATIONS</span>
          <h2>Curated Sanctuary Packages</h2>
          <p>
            Immerse yourself in complete ritual care with our signature treatment pairings designed for optimal renewal and effortless savings.
          </p>
        </div>

        {/* Packages Grid (3 cards per row on large desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                backgroundColor: pkg.popular ? 'var(--color-forest)' : 'var(--bg-cream)',
                color: pkg.popular ? 'var(--bg-ivory)' : 'var(--color-charcoal)',
                border: pkg.popular ? '1px solid var(--color-forest)' : '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: pkg.popular ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                transition: 'transform 0.35s ease'
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    right: '2rem',
                    backgroundColor: 'var(--color-gold)',
                    color: '#fff',
                    padding: '0.35rem 1.1rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '3px'
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: pkg.popular ? 'var(--color-gold-light)' : 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '0.65rem'
                  }}
                >
                  {pkg.duration} EXPERIENCE
                </span>
                <h3
                  style={{
                    fontSize: '2.25rem',
                    fontFamily: 'var(--font-serif)',
                    color: pkg.popular ? 'var(--bg-ivory)' : 'var(--color-forest)',
                    margin: '0 0 0.65rem 0'
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  style={{
                    fontSize: '1.05rem',
                    color: pkg.popular ? 'rgba(255,253,248,0.85)' : 'var(--color-warm-gray)',
                    marginBottom: '2.5rem'
                  }}
                >
                  {pkg.tagline}
                </p>

                {/* Included List */}
                <div style={{ marginBottom: '3rem' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: pkg.popular ? 'var(--color-gold-light)' : 'var(--color-forest)',
                      display: 'block',
                      marginBottom: '1.25rem'
                    }}
                  >
                    INCLUDED TREATMENTS:
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                    {pkg.included.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.05rem' }}>
                        <span style={{ color: pkg.popular ? 'var(--color-gold)' : 'var(--color-forest)', fontSize: '1.15rem' }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '2.65rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: pkg.popular ? 'var(--bg-ivory)' : 'var(--color-forest)' }}>
                    RM {pkg.price}
                  </span>
                  <span style={{ fontSize: '1.15rem', textDecoration: 'line-through', color: pkg.popular ? 'rgba(255,253,248,0.5)' : 'var(--color-warm-gray)' }}>
                    RM {pkg.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`btn btn-full ${pkg.popular ? 'btn-gold' : 'btn-primary'}`}
                  style={{ padding: '1.1rem', fontSize: '1.05rem' }}
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
