export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'tech', name: 'Executive Tech' },
  { id: 'welcome-kits', name: 'Employee Onboarding Kits' },
  { id: 'artisan', name: 'Artisanal & Hampers' },
  { id: 'drinkware', name: 'Premium Drinkware' },
  { id: 'lifestyle', name: 'Executive Apparel & Leather' },
  { id: 'eco', name: 'Eco-Friendly & Sustainable' }
];

export const CUSTOMIZATION_TYPES = [
  { id: 'laser', name: 'Laser Engraving (Metal & Wood)', feePerUnit: 2.5 },
  { id: 'deboss', name: 'Blind Debossing (Leather)', feePerUnit: 3.0 },
  { id: 'foil', name: 'Metallic Foil Stamping (Gold/Silver)', feePerUnit: 3.5 },
  { id: 'silkscreen', name: 'HD Silk Screen Printing', feePerUnit: 1.8 },
  { id: 'sleeve', name: 'Custom Printed Packaging Box', feePerUnit: 4.5 }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aura Sound Pro Wireless ANC Headphones',
    category: 'tech',
    tag: 'Best Seller',
    price: 129,
    moq: 15,
    leadTime: '5-7 Days',
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Active Noise Cancelling over-ear headphones with custom laser-engraved aluminum ear cups. Comes in a luxury matte black gift box with magnetic closure.',
    specs: ['40h Battery Life', 'Custom Precision Laser Engraving', 'Bluetooth 5.3', 'Premium Hard Carrying Case'],
    colors: ['#0F172A', '#D97706', '#64748B']
  },
  {
    id: 'prod-2',
    name: 'The Sovereign Leather Portfolio & Smart Pen Set',
    category: 'lifestyle',
    tag: 'Executive Choice',
    price: 85,
    moq: 20,
    leadTime: '7-10 Days',
    rating: 4.8,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted full-grain Italian leather journal portfolio paired with a weighted matte finish brass rollerball pen and gold foil initials.',
    specs: ['Refillable A5 Premium Paper', 'Blind Debossed Logo', 'Built-in 10,000mAh Powerbank', 'RFID Blocking Pocket'],
    colors: ['#331800', '#1E293B', '#78350F']
  },
  {
    id: 'prod-3',
    name: 'OmniThermal Vacuum Tumbler & Espresso Flask',
    category: 'drinkware',
    tag: 'Trending',
    price: 34,
    moq: 50,
    leadTime: '3-5 Days',
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'Double-walled vacuum insulated 750ml thermal tumbler keeping liquids hot for 12h or cold for 24h. Scratch-resistant matte coat with laser branding.',
    specs: ['100% BPA Free Food Grade 304 Steel', 'Laser Engraved Brand Logo', 'Leak-proof Magnetic Cap'],
    colors: ['#0F172A', '#059669', '#D97706', '#E2E8F0']
  },
  {
    id: 'prod-4',
    name: 'Vanguard VIP Employee Onboarding Welcome Box',
    category: 'welcome-kits',
    tag: 'All-In-One Kit',
    price: 145,
    moq: 10,
    leadTime: '5-8 Days',
    rating: 5.0,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate welcome kit containing a branded hoodie, thermal water bottle, wireless charging pad, leather notebook, and welcome card.',
    specs: ['Full Custom Sleeve Packaging', 'Individual Name Personalization', 'Includes Welcome Note'],
    colors: ['#0F172A', '#1E293B']
  },
  {
    id: 'prod-5',
    name: 'Artisan Reserve Gourmet Coffee & Chocolate Hamper',
    category: 'artisan',
    tag: 'Holiday Gift',
    price: 95,
    moq: 15,
    leadTime: '3-5 Days',
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    description: 'Curated single-origin micro-lot coffee beans, artisanal organic dark chocolate bars, hand-poured soy candle, and custom brass scoop.',
    specs: ['Custom Wooden Gift Crate', 'Foil Stamped Ribbon', 'Complimentary Personalized Card'],
    colors: ['#78350F', '#D97706']
  },
  {
    id: 'prod-6',
    name: 'EcoSphere Bamboo Desk Station & MagSafe Charger',
    category: 'eco',
    tag: 'Sustainable',
    price: 48,
    moq: 30,
    leadTime: '4-6 Days',
    rating: 4.7,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
    description: 'FSC-certified natural bamboo desk organizer with 15W fast wireless MagSafe phone stand, pen holder, and plant seed card.',
    specs: ['100% Recyclable Eco Materials', 'Laser Engraved Logo', 'Comes in Recycled Kraft Box'],
    colors: ['#D97706', '#059669']
  },
  {
    id: 'prod-7',
    name: 'Titan Power Vault 20,000mAh Laptop Power Bank',
    category: 'tech',
    tag: 'Popular',
    price: 68,
    moq: 25,
    leadTime: '5-7 Days',
    rating: 4.8,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1609592424009-598d1a166160?auto=format&fit=crop&w=800&q=80',
    description: 'High-speed 65W USB-C Power Delivery battery bank powerful enough to charge MacBooks and iPhones simultaneously. Anodized aluminum housing.',
    specs: ['65W Fast PD Charging', 'Digital Battery % Screen', 'Full Surface Engraving Option'],
    colors: ['#1E293B', '#64748B']
  },
  {
    id: 'prod-8',
    name: 'Merino Wool Executive Zip Fleece & Polo',
    category: 'lifestyle',
    tag: 'Premium Apparel',
    price: 78,
    moq: 20,
    leadTime: '7-12 Days',
    rating: 4.9,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-soft Australian Merino wool quarter-zip jacket with subtle tonal chest logo embroidery. Perfect for corporate attire and client visits.',
    specs: ['High Precision Embroidery', 'Sizes S to 4XL', 'Individual Polybagged Packaging'],
    colors: ['#0F172A', '#334155', '#475569']
  }
];

export const CLIENT_LOGOS = [
  { name: 'Apex Global', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80' },
  { name: 'Nexus Tech', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80' },
  { name: 'Vanguard Capital', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80' },
  { name: 'Horizon Cloud', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Giftora made our annual executive appreciation gifts completely hassle-free. The custom debossed leather portfolios were delivered directly to 250 overseas executives on time with flawless quality.",
    author: "Elena Rostova",
    role: "VP of People Operations",
    company: "Apex Enterprise Cloud",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "The Custom Gift Box Kitting Studio allowed us to curate bespoke onboarding hampers for our 500+ new hires. The logo laser engraving quality exceeded our expectations!",
    author: "Marcus Chen",
    role: "Global Brand Manager",
    company: "Starlight Interactive",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "Instant volume pricing and downloadable quotation breakdowns saved us weeks of email back-and-forth. GIFTORA is now our official corporate gifting partner.",
    author: "Sarah Jenkins",
    role: "Head of Corporate Events",
    company: "Vanguard Financial",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
  }
];
