import React from 'react';

export default function Specialists({ onSelectSpecialist }) {
  const steps = [
    {
      num: '01',
      title: 'Select & Customize Gifts',
      desc: 'Browse our executive catalog or tell our concierge team your budget. Upload your logo and select precision laser etching, blind debossing, or foil stamping.',
      badge: 'Step 1: Curation'
    },
    {
      num: '02',
      title: 'Digital Mockup & Physical Sample',
      desc: 'Receive 3D digital artwork proofs within 4 hours. Request a physical pre-production sample delivered directly to your office before approving mass production.',
      badge: 'Step 2: Verification'
    },
    {
      num: '03',
      title: 'Global Multi-Address Logistics',
      desc: 'Bulk ship to corporate event venues or individually dispatch custom boxes to 10,000+ remote employee home addresses worldwide with end-to-end tracking.',
      badge: 'Step 3: Fulfillment'
    }
  ];

  return (
    <section id="solutions" className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Seamless Corporate Gifting Workflow</h2>
          <p>
            From initial concept to multi-destination international delivery, we remove all friction from enterprise gifting.
          </p>
        </div>

        {/* 3 Step Workflow Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="card-white"
              style={{
                padding: '3rem 2.25rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-slate)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontSize: '2.75rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: 'var(--color-gold)',
                    lineHeight: 1
                  }}>
                    {step.num}
                  </span>
                  <span className="tag">{step.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', marginBottom: '1rem' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-navy)', fontWeight: 600, fontSize: '0.9rem' }}>
                <span>Dedicated Concierge Support</span>
                <span style={{ color: 'var(--color-gold)' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

