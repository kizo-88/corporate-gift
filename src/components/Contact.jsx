import React, { useState } from 'react';
import { contactDetails } from '../data/mockData';

export default function Contact() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    recipients: '50-100 Units',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Contact name is required';
    if (!formData.email.trim()) newErrors.email = 'Work email is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ company: '', name: '', email: '', phone: '', recipients: '50-100 Units', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-slate)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">ENTERPRISE INQUIRIES</span>
          <h2>Connect With Our Gift Concierge</h2>
          <p>Request custom samples, corporate catalog PDFs, or discuss bulk pricing terms with an assigned account director.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Headquarters & Details */}
          <div style={{ gridColumn: 'span 5' }} className="contact-info-col">
            <div
              className="card-white"
              style={{
                padding: '2.5rem'
              }}
            >
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
                Corporate Headquarters
              </h3>

              {/* Address */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                  NEW YORK SHOWROOM
                </span>
                <p style={{ margin: 0, color: 'var(--color-text-main)', fontWeight: 500, fontSize: '1.05rem' }}>
                  {contactDetails.address}
                </p>
              </div>

              {/* Phone & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                    DIRECT CONCIERGE LINE
                  </span>
                  <a href={`tel:${contactDetails.phone}`} style={{ color: 'var(--color-navy)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>
                    {contactDetails.phone}
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.35rem' }}>
                    ENTERPRISE EMAIL
                  </span>
                  <a href={`mailto:${contactDetails.email}`} style={{ color: 'var(--color-navy)', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.85rem' }}>
                  CONCIERGE HOURS
                </span>
                {contactDetails.hours.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>
                    <span>{h.days}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div style={{ gridColumn: 'span 7' }} className="contact-form-col">
            <div
              className="card-white"
              style={{
                padding: '2.75rem'
              }}
            >
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                Request Corporate Consultation
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Fill in your project details for an instant callback and customized proposal within 2 hours.
              </p>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--color-emerald)',
                    padding: '2.25rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    animation: 'fadeIn 0.4s ease'
                  }}
                >
                  <span style={{ fontSize: '2.5rem', color: 'var(--color-emerald)', display: 'block', marginBottom: '0.5rem' }}>✓</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-navy)', margin: 0 }}>
                    Inquiry Received!
                  </h4>
                  <p style={{ fontSize: '0.98rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                    Thank you. An Aura Luxe Corporate Concierge Director has been assigned to your request and will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corporation"
                        className="form-input"
                        style={{ borderColor: errors.company ? '#EF4444' : undefined }}
                      />
                      {errors.company && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.company}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="form-input"
                        style={{ borderColor: errors.name ? '#EF4444' : undefined }}
                      />
                      {errors.name && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.name}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. s.jenkins@acme.com"
                        className="form-input"
                        style={{ borderColor: errors.email ? '#EF4444' : undefined }}
                      />
                      {errors.email && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Recipient Volume</label>
                      <select
                        name="recipients"
                        value={formData.recipients}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="10-25">10 - 25 Gift Boxes</option>
                        <option value="25-100">25 - 100 Gift Boxes</option>
                        <option value="100-500">100 - 500 Gift Boxes</option>
                        <option value="500+">500+ Enterprise Units</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project / Event Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify event date, branding guidelines, target budget, or specific gifts desired..."
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-gold btn-full" style={{ marginTop: '0.75rem', padding: '1.1rem', fontSize: '1.05rem' }}>
                    Submit Enterprise Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .contact-info-col, .contact-form-col {
            width: 100% !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

