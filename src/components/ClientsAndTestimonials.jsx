import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { TESTIMONIALS } from '../data/products';

export default function ClientsAndTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const testimonialCardRef = useRef(null);

  // Auto rotate testimonials with GSAP transition effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (window.gsap && testimonialCardRef.current) {
      window.gsap.fromTo(
        testimonialCardRef.current,
        { opacity: 0.3, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [activeIdx]);

  const activeTestimonial = TESTIMONIALS[activeIdx];

  return (
    <section id="clients" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <Badge variant="indigo" style={{ marginBottom: '0.75rem' }}>Trusted Corporate Partner</Badge>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Chosen by <span className="text-gold-gradient">Fortune 500 Leaders</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            From global onboarding kits to executive summit VIP hampers, see how leading brands partner with GIFTORA.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div style={{ maxWidth: '850px', margin: '0 auto 4rem auto' }}>
          <Card goldBorder={true} ref={testimonialCardRef} style={{ padding: '3rem 2.5rem', textAlign: 'center', position: 'relative' }}>
            
            {/* Quote Mark Icon */}
            <div style={{ fontSize: '4rem', fontFamily: 'serif', color: 'var(--gold-primary)', lineHeight: 0.5, marginBottom: '1.5rem', opacity: 0.5 }}>
              “
            </div>

            <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: '1.7' }}>
              "{activeTestimonial.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img 
                src={activeTestimonial.avatar} 
                alt={activeTestimonial.author}
                style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {activeTestimonial.author}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: '600' }}>
                  {activeTestimonial.role} — <span style={{ color: 'var(--text-secondary)' }}>{activeTestimonial.company}</span>
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '2rem' }}>
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    width: activeIdx === idx ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: activeIdx === idx ? 'var(--gold-primary)' : 'var(--border-hover)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

          </Card>
        </div>

        {/* Corporate Trust Banner Grid */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)' }}>APEX GLOBAL</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)' }}>STARLIGHT INTERACTIVE</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)' }}>VANGUARD CAPITAL</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)' }}>HORIZON CLOUD</div>
        </div>

      </div>
    </section>
  );
}
