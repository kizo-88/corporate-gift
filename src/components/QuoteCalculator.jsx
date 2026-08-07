import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { CUSTOMIZATION_TYPES } from '../data/products';

export default function QuoteCalculator({ onOpenInquiry }) {
  const [quantity, setQuantity] = useState(150);
  const [avgUnitBasePrice, setAvgUnitBasePrice] = useState(65);
  const [selectedBranding, setSelectedBranding] = useState('laser');
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);
  const [customCardInsert, setCustomCardInsert] = useState(true);

  // Bulk discount calculation tiers
  const getDiscountPercent = (qty) => {
    if (qty >= 1000) return 25;
    if (qty >= 500) return 20;
    if (qty >= 250) return 15;
    if (qty >= 100) return 10;
    return 0;
  };

  const discountPercent = getDiscountPercent(quantity);
  const brandingObj = CUSTOMIZATION_TYPES.find(c => c.id === selectedBranding) || CUSTOMIZATION_TYPES[0];

  const baseSubtotal = quantity * avgUnitBasePrice;
  const discountAmount = (baseSubtotal * discountPercent) / 100;
  const discountedSubtotal = baseSubtotal - discountAmount;

  const brandingTotalFee = quantity * brandingObj.feePerUnit;
  const setupFee = 45; // Fixed setup & die-cut fee
  const cardInsertTotal = customCardInsert ? quantity * 1.2 : 0;
  const expressFee = isExpressDelivery ? 180 : 0;

  const totalEstimatedQuote = discountedSubtotal + brandingTotalFee + setupFee + cardInsertTotal + expressFee;
  const finalPricePerUnit = (totalEstimatedQuote / quantity).toFixed(2);

  const handleCopyQuote = () => {
    const text = `GIFTORA CORPORATE QUOTE ESTIMATE:\nQuantity: ${quantity} units\nBase Price/Unit: $${avgUnitBasePrice}\nDiscount: ${discountPercent}%\nBranding: ${brandingObj.name}\nEstimated Total: $${totalEstimatedQuote.toFixed(2)} ($${finalPricePerUnit}/unit)`;
    navigator.clipboard.writeText(text);
    alert('Instant Quote copied to clipboard!');
  };

  return (
    <section id="calculator" style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <Badge variant="emerald" style={{ marginBottom: '0.75rem' }}>Instant Pricing Engine</Badge>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Real-Time Corporate <span className="text-gold-gradient">Quote Estimator</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Transparent tiered volume pricing. Adjust project quantity and customization preferences for an instant cost breakdown.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="glass-card glass-card-gold" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* Inputs Column */}
            <div>
              
              {/* Slider 1: Order Quantity */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Target Order Quantity (Units):
                  </label>
                  <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--gold-primary)' }}>
                    {quantity} pcs
                  </span>
                </div>
                <input 
                  type="range"
                  min="25"
                  max="2000"
                  step="25"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)', height: '8px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <span>25 pcs (MOQ)</span>
                  <span>100 (10% OFF)</span>
                  <span>250 (15% OFF)</span>
                  <span>500 (20% OFF)</span>
                  <span>1000+ (25% OFF)</span>
                </div>
              </div>

              {/* Slider 2: Average Budget / Gift Value */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Average Gift Item Value:
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    ${avgUnitBasePrice} / unit
                  </span>
                </div>
                <input 
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={avgUnitBasePrice}
                  onChange={(e) => setAvgUnitBasePrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--emerald-primary)', height: '8px', cursor: 'pointer' }}
                />
              </div>

              {/* Branding Customization Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '0.6rem' }}>
                  Branding & Logo Application Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {CUSTOMIZATION_TYPES.map(cust => (
                    <div
                      key={cust.id}
                      onClick={() => setSelectedBranding(cust.id)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedBranding === cust.id ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: selectedBranding === cust.id ? 'var(--gold-glow)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{cust.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>+${cust.feePerUnit} / unit</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <input 
                    type="checkbox" 
                    checked={customCardInsert} 
                    onChange={(e) => setCustomCardInsert(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)', width: '18px', height: '18px' }}
                  />
                  Include Custom Printed Greeting Card & Envelope (+$1.20 / unit)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <input 
                    type="checkbox" 
                    checked={isExpressDelivery} 
                    onChange={(e) => setIsExpressDelivery(e.target.checked)}
                    style={{ accentColor: 'var(--gold-primary)', width: '18px', height: '18px' }}
                  />
                  Express Air Freight Shipping (3-4 Days Guaranteed Air Transit)
                </label>
              </div>

            </div>

            {/* Right Summary Column */}
            <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-lg)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>
                  Estimate Summary
                </span>
                {discountPercent > 0 && (
                  <Badge variant="emerald">{discountPercent}% Bulk Tier Discount</Badge>
                )}
              </div>

              {/* Cost Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Base Unit Subtotal ({quantity}x):</span>
                  <span>${baseSubtotal.toLocaleString()}</span>
                </div>

                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-primary)', fontWeight: '600' }}>
                    <span>Volume Discount Savings:</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Branding ({brandingObj.name}):</span>
                  <span>+${brandingTotalFee.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Precision Engraving Setup Fee:</span>
                  <span>+$45.00</span>
                </div>

                {customCardInsert && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Greeting Card Personalization:</span>
                    <span>+${cardInsertTotal.toFixed(2)}</span>
                  </div>
                )}

                {isExpressDelivery && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gold-primary)' }}>
                    <span>Express Air Priority Freight:</span>
                    <span>+$180.00</span>
                  </div>
                )}
              </div>

              {/* Total Banner */}
              <div style={{ padding: '1.25rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)', marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Estimated Quotation
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--gold-primary)', fontFamily: 'var(--font-serif)', margin: '0.2rem 0' }}>
                  ${totalEstimatedQuote.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--emerald-primary)', fontWeight: '700' }}>
                  Effective Net Price: ${finalPricePerUnit} per gift unit
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Button variant="gold" style={{ width: '100%' }} onClick={onOpenInquiry}>
                  Submit Official RFP / Request Formal Quote
                </Button>
                <Button variant="secondary" style={{ width: '100%' }} onClick={handleCopyQuote}>
                  📋 Copy Instant Quote Summary
                </Button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
