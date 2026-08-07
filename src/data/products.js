export const products = [
  {
    id: "box-exec-welcome",
    name: "The C-Suite Executive Onboarding Box",
    category: "Executive Onboarding",
    price: 185,
    rating: 4.9,
    reviewsCount: 128,
    moq: 5,
    leadTimeDays: 5,
    tag: "Bestseller",
    badgeColor: "gold",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    description: "An unboxing experience engineered for C-level leadership and VIP hires. Features genuine Italian saffiano leather notebook, precision thermal tumbler, ANC earbuds, and artisan dark chocolate.",
    items: [
      "Debossed Saffiano Leather Executive Journal",
      "Matte Black 24hr Thermal Infuser Tumbler (750ml)",
      "True-Wireless ANC Bluetooth Earbuds with Charging Case",
      "Single-Origin 72% Dark Chocolate Truffles from Switzerland",
      "Heavyweight Anodized Brass Ballpoint Pen"
    ],
    tiers: [
      { min: 1, max: 24, price: 185 },
      { min: 25, max: 99, price: 165 },
      { min: 100, max: 499, price: 145 },
      { min: 500, max: 9999, price: 129 }
    ],
    customizationOptions: ["Laser Engraved Logo", "Custom Foil Greeting Card", "Custom Box Lid Stamping"]
  },
  {
    id: "box-tech-luminary",
    name: "The Tech Luminary Kit",
    category: "Tech & Innovation",
    price: 240,
    rating: 5.0,
    reviewsCount: 94,
    moq: 10,
    leadTimeDays: 7,
    tag: "High Tech",
    badgeColor: "cyan",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "Curated for software teams, product launches, and dev summits. Includes a 3-in-1 magnetic wireless charging station, mechanical desktop clock, compact power bank, and blue-light blocking glasses.",
    items: [
      "MagSafe 3-in-1 Foldable Wireless Charging Stand",
      "10,000mAh Ultra-Slim Aluminum Power Bank",
      "Titanium Frame Anti-Blue Light Glasses",
      "Ergonomic Memory Foam Wrist Rest & Desk Mat",
      "Cold-Brew Coffee Concentrate Duo"
    ],
    tiers: [
      { min: 1, max: 24, price: 240 },
      { min: 25, max: 99, price: 215 },
      { min: 100, max: 499, price: 190 },
      { min: 500, max: 9999, price: 168 }
    ],
    customizationOptions: ["Custom UV Color Print", "LED Engraved Logo", "Branded Cable Wrap"]
  },
  {
    id: "box-eco-sustainability",
    name: "Verdant Horizon Eco-Gift Set",
    category: "Eco-Friendly",
    price: 110,
    rating: 4.8,
    reviewsCount: 210,
    moq: 15,
    leadTimeDays: 4,
    tag: "Carbon Neutral",
    badgeColor: "emerald",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    description: "100% sustainable materials certified by FSC & Climate Neutral. Features a live desk succulent in biodegradable pot, bamboo wireless speaker, organic cotton tote, and recycled steel flask.",
    items: [
      "Live Mini Desk Succulent in Reclaimed Clay Pot",
      "Natural Bamboo & Hemp Fabric Bluetooth Speaker",
      "Recycled Ocean Plastic Thermal Water Flask (600ml)",
      "Organic Heavy Duty Tote Bag with Cork Accents",
      "Seed Paper Notepad that Sprouts Wildflowers"
    ],
    tiers: [
      { min: 1, max: 24, price: 110 },
      { min: 25, max: 99, price: 98 },
      { min: 100, max: 499, price: 86 },
      { min: 500, max: 9999, price: 74 }
    ],
    customizationOptions: ["Eco Ink Screen Print", "Laser Etched Bamboo Logo", "Plantable Recycled Card"]
  },
  {
    id: "box-artisan-gourmet",
    name: "Global Artisan Sommelier & Treats",
    category: "Client Appreciation",
    price: 160,
    rating: 4.9,
    reviewsCount: 176,
    moq: 5,
    leadTimeDays: 3,
    tag: "VIP Luxury",
    badgeColor: "purple",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Deliver a memorable culinary experience to your key accounts and partners. Features non-alcoholic botanical aperitif, aged Dutch cheese wheel, olive wood board, and artisanal preserves.",
    items: [
      "French Non-Alcoholic Botanical Sparkling Wine (750ml)",
      "Handcrafted Olive Wood Charcuterie Board with Knife Set",
      "Aged Truffle Gouda Cheese Wheel (250g)",
      "Smoked Spanish Marcona Almonds",
      "Wildflower Honey & Olive Oil Crackers"
    ],
    tiers: [
      { min: 1, max: 24, price: 160 },
      { min: 25, max: 99, price: 142 },
      { min: 100, max: 499, price: 125 },
      { min: 500, max: 9999, price: 109 }
    ],
    customizationOptions: ["Custom Laser Burned Wood Board", "Monogrammed Wine Sleeve", "Wax Sealed Gift Tag"]
  },
  {
    id: "box-wellness-retreat",
    name: "Executive Zenith Wellness & Spa",
    category: "Wellness & Care",
    price: 135,
    rating: 4.9,
    reviewsCount: 88,
    moq: 10,
    leadTimeDays: 5,
    tag: "Mindfulness",
    badgeColor: "rose",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Recharge your high-performing team with a tranquil home relaxation suite. Hand-poured soy wax aromatherapy candle, mulberry silk eye mask, organic matcha blend, and therapeutic massage gun.",
    items: [
      "Percussive Pocket Massage Gun with 4 Speed Modes",
      "100% Pure Mulberry Silk Sleep Eye Mask",
      "Hand-Poured Amber Soy Candle (Sandalwood & Bergamot)",
      "Ceramic Tea Infuser Mug with Bamboo Lid",
      "Ceremonial Grade Uji Matcha Powder (50g)"
    ],
    tiers: [
      { min: 1, max: 24, price: 135 },
      { min: 25, max: 99, price: 120 },
      { min: 100, max: 499, price: 105 },
      { min: 500, max: 9999, price: 89 }
    ],
    customizationOptions: ["Custom Candle Label", "Embroidered Silk Pouch", "Personalized Wellness Journal"]
  },
  {
    id: "box-holiday-gala",
    name: "The Apex Annual Holiday Gala Hamper",
    category: "Holiday & Milestones",
    price: 295,
    rating: 5.0,
    reviewsCount: 312,
    moq: 5,
    leadTimeDays: 8,
    tag: "Seasonal VIP",
    badgeColor: "gold",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd48?auto=format&fit=crop&w=800&q=80",
    description: "The gold standard for end-of-year corporate recognition. Encased in a leatherette trunk with copper locks, containing champagne flutes, gold-embossed desk calendar, cocoa set, and gourmet treats.",
    items: [
      "Custom Copper-Plated Stainless Champagne Flutes (Set of 2)",
      "Gold Foil Desktop Perpetual Flip Calendar",
      "Belgian Chocolate Fondue & Marshmallow Gift Set",
      "Cashmere Blend Lounge Throw Blanket",
      "Handmade Brass Snowflake Ornament"
    ],
    tiers: [
      { min: 1, max: 24, price: 295 },
      { min: 25, max: 99, price: 260 },
      { min: 100, max: 499, price: 230 },
      { min: 500, max: 9999, price: 199 }
    ],
    customizationOptions: ["Engraved Trunk Brass Plate", "Monogram Flutes", "Custom Ribbon & Wax Seal"]
  }
];
