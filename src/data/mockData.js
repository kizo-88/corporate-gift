export const categories = [
  { id: 'all', name: 'All Gifts & Catalog' },
  { id: 'tech', name: 'Executive Tech & Gadgets' },
  { id: 'gourmet', name: 'Luxury Gourmet & Fine Wine' },
  { id: 'leather', name: 'Bespoke Leatherware' },
  { id: 'onboarding', name: 'Employee Onboarding & Kits' },
  { id: 'eco', name: 'Eco-Luxury & Wellness' },
  { id: 'vip', name: 'VIP C-Suite Curated Boxes' }
];

export const products = [
  {
    id: 'cg1',
    category: 'tech',
    name: 'Aura Wireless Executive Desk Pad',
    shortDesc: 'Italian top-grain leather desk pad with built-in fast 15W Qi wireless charging and magnetic pen rest.',
    moq: 10,
    price: 110,
    rating: 4.9,
    leadTime: '3-5 Days',
    customization: ['Laser Engraving', 'Blind Debossing', 'Gold Foil'],
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    tags: ['Best Seller', 'C-Suite Preferred']
  },
  {
    id: 'cg2',
    category: 'tech',
    name: 'Master & Dynamic ANC Noise-Cancelling Headphones',
    shortDesc: 'Custom-engraved premium wireless headphones featuring beryllium drivers and brushed aluminum finish.',
    moq: 5,
    price: 380,
    rating: 5.0,
    leadTime: '5-7 Days',
    customization: ['Precision Laser Etching', 'Custom Sleeve Packaging'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    tags: ['VIP Luxury', 'Award Gift']
  },
  {
    id: 'cg3',
    category: 'gourmet',
    name: 'Artisanal Reserve Wine & Truffle Box',
    shortDesc: 'Bespoke wooden crate featuring a 2018 Napa Cabernet Reserve, handcrafted Swiss truffles, and gold wine stopper.',
    moq: 15,
    price: 165,
    rating: 4.9,
    leadTime: '2-4 Days',
    customization: ['Fire-Branded Box Logo', 'Personalized Wax Seal Card'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    tags: ['Holiday Special', 'Client Appreciation']
  },
  {
    id: 'cg4',
    category: 'gourmet',
    name: 'Grand Reserve Artisan Teas & Honey Set',
    shortDesc: 'Organic single-origin loose leaf teas in brass caddies paired with raw wildflower honey and teak honey dipper.',
    moq: 20,
    price: 85,
    rating: 4.8,
    leadTime: '3-5 Days',
    customization: ['Custom Ribbon Print', 'Logo Engraved Brass Tins'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    tags: ['Wellness Gift', 'Popular']
  },
  {
    id: 'cg5',
    category: 'leather',
    name: 'Handcrafted Tuscan Leather Travel Folio',
    shortDesc: 'Genuine vegetable-tanned Italian leather folio with tablet sleeve, card slots, and refillable linen notebook.',
    moq: 10,
    price: 145,
    rating: 5.0,
    leadTime: '4-6 Days',
    customization: ['Hot Monogram Foil Stamping', 'Blind Embossing'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: ['Executive Choice']
  },
  {
    id: 'cg6',
    category: 'leather',
    name: 'Monogrammed Leather Weekender Duffel',
    shortDesc: 'Full-grain brass-hardware weekender bag designed for business travel and luxury retreats.',
    moq: 5,
    price: 290,
    rating: 4.9,
    leadTime: '7-10 Days',
    customization: ['Debossed Initial Monogram', 'Custom Interior Tag'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    tags: ['Milestone Gift', 'Retirement / Gala']
  },
  {
    id: 'cg7',
    category: 'onboarding',
    name: 'Day-One Premier Employee Welcome Box',
    shortDesc: 'Curated welcome kit containing insulated matte thermal tumbler, hardcover journal, metallic pen, and branded tech pouch.',
    moq: 25,
    price: 75,
    rating: 4.9,
    leadTime: '3-5 Days',
    customization: ['Full Custom Box Sleeve', 'Laser Engraved Tumbler', 'Personalized Welcome Note'],
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    tags: ['Top Onboarding Kit', 'HR Favorite']
  },
  {
    id: 'cg8',
    category: 'onboarding',
    name: 'Remote Team Workstation Elevation Kit',
    shortDesc: 'Ergonomic aluminum laptop stand, woven cable organizer, acoustic felt desk mat, and ceramic mug with warmer.',
    moq: 15,
    price: 125,
    rating: 4.8,
    leadTime: '4-6 Days',
    customization: ['Laser Etched Stand', 'Custom Branded Packaging'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    tags: ['Remote Culture', 'Employee Retention']
  },
  {
    id: 'cg9',
    category: 'eco',
    name: 'Sustainably Crafted Bamboo & Steel Coffee Set',
    shortDesc: 'FSC-certified bamboo thermal carafe, two double-wall stainless steel cups, and organic fair-trade coffee roast.',
    moq: 20,
    price: 65,
    rating: 4.9,
    leadTime: '3-5 Days',
    customization: ['Eco Laser Engraving', 'Recycled Box Packaging'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    tags: ['ESG Compliant', 'Eco Friendly']
  },
  {
    id: 'cg10',
    category: 'eco',
    name: 'Aura Organic Botanical Spa & Relaxation Suite',
    shortDesc: 'Handpoured soy wax aromatherapy candle, eucalyptus bath salts, organic waffle linen robe, and bamboo slippers.',
    moq: 15,
    price: 135,
    rating: 5.0,
    leadTime: '3-5 Days',
    customization: ['Custom Candle Label', 'Embroidered Monogram Robe'],
    image: 'https://images.unsplash.com/photo-1608248597261-8332586b96f1?auto=format&fit=crop&w=800&q=80',
    tags: ['Wellness Ritual', 'Holiday Favorite']
  },
  {
    id: 'cg11',
    category: 'vip',
    name: 'The C-Suite Legacy Gold Edition Chest',
    shortDesc: 'Hand-assembled dark mahogany wooden chest containing Montblanc rollerball pen, Crystal Decanter, and 25-Year Aged Malt Scotch.',
    moq: 2,
    price: 490,
    rating: 5.0,
    leadTime: '5-7 Days',
    customization: ['Brass Plate Engraving', 'Gold Foil Personal Letter', 'Hand-Delivered White Glove Service'],
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    tags: ['Ultimate VIP', 'Presidential Level']
  },
  {
    id: 'cg12',
    category: 'vip',
    name: 'Global Executive Sound & Tech Suite',
    shortDesc: 'Bose SoundLink Flex Speaker, Anker 20,000mAh MagSafe Powerbank, and Leather Tech Organizer in matte black magnetic box.',
    moq: 5,
    price: 320,
    rating: 4.9,
    leadTime: '4-6 Days',
    customization: ['Laser Engraved Tech Enclosure', 'Custom Box Branding'],
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    tags: ['Tech Executive', 'High Impact']
  }
];

// Alias export for backward compatibility with component imports
export const services = products;

export const packages = [
  {
    id: 'p1',
    name: 'The Executive Onboarding Experience',
    tagline: 'Turn New Hires into Lifelong Brand Champions',
    included: ['Day-One Premier Box', 'Leather Tech Organizer', 'Custom Welcome Card', 'Direct-to-Employee Shipping'],
    moq: 'Min. 10 Units',
    price: 95,
    originalPrice: 120,
    popular: true,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'Annual Board & VIP Client Recognition',
    tagline: 'Express Unforgettable Gratitude to Key Stakeholders',
    included: ['Artisanal Wine & Truffle Box', 'Tuscan Leather Folio', 'Gold Foil Engraved Plaque', 'Luxury Presentation Chest'],
    moq: 'Min. 5 Units',
    price: 280,
    originalPrice: 340,
    popular: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: 'Global Summit & Gala Attendees Set',
    tagline: 'High-Impact Branded Keepsakes for Large Corporate Events',
    included: ['Wireless Executive Desk Pad', 'Bamboo & Steel Coffee Set', 'Custom Branded Box Sleeve'],
    moq: 'Min. 50 Units',
    price: 140,
    originalPrice: 175,
    popular: false,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    name: 'ESG Eco-Sustainability Corporate Hamper',
    tagline: '100% Certified Carbon-Neutral & Zero-Plastic Gift Suite',
    included: ['Organic Tea & Honey Set', 'Bamboo Thermal Tumbler', 'Recycled Linen Notebook', 'Tree Planted per Box'],
    moq: 'Min. 15 Units',
    price: 115,
    originalPrice: 145,
    popular: false,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  }
];

export const customizationMethods = [
  {
    id: 'm1',
    name: 'Precision Laser Engraving',
    description: 'Crisp, permanent metallic or wood etching for logos, recipient names, and serial numbers.',
    bestFor: 'Metal tumblers, wireless chargers, tech devices, wooden boxes.'
  },
  {
    id: 'm2',
    name: 'Blind & Gold Foil Debossing',
    description: 'Subtle indented leather stamping or shimmering 24k gold foil pressed into journals and leatherware.',
    bestFor: 'Italian leather folios, weekender bags, premium cardstock.'
  },
  {
    id: 'm3',
    name: 'Bespoke Custom Box Sleeves',
    description: 'Full-color edge-to-edge custom printed outer box sleeves with your company brand guidelines.',
    bestFor: 'All presentation boxes, onboarding kits, holiday hampers.'
  },
  {
    id: 'm4',
    name: 'Hand-Poured Wax Seals & Ribbons',
    description: 'Bespoke wax seals carrying your corporate crest, wrapped with woven satin corporate ribbons.',
    bestFor: 'VIP client letters, executive wine crates, holiday gifts.'
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Dedicated Corporate Concierge',
    desc: 'Assigned account manager handles sample requests, design mockups, and logistics seamlessly.'
  },
  {
    id: 2,
    title: 'Multi-Address Global Fulfillment',
    desc: 'Ship individually to 10,000+ remote employee home addresses or bulk deliver to event venues.'
  },
  {
    id: 3,
    title: '100% Brand Consistency Guarantee',
    desc: 'Digital mockups and physical pre-production samples provided before mass production.'
  },
  {
    id: 4,
    title: 'Flexible MOQs & Scale',
    desc: 'Whether you need 5 VIP C-Suite hampers or 5,000 gala welcome boxes, we scale effortlessly.'
  },
  {
    id: 5,
    title: 'Instant Corporate Invoicing & Net-30',
    desc: 'Streamlined enterprise billing with tax invoices, purchase order support, and flexible terms.'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Victoria Sterling',
    role: 'VP of Global People Ops, TechCorp',
    service: 'Onboarding Kit Suite (2,400 Boxes)',
    rating: 5,
    review: 'Aura Luxe elevated our new hire onboarding experience tenfold. The quality of the leather folios and custom wireless desk pads exceeded all our expectations. Delivery to 14 countries was flawless!',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'Head of Enterprise Events, Horizon Financial',
    service: 'VIP Executive Wine Chests',
    rating: 5,
    review: 'Our C-suite clients were blown away by the mahogany chests and custom laser engraving. Aura Luxe is our go-to partner for high-stakes corporate gifting.',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Chief Brand Officer, Lumina Group',
    service: 'Annual Partner Appreciation Gifts',
    rating: 5,
    review: 'The instant quote builder made budgeting effortless, and the physical sample arrived at my office within 48 hours. Absolute perfection.',
    featured: false,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  }
];

export const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    title: 'Custom Branded Packaging',
    subtitle: 'Matte black magnetic box with gold foil seal'
  },
  {
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    title: 'Italian Leather Monogramming',
    subtitle: 'Blind debossed corporate initials'
  },
  {
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    title: 'Executive Reserve hampers',
    subtitle: 'Fire-branded wooden crate with wax seal'
  },
  {
    url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    title: 'Precision Laser Tech Etching',
    subtitle: 'Wireless chargers & desk accessories'
  }
];

export const clientLogos = [
  { name: 'TechCorp', symbol: '❖ TechCorp' },
  { name: 'Horizon Financial', symbol: '▲ Horizon' },
  { name: 'Vertex Group', symbol: '● Vertex' },
  { name: 'InnovateX', symbol: '◆ InnovateX' },
  { name: 'Global Logistics', symbol: '✦ Global' }
];

export const contactDetails = {
  address: 'Suite 3800, 500 Executive Parkway, New York, NY 10022',
  phone: '+1 (800) 589-9438 / +1 (212) 555-0192',
  email: 'concierge@auraluxegifts.com',
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 7:00 PM EST' },
    { days: 'Saturday (Concierge Hotline)', time: '9:00 AM – 4:00 PM EST' }
  ]
};

