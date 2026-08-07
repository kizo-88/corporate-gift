import React from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onOpenInquiry }) {
  if (!isOpen) return null;

  const totalEstimate = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '450px', 
          width: '100%', 
          height: '100vh', 
          borderRadius: '0', 
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-gold)',
          animation: 'slideLeft 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Sample Quote Cart
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} Selected
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.25rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Drawer Item List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto 1rem auto' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p style={{ fontWeight: '600' }}>Your sample quote cart is empty</p>
              <p style={{ fontSize: '0.82rem', marginTop: '0.4rem' }}>Browse our catalog or use the Custom Kitting Studio to add items.</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div 
                key={item.id + '-' + index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '54px', height: '54px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: '600' }}>${item.price}</div>
                  {item.isCustomBox && (
                    <Badge variant="gold" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>Custom Hamper Box</Badge>
                  )}
                </div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    padding: '0.4rem'
                  }}
                  title="Remove item"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: '800' }}>
              <span>Estimated Sample Value:</span>
              <span style={{ color: 'var(--gold-primary)' }}>${totalEstimate}.00</span>
            </div>

            <Button 
              variant="gold" 
              style={{ width: '100%', marginBottom: '0.75rem' }}
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
            >
              Submit Official Proposal Request →
            </Button>

            <Button 
              variant="secondary" 
              style={{ width: '100%' }}
              onClick={() => alert('Sample Quotation PDF exported to downloads!')}
            >
              📄 Export Instant PDF Summary
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
