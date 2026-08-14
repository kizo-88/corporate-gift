import React from 'react';
import { packages } from '../data/mockData';

export default function Packages({ onSelectPackage }) {
  return (
    <section id="kits" className="section-padding" style={{ backgroundColor: 'var(--bg-slate)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">READY-TO-SHIP CURATED KITS</span>
          <h2>Pre-Configured Enterprise Gift Suites</h2>
          <p>
            Complete gifting solutions tailored for onboarding, executive appreciation, global summits, and ESG eco-initiatives with volume-tiered pricing.
          </p>
        </div>

        {/* Packages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                backgroundColor: pkg.popular ? 'var(--bg-dark-secondary)' : 'var(--bg-white)',
                color: pkg.popular ? 'var(--color-text-white)' : 'var(--color-text-main)',
                border: pkg.popular ? '1px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: pkg.popular ? '0 20px 48px rgba(0,0,0,0.4)' : 'var(--shadow-card)',
                transition: 'transform 0.35s ease'
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    right: '1.75rem',
                    background: 'linear-gradient(135deg, #E5C158 0%, #C5A059 100%)',
                    color: '#0B1325',
                    padding: '0.3rem 0.95rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-gold)'
                  }}
                >
                  MOST REQUESTED
                </div>
              )}

              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    display: 'block',
                    marginBottom: '0.65rem'
                  }}
                >
                  {pkg.moq}
                </span>
                <h3
                  style={{
                    fontSize: '1.85rem',
                    fontFamily: 'var(--font-serif)',
                    color: pkg.popular ? 'var(--color-text-white)' : 'var(--color-navy)',
                    margin: '0 0 0.65rem 0'
                  }}
                >
                  {pkg.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.98rem',
                    color: pkg.popular ? 'var(--color-text-light)' : 'var(--color-text-muted)',
                    marginBottom: '2rem',
                    lineHeight: 1.6
                  }}
                >
                  {pkg.tagline}
                </p>

                {/* Included List */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)',
                      display: 'block',
                      marginBottom: '1rem'
                    }}
                  >
                    KIT CONTENTS:
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {pkg.included.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem' }}>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: pkg.popular ? 'var(--color-gold)' : 'var(--color-navy)' }}>
                    ${pkg.price}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>/ box</span>
                  <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                    ${pkg.originalPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`btn btn-full ${pkg.popular ? 'btn-gold' : 'btn-navy'}`}
                  style={{ padding: '0.9rem', fontSize: '1rem' }}
                >
                  Request Kit Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

