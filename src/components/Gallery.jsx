import React from 'react';
import { galleryImages } from '../data/mockData';

export default function Gallery() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">CRAFTSMANSHIP &amp; UNBOXING</span>
          <h2>Luxury Packaging Showcase</h2>
          <p>
            Experience the unboxing detail of our custom embossed boxes, foil stamped satin ribbons, laser engraved metalware, and hand-sealed executive letters.
          </p>
        </div>

        {/* Large Visual Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.75rem'
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
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '420px',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid var(--color-border-subtle)'
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
                    background: 'linear-gradient(to top, rgba(11, 19, 37, 0.92), transparent)',
                    color: 'var(--color-text-white)'
                  }}
                >
                  <h4 style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: 0 }}>
                    {img.title}
                  </h4>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-gold)', letterSpacing: '0.06em' }}>
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

