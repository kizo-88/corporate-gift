import React from 'react';
import { whyChooseUs } from '../data/mockData';

export default function WhyChooseLume() {
  const icons = [
    // Experienced Specialists (User / Award icon)
    <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" />
      <circle cx="12" cy="7" r="4" />
    </svg>,
    // Premium Products (Flower / Leaf)
    <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.46.05-.91.14-1.35 1.5.54 3.12.85 4.86.85 5.52 0 10-4.48 10-10 0-.46-.05-.91-.14-1.35C20.36 10.69 20 11.31 20 12c0 4.41-3.59 8-8 8z" />
    </svg>,
    // Personalized Treatments (Sparkle / Heart)
    <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>,
    // Easy Online Booking (Calendar / Clock)
    <svg key="4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>,
    // Calm & Comfortable Environment (Feather / Sun)
    <svg key="5" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">THE LUMÉ DIFFERENCE</span>
          <h2>Designed Around Your Stillness</h2>
          <p>
            We elevate daily self-care into an effortless, serene ritual grounded in expertise and soothing comfort.
          </p>
        </div>

        {/* 5 Pillar Columns Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {whyChooseUs.map((item, idx) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--bg-ivory)',
                padding: '2.75rem 2rem',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-soft)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-cream)',
                  color: 'var(--color-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                  border: '1px solid var(--color-border)'
                }}
              >
                {icons[idx % icons.length]}
              </div>

              <h4
                style={{
                  fontSize: '1.45rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-forest)',
                  marginBottom: '0.85rem'
                }}
              >
                {item.title}
              </h4>

              <p style={{ fontSize: '1rem', color: 'var(--color-warm-gray)', lineHeight: 1.65 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
