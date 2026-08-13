import React from 'react';
import { galleryImages } from '../data/mockData';

export default function Gallery() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">STUDIO ATMOSPHERE</span>
          <h2>A Glimpse Into Lumé</h2>
          <p>
            An aesthetic sanctuary meticulously crafted with warm natural textures, acoustic silence, and gentle ambient light.
          </p>
        </div>

        {/* Large Editorial Visual Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem'
          }}
          className="gallery-grid"
        >
          {galleryImages.map((img, idx) => {
            const colSpan = idx === 0 || idx === 3 ? 'span 7' : 'span 5';
            return (
              <div
                key={idx}
                style={{
                  gridColumn: colSpan,
                  position: 'relative',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  height: '440px',
                  boxShadow: 'var(--shadow-card)'
                }}
                className="gallery-item"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2.5rem 2rem 1.5rem 2rem',
                    background: 'linear-gradient(to top, rgba(31, 74, 60, 0.9), transparent)',
                    color: 'var(--bg-ivory)'
                  }}
                >
                  <h4 style={{ color: 'var(--bg-ivory)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>
                    {img.title}
                  </h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-gold-light)', letterSpacing: '0.06em' }}>
                    {img.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .gallery-item {
            width: 100% !important;
            height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
}
