import React, { useState } from 'react';
import { categories, products } from '../data/mockData';

export default function Services({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalog" className="section-padding" style={{ backgroundColor: 'var(--bg-slate)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">ENTERPRISE GIFT CATALOG</span>
          <h2>Bespoke Corporate Collection</h2>
          <p>
            Explore handcrafted executive gifts, leatherware, eco-luxury sets, and curated onboarding boxes customizable with your company logo and brand aesthetic.
          </p>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div style={{ maxWidth: '920px', margin: '0 auto 3.5rem auto' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="Search gifts (e.g. leather, wireless, wine, onboarding)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '3.2rem',
                height: '56px',
                fontSize: '1.05rem',
                borderRadius: '30px',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-soft)'
              }}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    borderRadius: '24px',
                    border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
                    backgroundColor: isActive ? 'var(--color-navy)' : 'var(--bg-white)',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? 'var(--shadow-gold)' : 'none'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
            <h3>No products found matching "{searchQuery}"</h3>
            <p>Try searching for another term or selecting a different category.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '2.25rem'
            }}
            className="products-grid"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="card-white"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '0',
                  overflow: 'hidden'
                }}
              >
                {/* Product Visual */}
                <div style={{ position: 'relative', height: '270px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  
                  {/* Badge & Lead Time overlay */}
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.tags && product.tags.map((tag, idx) => (
                      <span key={idx} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(11, 19, 37, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-gold)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}
                  >
                    MOQ: {product.moq} Units
                  </div>
                </div>

                {/* Product Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Lead Time: {product.leadTime}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#EAB308', fontWeight: 700 }}>
                        ★ {product.rating}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: '0 0 0.75rem 0' }}>
                      {product.name}
                    </h3>

                    <p style={{ fontSize: '0.98rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                      {product.shortDesc}
                    </p>

                    {/* Customization Options Pills */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                      {product.customization.map((c, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          fontWeight: 500
                        }}>
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--color-border-subtle)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>PRICE / UNIT</span>
                      <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-navy)' }}>
                        ${product.price} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>USD</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectService(product)}
                      className="btn btn-navy btn-sm"
                    >
                      Add to Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

