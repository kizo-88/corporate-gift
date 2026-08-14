import React, { useState, useEffect } from 'react';
import { products, customizationMethods } from '../data/mockData';

export default function BookingWizard({ isOpen, onClose, initialData = null, onConfirmBooking }) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(25);
  const [selectedBranding, setSelectedBranding] = useState(['Laser Engraving']);
  const [customCardMessage, setCustomCardMessage] = useState('');
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    deliveryDate: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);

  // Pre-fill selection if passed from outside
  useEffect(() => {
    if (initialData) {
      if (initialData.service) {
        setSelectedProduct(initialData.service);
      } else if (initialData.package) {
        setSelectedProduct({
          id: initialData.package.id,
          name: initialData.package.name,
          shortDesc: initialData.package.tagline,
          price: initialData.package.price,
          moq: 10
        });
      }
      setStep(2);
    } else if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Calculate instant pricing & bulk discounts
  const basePrice = selectedProduct ? selectedProduct.price : 100;
  let discountPct = 0;
  if (quantity >= 100) discountPct = 0.20; // 20% off
  else if (quantity >= 50) discountPct = 0.15; // 15% off
  else if (quantity >= 25) discountPct = 0.10; // 10% off

  const unitPriceAfterDiscount = Math.round(basePrice * (1 - discountPct));
  const subtotal = unitPriceAfterDiscount * quantity;
  const brandingFee = selectedBranding.length * 3 * quantity; // $3 per branding option per unit
  const grandTotal = subtotal + brandingFee;

  const toggleBranding = (methodName) => {
    if (selectedBranding.includes(methodName)) {
      setSelectedBranding(prev => prev.filter(b => b !== methodName));
    } else {
      setSelectedBranding(prev => [...prev, methodName]);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedProduct) {
      alert('Please select a corporate gift item to proceed.');
      return;
    }
    if (step === 5) {
      const newErrors = {};
      if (!companyDetails.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!companyDetails.contactName.trim()) newErrors.contactName = 'Contact name is required';
      if (!companyDetails.email.trim()) newErrors.email = 'Work email is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmQuote = () => {
    const quote = {
      id: 'AQ-' + Math.floor(100000 + Math.random() * 900000),
      product: selectedProduct,
      service: selectedProduct, // Alias for cart compatibility
      quantity,
      selectedBranding,
      customCardMessage,
      unitPrice: unitPriceAfterDiscount,
      grandTotal,
      company: companyDetails,
      customer: {
        name: companyDetails.contactName,
        email: companyDetails.email,
        phone: companyDetails.phone
      },
      createdAt: new Date().toISOString()
    };

    setGeneratedQuote(quote);
    setQuoteSuccess(true);
    onConfirmBooking(quote);
  };

  const resetAndClose = () => {
    setStep(1);
    setCompanyDetails({ companyName: '', contactName: '', email: '', phone: '', deliveryDate: '', notes: '' });
    setErrors({});
    setQuoteSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-white)',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          borderRadius: '12px',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          border: '1px solid var(--color-border-subtle)',
          overflowY: 'auto'
        }}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>INSTANT QUOTE CALCULATOR</span>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: 0 }}>
              Build Your Corporate Gift Proposal
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            style={{ background: 'none', border: 'none', fontSize: '1.6rem', color: 'var(--color-navy)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Quote Success Screen */}
        {quoteSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                margin: '0 auto 1.5rem auto',
                border: '2px solid var(--color-gold)'
              }}
            >
              ✓
            </div>

            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-navy)', margin: '0 0 0.5rem 0' }}>
              Corporate Quote Generated!
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              A formal proposal reference <strong style={{ color: 'var(--color-navy)' }}>#{generatedQuote?.id}</strong> has been created for <strong style={{ color: 'var(--color-navy)' }}>{generatedQuote?.company?.companyName}</strong>.
            </p>

            {/* Proposal Ticket */}
            <div
              style={{
                backgroundColor: 'var(--bg-slate)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '10px',
                padding: '2rem',
                maxWidth: '620px',
                margin: '0 auto 2.5rem auto',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>PROPOSAL REFERENCE:</span>
                <span style={{ fontSize: '1rem', color: 'var(--color-gold)', fontWeight: 800 }}>{generatedQuote?.id}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Selected Item:</strong> {generatedQuote?.product?.name}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Order Volume:</strong> {generatedQuote?.quantity} Gift Boxes
                </div>
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Branding Methods:</strong> {generatedQuote?.selectedBranding?.join(', ') || 'Standard Packaging'}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-navy)' }}>Contact:</strong> {generatedQuote?.company?.contactName} ({generatedQuote?.company?.email})
                </div>
                <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)' }}>Total Estimated Investment:</span>
                  <span style={{ fontSize: '1.85rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--color-navy)' }}>
                    ${generatedQuote?.grandTotal?.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>USD</span>
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => window.print()} className="btn btn-outline-navy" style={{ padding: '0.9rem 1.8rem' }}>
                Print / Save PDF Quote
              </button>
              <button onClick={resetAndClose} className="btn btn-gold" style={{ padding: '0.9rem 2.2rem' }}>
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step Progress Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
              {[
                { num: 1, label: 'Gift Selection' },
                { num: 2, label: 'Quantity' },
                { num: 3, label: 'Logo Branding' },
                { num: 4, label: 'Card & Note' },
                { num: 5, label: 'Company Info' },
                { num: 6, label: 'Proposal Summary' }
              ].map((s) => (
                <div
                  key={s.num}
                  onClick={() => {
                    if (s.num < step) setStep(s.num);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: s.num < step ? 'pointer' : 'default',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: step === s.num ? 'var(--color-navy)' : step > s.num ? 'var(--color-gold)' : '#E2E8F0',
                      color: step >= s.num ? '#FFFFFF' : 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span style={{ fontSize: '0.775rem', marginTop: '0.35rem', fontWeight: step === s.num ? 700 : 500, color: step === s.num ? 'var(--color-navy)' : 'var(--color-text-muted)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* STEP 1: CHOOSE GIFT */}
              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '1rem' }}>
                    Step 1: Select Corporate Gift Item
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.3rem' }}>
                    {products.map((p) => {
                      const isSelected = selectedProduct?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedProduct(p)}
                          style={{
                            padding: '1rem 1.25rem',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
                            backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={p.image} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                            <div>
                              <h5 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: 0 }}>
                                {p.name}
                              </h5>
                              <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>
                                MOQ: {p.moq} Units • Lead Time: {p.leadTime}
                              </span>
                            </div>
                          </div>
                          <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-navy)', whiteSpace: 'nowrap' }}>
                            ${p.price} USD
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: QUANTITY & BULK DISCOUNTS */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    Step 2: Select Recipient Quantity
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                    Configure the total volume. Higher quantities automatically unlock tiered enterprise savings.
                  </p>

                  <div style={{ backgroundColor: 'var(--bg-slate)', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-navy)' }}>Total Gift Boxes:</span>
                      <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--color-gold)' }}>
                        {quantity} Units
                      </span>
                    </div>

                    <input
                      type="range"
                      min={selectedProduct?.moq || 10}
                      max="500"
                      step="5"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer', height: '8px' }}
                    />

                    {/* Tier Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '0.5rem' }}>
                      <div style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: quantity < 25 ? 'var(--color-navy)' : '#E2E8F0', color: quantity < 25 ? '#FFF' : '#64748B', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                        10-24 Units (Standard)
                      </div>
                      <div style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: quantity >= 25 && quantity < 50 ? 'var(--color-gold)' : '#E2E8F0', color: quantity >= 25 && quantity < 50 ? '#0B1325' : '#64748B', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                        25-49 Units (10% OFF)
                      </div>
                      <div style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: quantity >= 50 && quantity < 100 ? 'var(--color-gold)' : '#E2E8F0', color: quantity >= 50 && quantity < 100 ? '#0B1325' : '#64748B', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                        50-99 Units (15% OFF)
                      </div>
                      <div style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', backgroundColor: quantity >= 100 ? 'var(--color-navy)' : '#E2E8F0', color: quantity >= 100 ? '#FFF' : '#64748B', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                        100+ Units (20% OFF)
                      </div>
                    </div>
                  </div>

                  {/* Instant Subtotal Preview */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', border: '1px solid var(--color-gold)' }}>
                    <span>Discounted Unit Price: <strong>${unitPriceAfterDiscount}</strong> ({discountPct * 100}% savings)</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      Box Subtotal: ${subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: BRANDING METHODS */}
              {step === 3 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    Step 3: Select Logo Branding Methods
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    Choose how your corporate logo or crest should be applied to the product &amp; packaging.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                    {customizationMethods.map((m) => {
                      const isChecked = selectedBranding.includes(m.name);
                      return (
                        <div
                          key={m.id}
                          onClick={() => toggleBranding(m.name)}
                          style={{
                            padding: '1.2rem',
                            borderRadius: '8px',
                            border: isChecked ? '2px solid var(--color-gold)' : '1px solid var(--color-border-subtle)',
                            backgroundColor: isChecked ? 'rgba(212, 175, 55, 0.08)' : 'var(--bg-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: '0.85rem',
                            alignItems: 'flex-start',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            style={{ marginTop: '0.2rem', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
                          />
                          <div>
                            <h5 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', margin: '0 0 0.25rem 0' }}>
                              {m.name}
                            </h5>
                            <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
                              {m.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: CARD PERSONALIZATION */}
              {step === 4 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                    Step 4: Custom Note Card &amp; Message
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    Every box includes a heavy cardstock foil-stamped greeting letter. Enter your custom text or logo message below.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Personalized Welcome Message / Letter</label>
                    <textarea
                      value={customCardMessage}
                      onChange={(e) => setCustomCardMessage(e.target.value)}
                      placeholder="e.g. Dear [Recipient Name], Thank you for your extraordinary leadership and dedication to our company mission..."
                      className="form-textarea"
                      style={{ minHeight: '140px' }}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 5: COMPANY DETAILS */}
              {step === 5 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
                    Step 5: Enterprise Contact Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input
                        type="text"
                        value={companyDetails.companyName}
                        onChange={(e) => {
                          setCompanyDetails({ ...companyDetails, companyName: e.target.value });
                          if (errors.companyName) setErrors({ ...errors, companyName: '' });
                        }}
                        placeholder="e.g. Deloitte / TechCorp"
                        className="form-input"
                        style={{ borderColor: errors.companyName ? '#EF4444' : undefined }}
                      />
                      {errors.companyName && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.companyName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Contact Person *</label>
                      <input
                        type="text"
                        value={companyDetails.contactName}
                        onChange={(e) => {
                          setCompanyDetails({ ...companyDetails, contactName: e.target.value });
                          if (errors.contactName) setErrors({ ...errors, contactName: '' });
                        }}
                        placeholder="e.g. Marcus Vance"
                        className="form-input"
                        style={{ borderColor: errors.contactName ? '#EF4444' : undefined }}
                      />
                      {errors.contactName && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.contactName}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Work Email *</label>
                      <input
                        type="email"
                        value={companyDetails.email}
                        onChange={(e) => {
                          setCompanyDetails({ ...companyDetails, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="e.g. marcus@company.com"
                        className="form-input"
                        style={{ borderColor: errors.email ? '#EF4444' : undefined }}
                      />
                      {errors.email && <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Desired Delivery Date</label>
                      <input
                        type="date"
                        value={companyDetails.deliveryDate}
                        onChange={(e) => setCompanyDetails({ ...companyDetails, deliveryDate: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: SUMMARY */}
              {step === 6 && (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '1rem' }}>
                    Step 6: Final Review &amp; Proposal Generation
                  </h4>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-slate)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '10px',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Selected Gift Item:</span>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '0.95rem' }}>{selectedProduct?.name}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Quantity &amp; Volume Tier:</span>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '0.95rem' }}>{quantity} Boxes (${unitPriceAfterDiscount}/unit)</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Branding Methods:</span>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '0.95rem' }}>{selectedBranding.join(', ') || 'Standard'}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Client &amp; Company:</span>
                      <strong style={{ color: 'var(--color-navy)', fontSize: '0.95rem' }}>{companyDetails.companyName} ({companyDetails.contactName})</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy)' }}>Total Proposal Amount:</span>
                      <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--color-navy)' }}>
                        ${grandTotal.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              {step > 1 ? (
                <button onClick={handlePrevStep} className="btn btn-outline-navy btn-sm">
                  &larr; Back
                </button>
              ) : <div />}

              {step < 6 ? (
                <button onClick={handleNextStep} className="btn btn-navy btn-sm">
                  Continue &rarr;
                </button>
              ) : (
                <button onClick={handleConfirmQuote} className="btn btn-gold btn-sm">
                  Generate Instant Quote
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

