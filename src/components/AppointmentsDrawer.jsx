import React from 'react';

export default function AppointmentsDrawer({ isOpen, onClose, appointments = [], onCancelBooking, onBookNew }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-ivory)',
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          borderRadius: '6px',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-hover)',
          border: '1px solid var(--color-border)',
          overflowY: 'auto'
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>YOUR RITUALS</span>
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
              Confirmed Appointments
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--color-forest)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <span style={{ fontSize: '2.5rem', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem' }}>✧</span>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', fontSize: '1.3rem', margin: 0 }}>
              No Active Appointments
            </h4>
            <p style={{ fontSize: '0.925rem', color: 'var(--color-warm-gray)', marginTop: '0.5rem', marginBottom: '2rem' }}>
              You haven't reserved any rituals yet. Treat yourself today.
            </p>
            <button
              onClick={() => { onClose(); onBookNew(); }}
              className="btn btn-primary btn-sm"
            >
              Book an Appointment
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {appointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: 'var(--bg-cream)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                      CONFIRMED BOOKING
                    </span>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: '0.2rem 0' }}>
                      {apt.service.name}
                    </h4>
                  </div>
                  <span style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-forest)' }}>
                    RM {apt.service.price}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-warm-gray)', marginBottom: '1.25rem' }}>
                  <div>
                    <strong style={{ color: 'var(--color-forest)' }}>Specialist:</strong><br />
                    {apt.specialist.name} ({apt.specialist.role})
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-forest)' }}>Date &amp; Time:</strong><br />
                    {apt.date} at {apt.time}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-forest)' }}>Duration:</strong><br />
                    {apt.service.duration || '60 mins'}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-forest)' }}>Client:</strong><br />
                    {apt.customer.name}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-forest)', fontWeight: 600 }}>
                    Booking Ref: #{apt.id}
                  </span>
                  <button
                    onClick={() => onCancelBooking(apt.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#d9534f',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => { onClose(); onBookNew(); }}
              className="btn btn-primary btn-full"
              style={{ marginTop: '1rem' }}
            >
              Book Another Ritual
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
