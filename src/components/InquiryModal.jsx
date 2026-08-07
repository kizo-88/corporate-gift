import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export default function InquiryModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    workEmail: '',
    phone: '',
    quantity: '100-250 pcs',
    targetDate: '2026-09-15',
    logoUploaded: false,
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (window.confetti) {
      window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="glass-card glass-card-gold" 
        style={{ 
          maxWidth: '560px', 
          width: '100%', 
          padding: '2.25rem',
          position: 'relative',
          background: 'var(--bg-secondary)'
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
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--emerald-glow)', border: '2px solid var(--emerald-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--emerald-primary)', fontSize: '2rem' }}>
              ✓
            </div>
            <Badge variant="emerald" style={{ marginBottom: '0.75rem' }}>Proposal Request Received</Badge>
            <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Thank You!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: '1.6' }}>
              Our Executive Branding Concierge will review your order requirements and send a customized digital mockup & formal quotation to <strong>{formData.workEmail || 'your email'}</strong> within 4 business hours.
            </p>
            <Button variant="gold" onClick={onClose} style={{ width: '100%' }}>
              Back to Corporate Catalog
            </Button>
          </div>
        ) : (
          <div>
            
            <div style={{ marginBottom: '1.75rem' }}>
              <Badge variant="gold" style={{ marginBottom: '0.5rem' }}>Official RFP / Quote Request</Badge>
              <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Request Corporate Proposal
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Fill out the details below to receive custom logo mockups and volume volume discounts.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
              {step === 1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Company / Organization Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Apex Global Tech"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Corporate Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Work Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <Button variant="gold" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setStep(2)}>
                    Next: Order Specifications →
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Estimated Order Quantity Tier
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    >
                      <option value="25-50 pcs">25 - 50 units</option>
                      <option value="50-100 pcs">50 - 100 units</option>
                      <option value="100-250 pcs">100 - 250 units (15% OFF)</option>
                      <option value="250-500 pcs">250 - 500 units (20% OFF)</option>
                      <option value="500+ pcs">500+ units (25% OFF VIP)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Target In-Hand Delivery Date
                    </label>
                    <input 
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Drag and Drop Logo Upload Simulation */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Upload Vector Logo (.AI, .EPS, .SVG, .PNG)
                    </label>
                    <div 
                      onClick={() => setFormData({ ...formData, logoUploaded: true })}
                      style={{
                        border: '2px dashed var(--border-gold)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                        textAlign: 'center',
                        background: formData.logoUploaded ? 'var(--gold-glow)' : 'var(--bg-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {formData.logoUploaded ? (
                        <div style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.88rem' }}>
                          ✓ Vector Logo Attached (logo_brand_v2.ai)
                        </div>
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          Drag and drop vector logo here or click to simulate upload
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      ← Back
                    </Button>
                    <Button variant="gold" type="submit" style={{ flexGrow: 1 }}>
                      Submit Official Proposal Request
                    </Button>
                  </div>

                </div>
              )}

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
