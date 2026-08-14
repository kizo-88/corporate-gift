import React from 'react';
import { whyChooseUs, customizationMethods } from '../data/mockData';

export default function WhyChooseLume() {
  const icons = [
    // Dedicated Concierge
    <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>,
    // Multi-Address Global Logistics
    <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    // 100% Brand Consistency
    <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    // Flexible MOQs
    <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>,
    // Instant Invoicing & Net-30
    <svg key="5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="8" x2="10" y2="8" />
      <line x1="6" y1="12" x2="14" y2="12" />
    </svg>
  ];

  return (
    <section id="branding" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--color-text-white)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">PRECISION BRANDING</span>
          <h2 style={{ color: 'var(--color-text-white)' }}>Impeccable Logo Customization</h2>
          <p style={{ color: 'var(--color-text-light)' }}>
            Every corporate gift is customized using state-of-the-art debossing, laser engraving, and custom full-color sleeve printing to honor your brand guidelines.
          </p>
        </div>

        {/* Customization Techniques Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '5rem'
          }}
        >
          {customizationMethods.map((m) => (
            <div
              key={m.id}
              className="card-dark"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--color-gold)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  marginBottom: '1.2rem'
                }}>
                  METHOD
                </div>
                <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text-white)', marginBottom: '0.75rem' }}>
                  {m.name}
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {m.description}
                </p>
              </div>
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border-dark)', fontSize: '0.825rem', color: 'var(--color-gold)' }}>
                <strong>Best For:</strong> {m.bestFor}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Value Pillars Header */}
        <div className="section-header" style={{ marginBottom: '3.5rem' }}>
          <span className="eyebrow">THE AURA LUXE PROMISE</span>
          <h2 style={{ color: 'var(--color-text-white)', fontSize: '2.4rem' }}>Built For Global Enterprise Standards</h2>
        </div>

        {/* 5 Enterprise Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {whyChooseUs.map((item, idx) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '2.25rem 1.5rem',
                borderRadius: '10px',
                border: '1px solid var(--color-border-dark)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(212, 175, 55, 0.12)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--color-border)'
                }}
              >
                {icons[idx % icons.length]}
              </div>

              <h4
                style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-text-white)',
                  marginBottom: '0.65rem'
                }}
              >
                {item.title}
              </h4>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

