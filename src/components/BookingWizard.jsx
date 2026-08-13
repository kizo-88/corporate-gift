import React, { useState, useEffect } from 'react';
import { services, specialists, timeSlots } from '../data/mockData';

export default function BookingWizard({ isOpen, onClose, initialData = null, onConfirmBooking }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState(null);

  // Initialize date to tomorrow by default
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  // Pre-fill selection if passed from outside
  useEffect(() => {
    if (initialData) {
      if (initialData.service) {
        setSelectedService(initialData.service);
      } else if (initialData.package) {
        setSelectedService({
          id: initialData.package.id,
          name: `${initialData.package.name} Package`,
          shortDesc: initialData.package.tagline,
          duration: initialData.package.duration,
          price: initialData.package.price
        });
      }

      if (initialData.specialist) {
        setSelectedSpecialist(initialData.specialist);
      }

      // Automatically advance to appropriate step
      if (initialData.service || initialData.package) {
        setStep(2);
      } else if (initialData.specialist) {
        setStep(1);
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !selectedService) {
      alert('Please select a treatment service to proceed.');
      return;
    }
    if (step === 2 && !selectedSpecialist) {
      setSelectedSpecialist(specialists[0]);
    }
    if (step === 3 && !selectedDate) {
      alert('Please choose an appointment date.');
      return;
    }
    if (step === 4 && !selectedTime) {
      alert('Please select an appointment time slot.');
      return;
    }
    if (step === 5) {
      const newErrors = {};
      if (!customerInfo.name.trim()) newErrors.name = 'Full name is required';
      if (!customerInfo.email.trim()) newErrors.email = 'Email address is required';
      if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';

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

  const handleConfirm = () => {
    const booking = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      service: selectedService,
      specialist: selectedSpecialist || specialists[0],
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
      createdAt: new Date().toISOString()
    };

    setConfirmedBookingDetails(booking);
    setBookingSuccess(true);
    onConfirmBooking(booking);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setSelectedTime('');
    setCustomerInfo({ name: '', email: '', phone: '', notes: '' });
    setErrors({});
    setBookingSuccess(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-ivory)',
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          borderRadius: '8px',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-hover)',
          border: '1px solid var(--color-border)',
          overflowY: 'auto'
        }}
      >
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>ONLINE RESERVATION</span>
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
              Book Your Lumé Ritual
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            style={{ background: 'none', border: 'none', fontSize: '1.75rem', color: 'var(--color-forest)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Success Screen View */}
        {bookingSuccess ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: 'rgba(31, 74, 60, 0.1)',
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                margin: '0 auto 1.75rem auto'
              }}
            >
              ✓
            </div>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-forest)', margin: '0 0 0.75rem 0' }}>
              Your Appointment is Confirmed!
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-warm-gray)', marginBottom: '2.5rem' }}>
              We have sent a confirmation email to <strong style={{ color: 'var(--color-forest)' }}>{confirmedBookingDetails?.customer?.email}</strong>.
            </p>

            {/* Summary Ticket */}
            <div
              style={{
                backgroundColor: 'var(--bg-cream)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                padding: '2.5rem',
                maxWidth: '560px',
                margin: '0 auto 3rem auto',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)', fontWeight: 600 }}>RESERVATION REF:</span>
                <span style={{ fontSize: '1.05rem', color: 'var(--color-forest)', fontWeight: 700 }}>#{confirmedBookingDetails?.id}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '1.05rem' }}>
                <div>
                  <strong style={{ color: 'var(--color-forest)' }}>Treatment:</strong> {confirmedBookingDetails?.service?.name}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-forest)' }}>Specialist:</strong> {confirmedBookingDetails?.specialist?.name}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-forest)' }}>Date &amp; Time:</strong> {confirmedBookingDetails?.date} at {confirmedBookingDetails?.time}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-forest)' }}>Duration:</strong> {confirmedBookingDetails?.service?.duration || '60 mins'}
                </div>
                <div>
                  <strong style={{ color: 'var(--color-forest)' }}>Total Investment:</strong> RM {confirmedBookingDetails?.service?.price}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={resetAndClose} className="btn btn-primary" style={{ padding: '1.25rem 2.85rem', fontSize: '1.1rem' }}>
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step Progress Indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Specialist' },
                { num: 3, label: 'Date' },
                { num: 4, label: 'Time' },
                { num: 5, label: 'Details' },
                { num: 6, label: 'Summary' }
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
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: step === s.num ? 'var(--color-forest)' : step > s.num ? 'var(--color-gold)' : 'var(--bg-cream)',
                      color: step >= s.num ? 'var(--bg-ivory)' : 'var(--color-warm-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      border: step >= s.num ? 'none' : '1px solid var(--color-border)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span style={{ fontSize: '0.825rem', marginTop: '0.45rem', fontWeight: step === s.num ? 700 : 500, color: step === s.num ? 'var(--color-forest)' : 'var(--color-warm-gray)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* STEP 1: CHOOSE SERVICE */}
              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                    Step 1: Select Treatment Service
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '380px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {services.map((serv) => {
                      const isSelected = selectedService?.id === serv.id;
                      return (
                        <div
                          key={serv.id}
                          onClick={() => setSelectedService(serv)}
                          style={{
                            padding: '1.25rem 1.6rem',
                            borderRadius: '6px',
                            border: isSelected ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--bg-cream)' : 'var(--bg-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div>
                            <h5 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
                              {serv.name}
                            </h5>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)' }}>
                              {serv.duration} • {serv.shortDesc}
                            </span>
                          </div>
                          <span style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-forest)', whiteSpace: 'nowrap', marginLeft: '1.5rem' }}>
                            RM {serv.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE SPECIALIST */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                    Step 2: Select Specialist
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                    {specialists.map((sp) => {
                      const isSelected = selectedSpecialist?.id === sp.id;
                      return (
                        <div
                          key={sp.id}
                          onClick={() => setSelectedSpecialist(sp)}
                          style={{
                            padding: '1.5rem',
                            borderRadius: '6px',
                            border: isSelected ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--bg-cream)' : 'var(--bg-white)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img
                            src={sp.image}
                            alt={sp.name}
                            style={{ width: '68px', height: '68px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <h5 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', margin: 0 }}>
                              {sp.name}
                            </h5>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: 600, display: 'block' }}>
                              {sp.role}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray)' }}>
                              ★ {sp.rating} rating
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE DATE */}
              {step === 3 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1rem' }}>
                    Step 3: Choose Appointment Date
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', marginBottom: '1.75rem' }}>
                    Select your preferred date for the appointment.
                  </p>

                  <div className="form-group" style={{ maxWidth: '400px' }}>
                    <label className="form-label">Appointment Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '1.15rem', padding: '1.1rem' }}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: CHOOSE TIME */}
              {step === 4 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                    Step 4: Select Time Slot
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: 'var(--color-warm-gray)', marginBottom: '1.75rem' }}>
                    Available slots for {selectedDate}:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          style={{
                            padding: '1.25rem',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: '6px',
                            border: isSelected ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-forest)' : 'var(--bg-white)',
                            color: isSelected ? 'var(--bg-ivory)' : 'var(--color-forest)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: CUSTOMER DETAILS */}
              {step === 5 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                    Step 5: Client Contact Details
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => {
                          setCustomerInfo({ ...customerInfo, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className="form-input"
                        style={{ borderColor: errors.name ? '#d9534f' : undefined }}
                      />
                      {errors.name && <span style={{ color: '#d9534f', fontSize: '0.85rem' }}>{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => {
                          setCustomerInfo({ ...customerInfo, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="e.g. sarah@example.com"
                        className="form-input"
                        style={{ borderColor: errors.email ? '#d9534f' : undefined }}
                      />
                      {errors.email && <span style={{ color: '#d9534f', fontSize: '0.85rem' }}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => {
                        setCustomerInfo({ ...customerInfo, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. +60 12-987 6543"
                      className="form-input"
                      style={{ borderColor: errors.phone ? '#d9534f' : undefined }}
                    />
                    {errors.phone && <span style={{ color: '#d9534f', fontSize: '0.85rem' }}>{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Notes / Allergies (Optional)</label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      placeholder="Let us know if you have skin sensitivities or specific preferences..."
                      className="form-textarea"
                      style={{ minHeight: '90px' }}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* STEP 6: SUMMARY */}
              {step === 6 && (
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--color-forest)', marginBottom: '1.25rem' }}>
                    Step 6: Review &amp; Confirm Appointment
                  </h4>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-cream)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
                      <span style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem' }}>Selected Service:</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: '1.05rem' }}>{selectedService?.name}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
                      <span style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem' }}>Specialist:</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: '1.05rem' }}>{selectedSpecialist?.name} ({selectedSpecialist?.role})</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
                      <span style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem' }}>Date &amp; Time:</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: '1.05rem' }}>{selectedDate} at {selectedTime}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
                      <span style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem' }}>Duration:</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: '1.05rem' }}>{selectedService?.duration || '60 mins'}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
                      <span style={{ color: 'var(--color-warm-gray)', fontSize: '1.05rem' }}>Client:</span>
                      <strong style={{ color: 'var(--color-forest)', fontSize: '1.05rem' }}>{customerInfo.name} ({customerInfo.email})</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-forest)' }}>Total Investment:</span>
                      <span style={{ fontSize: '2.35rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-forest)' }}>
                        RM {selectedService?.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
              {step > 1 ? (
                <button onClick={handlePrevStep} className="btn btn-secondary">
                  &larr; Back
                </button>
              ) : <div style={{}} />}

              {step < 6 ? (
                <button onClick={handleNextStep} className="btn btn-primary">
                  Continue &rarr;
                </button>
              ) : (
                <button onClick={handleConfirm} className="btn btn-gold">
                  Confirm Appointment
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
