import React, { useState, useMemo } from 'react';

export default function ProductCatalog({ 
  products, 
  categories, 
  onSelectProduct, 
  onAddToCart,
  searchTerm
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(160);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'moq') return a.moq - b.moq;
      return b.rating - a.rating;
    });
  }, [products, activeCategory, maxPrice, searchTerm, sortBy]);

  return (
    <section id="catalog" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textBaseline: 'center', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>Curated Corporate Collection</span>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Gifts Crafted for <span className="text-gold-gradient">Impact</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Every item in our collection is selected for superior build quality, luxury packaging options, and full brand customization capability.
          </p>
        </div>

        {/* Filter & Sorting Toolbar */}
        <div className="glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`btn btn-sm ${activeCategory === cat.id ? 'btn-gold' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Price Slider & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            
            {/* Price Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Max Price:</span>
              <input 
                type="range" 
                min="30" 
                max="160" 
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ accentColor: 'var(--gold-primary)', cursor: 'pointer', width: '140px' }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--gold-primary)' }}>${maxPrice} / unit</span>
            </div>

            {/* Sort Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="moq">Lowest MOQ</option>
              </select>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <svg width="48" height="48" fill="none" stroke="var(--gold-primary)" viewBox="0 0 24 24" style={{ margin: '0 auto 1rem auto' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No matching corporate gifts found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search terms or expanding the price range filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="glass-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}
              >
                {/* Image Container with Badges */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1.00)'}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className="badge badge-gold">{product.tag}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge" style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      MOQ: {product.moq} pcs
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  {/* Rating Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <div style={{ color: 'var(--gold-primary)', fontSize: '0.85rem' }}>★ {product.rating}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({product.reviewsCount} corporate reviews)</div>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-primary)', lineHeight: '1.35' }}>
                    {product.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                  </p>

                  {/* Price & Lead Time */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Unit Price</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--gold-primary)' }}>${product.price}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / ea</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Lead Time</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{product.leadTime}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    <button 
                      onClick={() => onSelectProduct(product)}
                      className="btn btn-secondary btn-sm"
                    >
                      Quick Specs
                    </button>

                    <button 
                      onClick={() => onAddToCart(product)}
                      className="btn btn-gold btn-sm"
                    >
                      + Sample Quote
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
