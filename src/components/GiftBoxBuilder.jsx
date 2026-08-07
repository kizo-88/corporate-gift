import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export default function GiftBoxBuilder({ products, onAddBoxToCart }) {
  const [selectedBoxStyle, setSelectedBoxStyle] = useState({ id: 'black', name: 'Midnight Matte Black', color: '#0F172A', fee: 12 });
  const [selectedItems, setSelectedItems] = useState([]);
  const [ribbonColor, setRibbonColor] = useState('gold');
  const [cardMessage, setCardMessage] = useState('Welcome to the Team! We are thrilled to have you onboard.');
  const boxVisualRef = useRef(null);

  const boxStyles = [
    { id: 'black', name: 'Midnight Matte Black', color: '#0F172A', fee: 12 },
    { id: 'emerald', name: 'Royal Emerald Velvet', color: '#064E3B', fee: 15 },
    { id: 'slate', name: 'Executive Slate Linen', color: '#1E293B', fee: 14 },
    { id: 'gold', name: 'Champagne Gold Foil', color: '#78350F', fee: 18 }
  ];

  const ribbonOptions = [
    { id: 'gold', name: 'Gold Satin', color: '#F59E0B' },
    { id: 'silver', name: 'Silver Metallic', color: '#94A3B8' },
    { id: 'emerald', name: 'Emerald Ribbon', color: '#10B981' },
    { id: 'navy', name: 'Royal Navy', color: '#1E3A8A' }
  ];

  // GSAP animation when item is added or removed
  useEffect(() => {
    if (window.gsap && boxVisualRef.current) {
      window.gsap.fromTo(
        boxVisualRef.current,
        { scale: 0.96, rotate: -1 },
        { scale: 1, rotate: 0, duration: 0.45, ease: 'back.out(1.7)' }
      );
    }
  }, [selectedItems, selectedBoxStyle]);

  const handleToggleItem = (product) => {
    if (selectedItems.find(i => i.id === product.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== product.id));
    } else {
      if (selectedItems.length >= 4) {
        alert('Custom gift boxes support a maximum of 4 curated items per hamper.');
        return;
      }
      setSelectedItems([...selectedItems, product]);
    }
  };

  const calculateTotalBoxCost = () => {
    const itemsTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
    return selectedBoxStyle.fee + itemsTotal;
  };

  const handleSaveBoxToCart = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least 1 item to include in your custom gift box.');
      return;
    }

    const customBoxProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Custom Corporate Gift Box (${selectedBoxStyle.name})`,
      category: 'welcome-kits',
      price: calculateTotalBoxCost(),
      moq: 10,
      leadTime: '5-7 Days',
      image: selectedItems[0]?.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      description: `Includes: ${selectedItems.map(i => i.name).join(', ')}. Ribbon: ${ribbonColor.toUpperCase()}. Card: "${cardMessage.slice(0, 30)}..."`,
      isCustomBox: true,
      items: selectedItems,
      boxStyle: selectedBoxStyle,
      ribbon: ribbonColor,
      greetingMessage: cardMessage
    };

    onAddBoxToCart(customBoxProduct);
  };

  return (
    <section id="builder" style={{ padding: '5rem 0', position: 'relative', background: 'rgba(19, 27, 46, 0.4)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
          <Badge variant="gold" style={{ marginBottom: '0.75rem' }}>Interactive Studio</Badge>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Custom Corporate <span className="text-gold-gradient">Kitting Studio</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Build your brand’s custom luxury gift hamper. Select your box finish, curate up to 4 premium products, and personalize with custom ribbon & gift note.
          </p>
        </div>

        {/* Builder Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Customization Controls */}
          <div>
            
            {/* Step 1: Select Box Style */}
            <Card style={{ marginBottom: '1.75rem' }}>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-gold">Step 1</span>
                  <CardTitle style={{ fontSize: '1.1rem' }}>Choose Luxury Box Finish</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {boxStyles.map(box => (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBoxStyle(box)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedBoxStyle.id === box.id ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                        background: selectedBoxStyle.id === box.id ? 'var(--gold-glow)' : 'var(--bg-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: box.color, border: '1px solid var(--border-hover)' }} />
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>{box.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>+${box.fee} / box</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Select Up to 4 Items */}
            <Card style={{ marginBottom: '1.75rem' }}>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-emerald">Step 2</span>
                    <CardTitle style={{ fontSize: '1.1rem' }}>Curate Box Contents</CardTitle>
                  </div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: '700' }}>
                    {selectedItems.length} / 4 Items Selected
                  </span>
                </div>
                <CardDescription>Click to add/remove products inside the hamper box</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', maxHeight: '340px', overflowY: 'auto', paddingRight: '0.3rem' }}>
                  {products.slice(0, 8).map(prod => {
                    const isSelected = !!selectedItems.find(i => i.id === prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleToggleItem(prod)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '1px solid var(--emerald-primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--emerald-glow)' : 'var(--bg-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <img src={prod.image} alt={prod.name} style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                        <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>{prod.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)' }}>+${prod.price}</div>
                        </div>
                        {isSelected && (
                          <span style={{ color: 'var(--emerald-primary)', fontWeight: 'bold' }}>✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Ribbon & Inscription Note */}
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-indigo">Step 3</span>
                  <CardTitle style={{ fontSize: '1.1rem' }}>Ribbon & Custom Inscription</CardTitle>
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                    Select Ribbon Accent Color:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {ribbonOptions.map(rib => (
                      <button
                        key={rib.id}
                        onClick={() => setRibbonColor(rib.id)}
                        className={`btn btn-sm ${ribbonColor === rib.id ? 'btn-gold' : 'btn-secondary'}`}
                        style={{ fontSize: '0.78rem' }}
                      >
                        {rib.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: '600' }}>
                    Complimentary Greeting Card Message:
                  </label>
                  <textarea
                    rows="2"
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column: Visual Box Assembly Preview */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <Card goldBorder={true} ref={boxVisualRef} style={{ background: 'var(--bg-card-hover)', boxShadow: 'var(--shadow-gold)' }}>
              
              <CardHeader style={{ textAlign: 'center', borderBottom: '1px solid var(--border-subtle)', pb: '1rem' }}>
                <Badge variant="gold">Live Package Preview</Badge>
                <CardTitle style={{ marginTop: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                  {selectedBoxStyle.name}
                </CardTitle>
                <CardDescription>Personalized Corporate Gift Set</CardDescription>
              </CardHeader>

              <CardContent style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                
                {/* Simulated Box Visual Container */}
                <div style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: 'var(--radius-lg)',
                  background: selectedBoxStyle.color,
                  border: '3px dashed var(--gold-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
                }}>

                  {/* Decorative Ribbon Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '30px',
                    background: ribbonOptions.find(r => r.id === ribbonColor)?.color || '#F59E0B',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    zIndex: 2
                  }} />

                  {/* Box Content Showcase Grid */}
                  <div style={{ position: 'relative', zIndex: 3, display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', padding: '1rem' }}>
                    {selectedItems.length === 0 ? (
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        Select items from the catalog on the left to place into your box
                      </div>
                    ) : (
                      selectedItems.map((item, idx) => (
                        <div 
                          key={item.id} 
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '2px solid #fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            background: '#000'
                          }}
                        >
                          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))
                    )}
                  </div>

                </div>

                {/* Live Cost Breakdown */}
                <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    <span>Box Finish & Packaging:</span>
                    <span>${selectedBoxStyle.fee}.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    <span>Curated Items ({selectedItems.length}):</span>
                    <span>${selectedItems.reduce((a, c) => a + c.price, 0)}.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--gold-primary)' }}>
                    <span>Cost Per Box:</span>
                    <span>${calculateTotalBoxCost()}.00</span>
                  </div>
                </div>

              </CardContent>

              <CardFooter>
                <Button 
                  variant="gold" 
                  style={{ width: '100%' }}
                  onClick={handleSaveBoxToCart}
                >
                  Save & Add Custom Hamper to Quote
                </Button>
              </CardFooter>

            </Card>
          </div>

        </div>

      </div>
    </section>
  );
}
