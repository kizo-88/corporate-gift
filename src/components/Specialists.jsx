import React from 'react';
import { specialists } from '../data/mockData';

export default function Specialists({ onSelectSpecialist }) {
  return (
    <section id="specialists" className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">MEET OUR ARTISTS</span>
          <h2>Master Practitioners</h2>
          <p>
            Dedicated experts possessing deep clinical knowledge and an intuitive touch to deliver restorative personalized care.
          </p>
        </div>

        {/* Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3.5rem'
          }}
          className="specialists-grid"
        >
          {specialists.map((sp) => (
            <div
              key={sp.id}
              style={{
                backgroundColor: 'var(--bg-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '3rem',
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
                gap: '2.5rem',
                alignItems: 'center',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.35s ease'
              }}
              className="specialist-card"
            >
              {/* Photo */}
              <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', height: '300px' }}>
                <img
                  src={sp.image}
                  alt={sp.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 253, 248, 0.95)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span style={{ color: 'var(--color-gold)' }}>★</span> {sp.rating} ({sp.reviewsCount})
                </div>
              </div>

              {/* Bio Details */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
                        {sp.name}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {sp.role}
                      </span>
                    </div>
                    <span className="tag">{sp.experience} Exp</span>
                  </div>

                  <p style={{ fontSize: '1.025rem', color: 'var(--color-warm-gray)', marginTop: '1rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
                    {sp.intro}
                  </p>

                  <div style={{ fontSize: '0.9rem', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '1.75rem', backgroundColor: 'var(--bg-cream)', padding: '0.75rem 1.1rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-warm-gray)', fontWeight: 400 }}>Specialty: </span>
                    {sp.specialty}
                  </div>
                </div>

                <button
                  onClick={() => onSelectSpecialist(sp)}
                  className="btn btn-secondary"
                  style={{ alignSelf: 'flex-start', padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
                >
                  View Availability &amp; Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .specialists-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .specialist-card {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
