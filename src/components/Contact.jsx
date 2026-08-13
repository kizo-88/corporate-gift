import React, { useState } from 'react';
import { contactDetails } from '../data/mockData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>Connect With Lumé</h2>
          <p>Have a special inquiry or group booking request? We warmly welcome your message.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '4rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Contact Details & Hours */}
          <div style={{ gridColumn: 'span 5' }} className="contact-info-col">
            <div
              style={{
                backgroundColor: 'var(--bg-ivory)',
                padding: '3rem',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1.75rem' }}>
                Studio Information
              </h3>

              {/* Address */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.4rem' }}>
                  LOCATION
                </span>
                <p style={{ margin: 0, color: 'var(--color-charcoal)', fontWeight: 500, fontSize: '1.1rem' }}>
                  {contactDetails.address}
                </p>
              </div>

              {/* Phone & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.4rem' }}>
                    PHONE
                  </span>
                  <a href={`tel:${contactDetails.phone}`} style={{ color: 'var(--color-forest)', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>
                    {contactDetails.phone}
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '0.4rem' }}>
                    EMAIL
                  </span>
                  <a href={`mailto:${contactDetails.email}`} style={{ color: 'var(--color-forest)', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>
                    {contactDetails.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div style={{ paddingTop: '1.75rem', borderTop: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem' }}>
                  OPENING HOURS
                </span>
                {contactDetails.hours.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', marginBottom: '0.65rem', color: 'var(--color-warm-gray)' }}>
                    <span>{h.days}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-forest)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ gridColumn: 'span 7' }} className="contact-form-col">
            <div
              style={{
                backgroundColor: 'var(--bg-ivory)',
                padding: '3rem',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', marginBottom: '2.25rem' }}>
                We typically respond within 2 business hours.
              </p>

              {submitted ? (
                <div
                  style={{
                    backgroundColor: 'rgba(31, 74, 60, 0.08)',
                    border: '1px solid var(--color-forest)',
                    padding: '2.5rem',
                    borderRadius: '6px',
                    textAlign: 'center',
                    animation: 'fadeIn 0.4s ease'
                  }}
                >
                  <span style={{ fontSize: '3rem', color: 'var(--color-forest)', display: 'block', marginBottom: '0.75rem' }}>✓</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--color-forest)', margin: 0 }}>
                    Message Sent Successfully!
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', marginTop: '0.65rem' }}>
                    Thank you for reaching out to Lumé Studio. Our guest relations team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Maya Lin"
                        className="form-input"
                        style={{ borderColor: errors.name ? '#d9534f' : undefined }}
                      />
                      {errors.name && <span style={{ color: '#d9534f', fontSize: '0.825rem' }}>{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. maya@example.com"
                        className="form-input"
                        style={{ borderColor: errors.email ? '#d9534f' : undefined }}
                      />
                      {errors.email && <span style={{ color: '#d9534f', fontSize: '0.825rem' }}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +60 12-345 6789"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can assist you..."
                      className="form-textarea"
                      style={{ borderColor: errors.message ? '#d9534f' : undefined }}
                    ></textarea>
                    {errors.message && <span style={{ color: '#d9534f', fontSize: '0.825rem' }}>{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem', padding: '1.2rem', fontSize: '1.1rem' }}>
                    Send Message
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
