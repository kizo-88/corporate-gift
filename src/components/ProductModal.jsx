import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-card glass-card-gold" 
        style={{ 
          maxWidth: '750px', 
          width: '100%', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem'
          }}
        >
          ✕
        </button>

        {/* Modal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Column: Image & Badge */}
          <div>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '280px', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="gold">{product.tag}</Badge>
              <Badge variant="emerald">MOQ: {product.moq} units</Badge>
              <Badge variant="indigo">Lead: {product.leadTime}</Badge>
            </div>
          </div>

          {/* Right Column: Specs & Details */}
          <div>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--gold-primary)', fontWeight: '700' }}>★ {product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviewsCount} corporate reviews)</span>
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--gold-primary)', marginBottom: '1rem' }}>
              ${product.price} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ unit (Volume discounts apply)</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Spec Checklist */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                Key Technical Specifications:
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {product.specs?.map((spec, i) => (
                  <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--gold-primary)' }}>✓</span> {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Palette Options */}
            {product.colors && (
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Available Base Color Finishes:
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {product.colors.map((col, idx) => (
                    <div key={idx} style={{ width: '24px', height: '24px', borderRadius: '50%', background: col, border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button 
                variant="gold" 
                style={{ flexGrow: 1 }}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                + Add Sample to Quote Cart
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
