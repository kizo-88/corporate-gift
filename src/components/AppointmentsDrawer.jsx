import React from 'react';

export default function AppointmentsDrawer({ isOpen, onClose, appointments = [], onCancelBooking, onBookNew }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-white)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          borderRadius: '12px',
          padding: '2.25rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          border: '1px solid var(--color-border-subtle)',
          overflowY: 'auto'
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>PROPOSAL CART</span>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: 0 }}>
              Active Corporate Quotes
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--color-navy)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Quotes List */}
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <span style={{ fontSize: '2.5rem', color: 'var(--color-gold)', display: 'block', marginBottom: '0.75rem' }}>✧</span>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.25rem', margin: 0 }}>
              No Active Proposals Saved
            </h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
              Build an instant custom corporate quote or request a physical sample box today.
            </p>
            <button
              onClick={() => { onClose(); onBookNew(); }}
              className="btn btn-gold btn-sm"
            >
              Build Custom Quote
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {appointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: 'var(--bg-slate)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '8px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                      PROPOSAL #{apt.id}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: '0.2rem 0' }}>
                      {apt.service?.name || apt.product?.name}
                    </h4>
                  </div>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--color-navy)' }}>
                    ${apt.grandTotal ? apt.grandTotal.toLocaleString() : apt.service?.price}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-navy)' }}>Quantity:</strong><br />
                    {apt.quantity || 25} Gift Boxes
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-navy)' }}>Company:</strong><br />
                    {apt.company?.companyName || apt.customer?.name}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-navy)' }}>Branding:</strong><br />
                    {apt.selectedBranding?.join(', ') || 'Laser Engraving'}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-navy)' }}>Contact Email:</strong><br />
                    {apt.customer?.email}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>
                    Created: {new Date(apt.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onCancelBooking(apt.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Remove Quote
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => { onClose(); onBookNew(); }}
              className="btn btn-navy btn-full"
              style={{ marginTop: '0.75rem' }}
            >
              Build Another Proposal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

