const { useState, useEffect, useRef, useMemo } = React;

// --- Mock Database & Products ---
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'The Sovereign Executive Box',
    category: 'VIP Luxury',
    price: 185,
    minQty: 25,
    leadTime: '3-5 Business Days',
    rating: 4.9,
    reviewsCount: 128,
    image: './assets/images/executive_walnut_box.png',
    description: 'An handcrafted solid walnut wood gift chest featuring a smart temperature-control thermal mug, Italian full-grain leather notebook, heavy weighted brass gel pen, and gold foil embossed custom greeting card.',
    tags: ['Best Seller', 'Handcrafted', 'C-Suite Ready'],
    specs: ['Solid American Walnut Chest', 'Smart Ember Thermal Mug (14 oz)', 'Italian Leather Journal (192 Pages)', 'Solid Brass Executive Pen']
  },
  {
    id: 'prod-2',
    name: 'Neptune Tech Onboarding Kit',
    category: 'Executive Tech',
    price: 145,
    minQty: 10,
    leadTime: '2-4 Business Days',
    rating: 4.8,
    reviewsCount: 94,
    image: './assets/images/luxury_tech_kit.png',
    description: 'High-performance workspace essentials including active noise-canceling wireless headphones, 10,000mAh magnetic power bank, vacuum insulated smart bottle, and desk organizer.',
    tags: ['Tech Favorite', 'Remote Onboarding'],
    specs: ['ANC Wireless Headphones (30h battery)', 'MagSafe Fast Power Bank', 'Insulated Smart Bottle with Temp LED', 'Vegan Leather Extended Desk Mat']
  },
  {
    id: 'prod-3',
    name: 'Artisan Gourmet Reserve Hamper',
    category: 'Gourmet Foods',
    price: 120,
    minQty: 20,
    leadTime: '2-3 Business Days',
    rating: 5.0,
    reviewsCount: 156,
    image: './assets/images/gourmet_treats_box.png',
    description: 'Curated taste of luxury featuring hand-dipped Belgian pralines, single-origin Ethiopian roasted coffee beans, wild organic raw honeycomb jar, and dry roasted macadamia nuts.',
    tags: ['Gluten-Free Option', 'Holiday Top Pick'],
    specs: ['Hand-crafted Pralines Box (16pc)', 'Ethiopian Yirgacheffe Beans (250g)', 'Organic Honeycomb Glass Jar (200g)', 'Macadamia & Truffle Nuts Trio']
  },
  {
    id: 'prod-4',
    name: 'Verdant Eco-Conscious Wellness Set',
    category: 'Eco-Conscious',
    price: 95,
    minQty: 30,
    leadTime: '3-5 Business Days',
    rating: 4.7,
    reviewsCount: 82,
    image: './assets/images/eco_wellness_kit.png',
    description: 'Sustainable corporate care package crafted with FSC-certified natural bamboo thermal bottle, hand-poured soy wax candle, recycled hemp journal, and desk ceramic succulent plant.',
    tags: ['100% Recyclable', 'Carbon Neutral Shipping'],
    specs: ['Bamboo & Steel Tumbler (500ml)', 'French Lavender Soy Candle (8 oz)', 'Recycled Hemp Fiber Journal', 'Mini Ceramic Succulent Pot']
  },
  {
    id: 'prod-5',
    name: 'The Monogram Leather Portfolio',
    category: 'VIP Luxury',
    price: 160,
    minQty: 15,
    leadTime: '4-6 Business Days',
    rating: 4.9,
    reviewsCount: 64,
    image: './assets/images/executive_walnut_box.png',
    description: 'Full-grain Horween leather document sleeve with built-in 15W wireless charging pad, tablet sleeve, and customized foil debossed initials.',
    tags: ['Custom Debossing', 'Leather Craft'],
    specs: ['Horween Genuine Leather', 'Qi 15W Wireless Charging Flap', 'Fits 14" MacBook / iPad Pro', 'Solid Stainless Zipper']
  },
  {
    id: 'prod-6',
    name: 'Aether Wireless Fast Charging Dock',
    category: 'Executive Tech',
    price: 75,
    minQty: 50,
    leadTime: '2-3 Business Days',
    rating: 4.6,
    reviewsCount: 110,
    image: './assets/images/luxury_tech_kit.png',
    description: 'Precision machined anodized aluminum 3-in-1 charging stand for smartphone, smartwatch, and earbuds with laser-etched corporate branding.',
    tags: ['Laser Engraved', 'Compact'],
    specs: ['Anodized Space Gray Aluminum', 'Fast Charge 3-in-1 Array', 'Includes Braided 6ft USB-C Cable', 'Custom Laser Logo Placement']
  }
];

const PACKAGING_OPTIONS = [
  { id: 'pack-walnut', name: 'Handcrafted Walnut Chest', price: 35, image: './assets/images/executive_walnut_box.png' },
  { id: 'pack-black', name: 'Matte Obsidian Eco-Box', price: 18, image: './assets/images/luxury_tech_kit.png' },
  { id: 'pack-gold', name: 'Gold Magnetic Rigid Box', price: 24, image: './assets/images/gourmet_treats_box.png' },
  { id: 'pack-linen', name: 'Natural Organic Linen Tote', price: 12, image: './assets/images/eco_wellness_kit.png' }
];

const GIFT_ITEMS_CATALOG = [
  { id: 'item-mug', name: 'Ember Smart Thermal Mug', category: 'Tech', price: 65, icon: 'coffee' },
  { id: 'item-journal', name: 'Full-Grain Leather Journal', category: 'Stationery', price: 32, icon: 'book-open' },
  { id: 'item-powerbank', name: 'Magnetic 10K Power Bank', category: 'Tech', price: 42, icon: 'battery-charging' },
  { id: 'item-chocolates', name: 'Belgian Truffle Box (12pc)', category: 'Gourmet', price: 28, icon: 'gift' },
  { id: 'item-pen', name: 'Weighted Brass Rollerball Pen', category: 'Stationery', price: 25, icon: 'pen-tool' },
  { id: 'item-candle', name: 'French Soy Wax Candle', category: 'Wellness', price: 24, icon: 'sparkles' },
  { id: 'item-thermos', name: 'Vacuum Insulated Tumbler', category: 'Drinkware', price: 30, icon: 'glass-water' },
  { id: 'item-coffee', name: 'Artisan Coffee Beans (250g)', category: 'Gourmet', price: 18, icon: 'bean' }
];

const CLIENT_LOGOS = ['GOOGLE', 'STRIPE', 'MICROSOFT', 'META', 'SEQUOIA', 'SNOWFLAKE'];

// --- Helper Functions ---
const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

// --- Main App Component ---
function App() {
  // Application State
  const [theme, setTheme] = useState('dark');
  const [quoteItems, setQuoteItems] = useState([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCatalogTab, setActiveCatalogTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Gift Box Builder State
  const [builderPackaging, setBuilderPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [builderSelectedItems, setBuilderSelectedItems] = useState([GIFT_ITEMS_CATALOG[0], GIFT_ITEMS_CATALOG[1]]);
  const [builderQuantity, setBuilderQuantity] = useState(50);
  const [builderSleeveColor, setBuilderSleeveColor] = useState('Gold Foil');
  const [builderCardText, setBuilderCardText] = useState('Welcome to the Team! We are thrilled to shape the future with you.');
  const [builderCompanyName, setBuilderCompanyName] = useState('ACME CORP');

  // Logo Customizer State
  const [customizerText, setCustomizerText] = useState('ACME CORP');
  const [customizerFinish, setCustomizerFinish] = useState('gold');

  // Bulk Estimator State
  const [estQuantity, setEstQuantity] = useState(100);
  const [estShipping, setEstShipping] = useState('multi'); // 'single' or 'multi'
  const [estSleeve, setEstSleeve] = useState(true);
  const [estEngraving, setEstEngraving] = useState(true);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toast Notification Helper
  const showToast = (message, title = 'Success') => {
    setToast({ title, message, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  // Add Item to Quote Drawer
  const addToQuote = (item, qty = 1, customConfig = null) => {
    const newItem = {
      id: `${item.id}-${Date.now()}`,
      product: item,
      quantity: qty,
      customConfig: customConfig,
      unitPrice: customConfig ? customConfig.calculatedUnitPrice : item.price
    };
    setQuoteItems(prev => [...prev, newItem]);
    showToast(`Added "${item.name}" (${qty} units) to your corporate quote.`, 'Added to Quote');
    setIsQuoteDrawerOpen(true);
  };

  // Remove Item from Quote
  const removeFromQuote = (quoteId) => {
    setQuoteItems(prev => prev.filter(i => i.id !== quoteId));
  };

  // Calculate Builder Price
  const builderTotals = useMemo(() => {
    const itemsSum = builderSelectedItems.reduce((acc, curr) => acc + curr.price, 0);
    const boxBase = builderPackaging.price;
    const sleeveCost = builderSleeveColor !== 'None' ? 4 : 0;
    const rawPerBox = boxBase + itemsSum + sleeveCost;

    // Quantity Tier Discount
    let discountPct = 0;
    if (builderQuantity >= 500) discountPct = 0.25;
    else if (builderQuantity >= 200) discountPct = 0.20;
    else if (builderQuantity >= 50) discountPct = 0.10;

    const unitPrice = rawPerBox * (1 - discountPct);
    const totalPrice = unitPrice * builderQuantity;

    return { rawPerBox, discountPct, unitPrice, totalPrice };
  }, [builderPackaging, builderSelectedItems, builderQuantity, builderSleeveColor]);

  // GSAP Animations Initialization
  useEffect(() => {
    // Re-initialize Lucide Icons
    if (window.lucide) window.lucide.createIcons();

    // GSAP Scroll Animations
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      tl.fromTo('.gsap-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 })
        .fromTo('.gsap-hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
        .fromTo('.gsap-hero-cta', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.gsap-hero-card', { opacity: 0, y: 50, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2 }, '-=0.6');

      // Reveal Sections on Scroll
      gsap.utils.toArray('.gsap-reveal-section').forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCategory = activeCatalogTab === 'All' || prod.category === activeCatalogTab;
      const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCatalogTab, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-4 rounded-xl shadow-2xl border border-amber-500/40 animate-bounce">
          <i data-lucide="check-circle" className="w-6 h-6 text-amber-400 dark:text-amber-600"></i>
          <div>
            <p className="font-semibold text-sm">{toast.title}</p>
            <p className="text-xs opacity-80">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-serif text-slate-950 font-extrabold text-xl tracking-tighter">A</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">AURA & CO.</span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">Executive Gifting</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-700 dark:text-slate-300">
            <a href="#catalog" className="hover:text-amber-500 transition-colors">Catalog</a>
            <a href="#builder" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
              <span>Gift Builder</span>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">Interactive</span>
            </a>
            <a href="#customizer" className="hover:text-amber-500 transition-colors">Logo Preview</a>
            <a href="#estimator" className="hover:text-amber-500 transition-colors">Bulk Estimator</a>
            <a href="#testimonials" className="hover:text-amber-500 transition-colors">Clients</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
            >
              {theme === 'dark' ? <i data-lucide="sun" className="w-5 h-5 text-amber-400"></i> : <i data-lucide="moon" className="w-5 h-5"></i>}
            </button>

            {/* Quote Drawer Button */}
            <button
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
            >
              <i data-lucide="shopping-bag" className="w-5 h-5"></i>
              {quoteItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gold-gradient-bg text-slate-950 font-bold text-xs flex items-center justify-center shadow-md">
                  {quoteItems.length}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <a
              href="#builder"
              className="hidden lg:inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all"
            >
              <span>Build Custom Box</span>
              <i data-lucide="arrow-right" className="w-4 h-4"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest">
                  <i data-lucide="sparkles" className="w-4 h-4 text-amber-500"></i>
                  <span>2026 Executive Corporate Collection</span>
                </div>

                <h1 className="gsap-hero-title font-serif text-4xl sm:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  Elevate Enterprise Relations With <span className="gold-gradient-text">Unrivaled Gifts.</span>
                </h1>

                <p className="gsap-hero-sub text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                  Bespoke corporate gifting engineered for enterprise impact. Custom logo foil stamping, curated artisanal items, automated bulk logistics, and automated home drop-shipping worldwide.
                </p>

                <div className="gsap-hero-cta flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="#builder"
                    className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl gold-gradient-bg text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all"
                  >
                    <span>Launch 3D Gift Box Builder</span>
                    <i data-lucide="box" className="w-5 h-5"></i>
                  </a>
                  <a
                    href="#catalog"
                    className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-semibold text-base hover:border-amber-500 transition-colors"
                  >
                    <span>Browse 2026 Catalog</span>
                    <i data-lucide="grid" className="w-5 h-5"></i>
                  </a>
                </div>

                {/* Key Metrics Row */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-3 gap-6">
                  <div>
                    <span className="block font-serif text-3xl font-extrabold text-slate-900 dark:text-white">150K+</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Gifts Delivered</span>
                  </div>
                  <div>
                    <span className="block font-serif text-3xl font-extrabold text-amber-500">99.8%</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">On-Time Logistics</span>
                  </div>
                  <div>
                    <span className="block font-serif text-3xl font-extrabold text-slate-900 dark:text-white">4.95 / 5</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Rating</span>
                  </div>
                </div>
              </div>

              {/* Right Visual Card (Floating 3D Box Preview) */}
              <div className="lg:col-span-5 relative">
                <div className="gsap-hero-card relative rounded-3xl overflow-hidden glass-panel p-4 border border-amber-500/30 shadow-2xl">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <img 
                      src="./assets/images/executive_walnut_box.png" 
                      alt="The Sovereign Executive Box" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    
                    {/* Floating Product Badge */}
                    <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 border border-amber-500/40">
                      ★ VIP Flagship Box
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Featured Executive Set</p>
                      <h3 className="font-serif text-2xl font-bold">The Sovereign Walnut Box</h3>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Includes Ember Mug, Leather Journal & Brass Pen</span>
                        <span className="font-bold text-amber-400 text-sm">$185 / box</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Interaction Floating Badge */}
                  <div className="mt-4 flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-900/80 rounded-xl text-xs">
                    <div className="flex items-center space-x-2">
                      <i data-lucide="shield-check" className="w-4 h-4 text-emerald-500"></i>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Free Custom Logo Foil Stamping Included</span>
                    </div>
                    <span className="text-amber-500 font-semibold">Min Qty: 25</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TRUST LOGOS MARQUEE */}
        <section className="py-10 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-6">
              Trusted By HR Executives & People Operations Teams Worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
              {CLIENT_LOGOS.map(logo => (
                <span key={logo} className="font-serif text-xl sm:text-2xl font-extrabold tracking-wider text-slate-800 dark:text-slate-200">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE 3D GIFT BOX BUILDER */}
        <section id="builder" className="gsap-reveal-section py-24 bg-slate-50 dark:bg-slate-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider">
                <i data-lucide="sliders" className="w-4 h-4"></i>
                <span>Custom Configurator</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                Interactive <span className="gold-gradient-text">Gift Box Builder</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Curate bespoke corporate boxes in real time. Choose packaging, select high-end executive gifts, add custom logo embossing, and see instant volume discounts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Builder Controls (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Step 1: Packaging Style */}
                <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full gold-gradient-bg text-slate-950 flex items-center justify-center font-bold text-xs">1</span>
                      <span>Select Packaging Box Style</span>
                    </h3>
                    <span className="text-xs text-amber-500 font-semibold">{builderPackaging.name} (+${builderPackaging.price})</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {PACKAGING_OPTIONS.map(pack => (
                      <button
                        key={pack.id}
                        onClick={() => setBuilderPackaging(pack)}
                        className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                          builderPackaging.id === pack.id
                            ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/5'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                        }`}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-slate-200 dark:bg-slate-800">
                          <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-semibold text-xs text-slate-900 dark:text-white line-clamp-1">{pack.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">${pack.price} / box</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Gift Item Selection */}
                <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full gold-gradient-bg text-slate-950 flex items-center justify-center font-bold text-xs">2</span>
                      <span>Choose Gift Items ({builderSelectedItems.length} selected)</span>
                    </h3>
                    <span className="text-xs text-slate-500">Pick 1 to 5 items</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GIFT_ITEMS_CATALOG.map(item => {
                      const isSelected = builderSelectedItems.some(i => i.id === item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (isSelected) {
                              setBuilderSelectedItems(prev => prev.filter(i => i.id !== item.id));
                            } else {
                              if (builderSelectedItems.length < 5) {
                                setBuilderSelectedItems(prev => [...prev, item]);
                              } else {
                                showToast('Maximum 5 items allowed per custom box.', 'Item Limit');
                              }
                            }
                          }}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/15'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              <i data-lucide={item.icon || 'gift'} className="w-4 h-4"></i>
                            </div>
                            <div>
                              <p className="font-semibold text-xs text-slate-900 dark:text-white">{item.name}</p>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">+${item.price}</span>
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300 dark:border-slate-700'
                            }`}>
                              {isSelected && <i data-lucide="check" className="w-3.5 h-3.5 stroke-[3]"></i>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Brand Personalization */}
                <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full gold-gradient-bg text-slate-950 flex items-center justify-center font-bold text-xs">3</span>
                    <span>Branding & Greeting Card</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Company Name for Embossing</label>
                      <input
                        type="text"
                        value={builderCompanyName}
                        onChange={(e) => setBuilderCompanyName(e.target.value)}
                        placeholder="e.g. ACME CORP"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Box Sleeve Foil Finish</label>
                      <select
                        value={builderSleeveColor}
                        onChange={(e) => setBuilderSleeveColor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      >
                        <option value="Gold Foil">Metallic Gold Foil (+ $4)</option>
                        <option value="Silver Foil">Silver Foil (+ $4)</option>
                        <option value="Blind Deboss">Blind Deboss (+ $4)</option>
                        <option value="None">No Sleeve ($0)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Custom Card Message</label>
                    <textarea
                      rows="2"
                      value={builderCardText}
                      onChange={(e) => setBuilderCardText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

              </div>

              {/* Right Column: Live Price & Order Summary Card (4 Cols) */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 p-6 rounded-2xl glass-panel border border-amber-500/40 shadow-2xl space-y-6">
                  
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                    <span className="text-xs uppercase tracking-widest font-bold text-amber-500">Live Configuration Summary</span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-1">Bespoke Custom Box</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Logo: <span className="font-semibold text-slate-800 dark:text-slate-200">{builderCompanyName || 'ACME CORP'}</span></p>
                  </div>

                  {/* Quantity Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Order Quantity:</span>
                      <span className="text-amber-500 text-sm">{builderQuantity} Boxes</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="1000"
                      step="25"
                      value={builderQuantity}
                      onChange={(e) => setBuilderQuantity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>25 units (Min)</span>
                      <span>200 (20% off)</span>
                      <span>500+ (25% off)</span>
                    </div>
                  </div>

                  {/* Included Items Preview Pill */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Selected Items ({builderSelectedItems.length}):</span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      <div className="text-xs flex justify-between text-slate-700 dark:text-slate-300">
                        <span>• {builderPackaging.name}</span>
                        <span className="text-slate-400">${builderPackaging.price}</span>
                      </div>
                      {builderSelectedItems.map(item => (
                        <div key={item.id} className="text-xs flex justify-between text-slate-700 dark:text-slate-300">
                          <span className="truncate pr-2">• {item.name}</span>
                          <span className="text-slate-400">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discount Banner */}
                  {builderTotals.discountPct > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <i data-lucide="tag" className="w-4 h-4"></i>
                        <span>Tier Discount Unlocked:</span>
                      </div>
                      <span className="font-extrabold text-sm">{builderTotals.discountPct * 100}% OFF</span>
                    </div>
                  )}

                  {/* Price Calculation Box */}
                  <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Base Unit Price:</span>
                      <span>${builderTotals.rawPerBox.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Discounted Unit Cost:</span>
                      <span className="font-bold text-emerald-500">${builderTotals.unitPrice.toFixed(2)} / box</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Estimated Total:</span>
                      <span className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white">
                        {formatCurrency(builderTotals.totalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Add to Quote Button */}
                  <button
                    onClick={() => {
                      const customBoxItem = {
                        id: `custom-box-${Date.now()}`,
                        name: `Custom Box (${builderPackaging.name})`,
                        category: 'Bespoke Box',
                        price: builderTotals.unitPrice,
                        image: builderPackaging.image,
                        description: `Custom box with ${builderSelectedItems.length} items for ${builderCompanyName}`
                      };
                      addToQuote(customBoxItem, builderQuantity, {
                        calculatedUnitPrice: builderTotals.unitPrice,
                        itemsCount: builderSelectedItems.length,
                        packaging: builderPackaging.name,
                        companyName: builderCompanyName
                      });
                    }}
                    className="w-full py-4 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                  >
                    <i data-lucide="plus-circle" className="w-5 h-5"></i>
                    <span>Add Custom Box to Quote</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    No payment required now. Digital proof & formal quote sent within 2 hours.
                  </p>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* LOGO CUSTOMIZER PREVIEWER */}
        <section id="customizer" className="gsap-reveal-section py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider">
                  <i data-lucide="palette" className="w-4 h-4"></i>
                  <span>Live Brand Preview</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  Preview Your Logo On <span className="gold-gradient-text">Luxury Gifts</span>
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Type your organization name below to see instant digital mockups of precision gold foil stamping, metallic silver etching, and deep blind debossing on high-end leather and metal products.
                </p>

                <div className="space-y-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Company / Brand Name</label>
                    <input
                      type="text"
                      value={customizerText}
                      onChange={(e) => setCustomizerText(e.target.value)}
                      placeholder="Type Brand Name..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">Engraving Finish</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setCustomizerFinish('gold')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          customizerFinish === 'gold' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        Gold Foil
                      </button>
                      <button
                        onClick={() => setCustomizerFinish('silver')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          customizerFinish === 'silver' ? 'border-slate-400 bg-slate-200 dark:bg-slate-800 text-slate-200' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        Silver Foil
                      </button>
                      <button
                        onClick={() => setCustomizerFinish('deboss')}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                          customizerFinish === 'deboss' ? 'border-amber-700 bg-amber-900/20 text-slate-300' : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        Blind Deboss
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Live Canvas Mockup */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-2xl p-8 flex flex-col items-center justify-center bg-slate-900 text-center group">
                  <img
                    src="./assets/images/executive_walnut_box.png"
                    alt="Leather Engraving Surface"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                  
                  {/* Digital Mockup Stamp */}
                  <div className="relative z-10 p-8 rounded-2xl border border-white/10 glass-panel max-w-md w-full shadow-2xl space-y-4 transition-transform group-hover:scale-105">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <i data-lucide="crown" className="w-6 h-6 text-amber-400"></i>
                    </div>

                    {/* Logo Stamp Display */}
                    <div className="py-4 border-y border-white/10">
                      <span className={`font-serif text-3xl sm:text-4xl font-extrabold tracking-widest block uppercase ${
                        customizerFinish === 'gold' ? 'foil-gold' : customizerFinish === 'silver' ? 'foil-silver' : 'blind-deboss'
                      }`}>
                        {customizerText || 'ACME CORP'}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase text-amber-400/80 font-bold block mt-1">
                        EST. 2026 • VIP CORPORATE EDITION
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-300">
                      <i data-lucide="check" className="w-3.5 h-3.5 text-amber-400"></i>
                      <span>High-Precision Laser Engraving Simulated</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SHADCN PRODUCT CATALOG WITH FILTER TABS */}
        <section id="catalog" className="gsap-reveal-section py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-3">
                  <i data-lucide="package" className="w-4 h-4"></i>
                  <span>Curated Sets</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                  Corporate Gift <span className="gold-gradient-text">Catalog</span>
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <i data-lucide="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search gifts, tech, leather..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
              {['All', 'VIP Luxury', 'Executive Tech', 'Gourmet Foods', 'Eco-Conscious'].map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCatalogTab(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCatalogTab === category
                      ? 'gold-gradient-bg text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(prod => (
                <div key={prod.id} className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden card-hover-lift flex flex-col group">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-900 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {prod.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{prod.category}</span>
                        <div className="flex items-center space-x-1 text-amber-500">
                          <i data-lucide="star" className="w-3.5 h-3.5 fill-current"></i>
                          <span className="font-bold">{prod.rating}</span>
                          <span className="text-slate-400">({prod.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Price & Actions Footer */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Min Qty: {prod.minQty}</span>
                        <span className="font-serif text-xl font-extrabold text-slate-900 dark:text-white">
                          ${prod.price} <span className="text-xs font-normal text-slate-400">/ box</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setQuickViewProduct(prod)}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors"
                          title="Quick View Specs"
                        >
                          <i data-lucide="eye" className="w-4 h-4"></i>
                        </button>
                        <button
                          onClick={() => addToQuote(prod, prod.minQty)}
                          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center space-x-1.5"
                        >
                          <i data-lucide="plus" className="w-4 h-4"></i>
                          <span>Add to Quote</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BULK QUOTE LOGISTICS ESTIMATOR */}
        <section id="estimator" className="gsap-reveal-section py-24 bg-slate-900 text-white relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Controls */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <i data-lucide="calculator" className="w-4 h-4"></i>
                  <span>Instant Pricing & Logistics</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
                  Bulk Enterprise <span className="gold-gradient-text">Logistics Estimator</span>
                </h2>

                <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                  Calculate instant multi-address employee home drop-shipping, volume pricing tiers, and estimated production turnaround times for international orders.
                </p>

                <div className="space-y-6 bg-slate-950/80 p-8 rounded-3xl border border-white/10 shadow-2xl">
                  
                  {/* Quantity Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-300">Recipient Volume:</span>
                      <span className="font-extrabold text-amber-400 text-lg">{estQuantity} Employees / Clients</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="1500"
                      step="25"
                      value={estQuantity}
                      onChange={(e) => setEstQuantity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Shipping Mode */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Fulfillment & Shipping Mode</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setEstShipping('single')}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          estShipping === 'single' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        <p className="font-bold text-sm">Single Bulk Address</p>
                        <p className="text-xs opacity-75">Delivered to main office HQ ($0 shipping surcharge)</p>
                      </button>

                      <button
                        onClick={() => setEstShipping('multi')}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          estShipping === 'multi' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/10 text-slate-400'
                        }`}
                      >
                        <p className="font-bold text-sm">Individual Drop-Shipping</p>
                        <p className="text-xs opacity-75">Shipped direct to employee homes (+$8.50/box)</p>
                      </button>
                    </div>
                  </div>

                  {/* Checkbox Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={estSleeve}
                        onChange={(e) => setEstSleeve(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span className="text-xs font-semibold text-slate-300">Custom Branded Outer Sleeve (+$4.00)</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={estEngraving}
                        onChange={(e) => setEstEngraving(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                      <span className="text-xs font-semibold text-slate-300">Laser Logo Engraving (Included Free)</span>
                    </label>
                  </div>

                </div>
              </div>

              {/* Right Estimated Output Breakdown Card */}
              <div className="lg:col-span-5">
                <div className="p-8 rounded-3xl glass-panel border border-amber-500/40 shadow-2xl space-y-6 bg-slate-950/90">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Estimated Logistics Breakdown</span>

                  {(() => {
                    const baseItemPrice = 110;
                    const shippingCost = estShipping === 'multi' ? 8.5 : 0;
                    const sleeveCost = estSleeve ? 4 : 0;
                    const perUnit = (baseItemPrice + shippingCost + sleeveCost) * (estQuantity >= 500 ? 0.75 : estQuantity >= 200 ? 0.8 : 0.9);
                    const totalEst = perUnit * estQuantity;

                    return (
                      <div className="space-y-4">
                        <div className="py-4 border-y border-white/10 space-y-3">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>Per-Box Cost:</span>
                            <span className="font-bold text-white">${perUnit.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>Fulfillment SLA:</span>
                            <span className="font-bold text-emerald-400">3-5 Business Days</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>Domestic & Intl Customs:</span>
                            <span className="font-bold text-emerald-400">Pre-Cleared</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-xs text-slate-400 block">Total Budget Estimate:</span>
                          <span className="font-serif text-4xl font-extrabold gold-gradient-text block mt-1">
                            {formatCurrency(totalEst)}
                          </span>
                        </div>

                        <button
                          onClick={() => showToast('Logistics proposal PDF generated successfully!', 'PDF Downloaded')}
                          className="w-full py-4 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                        >
                          <i data-lucide="download" className="w-5 h-5"></i>
                          <span>Download PDF Proposal & Quote</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="gsap-reveal-section py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-500">Executive Endorsements</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                What Fortune 500 <span className="gold-gradient-text">Leaders Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "AURA & CO. transformed our annual executive summit gifting. The custom walnut boxes with laser foil stamping left our board members stunned.",
                  author: "Sarah Jenkins",
                  role: "VP of People Operations",
                  company: "Stripe"
                },
                {
                  quote: "The multi-address drop shipping calculator made onboarding 400 remote engineers effortless. 100% on-time delivery across 14 countries.",
                  author: "Marcus Vance",
                  role: "Chief People Officer",
                  company: "Snowflake"
                },
                {
                  quote: "Unmatched quality. From the smart ember mugs to the horween leather portfolios, every item feels premium and deeply personal.",
                  author: "Elena Rostova",
                  role: "Head of Executive Events",
                  company: "Sequoia Capital"
                }
              ].map((t, idx) => (
                <div key={idx} className="p-8 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex text-amber-500 space-x-1">
                      {[...Array(5)].map((_, i) => <i key={i} data-lucide="star" className="w-4 h-4 fill-current"></i>)}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{t.author}</p>
                    <p className="text-xs text-amber-500 font-semibold">{t.role} — {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel max-w-2xl w-full rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-500"
            >
              <i data-lucide="x" className="w-5 h-5"></i>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-900">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{quickViewProduct.category}</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">{quickViewProduct.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{quickViewProduct.description}</p>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 block">Package Specifications:</span>
                  {quickViewProduct.specs.map((s, i) => (
                    <div key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <i data-lucide="check" className="w-3.5 h-3.5 text-amber-500"></i>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white">${quickViewProduct.price}</span>
                  <button
                    onClick={() => {
                      addToQuote(quickViewProduct, quickViewProduct.minQty);
                      setQuickViewProduct(null);
                    }}
                    className="px-5 py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs shadow-lg"
                  >
                    Add to Corporate Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHADCN SLIDE-OVER QUOTE DRAWER */}
      {isQuoteDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-950 h-full p-6 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <i data-lucide="file-text" className="w-5 h-5 text-amber-500"></i>
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Corporate Quote</h3>
                </div>
                <button
                  onClick={() => setIsQuoteDrawerOpen(false)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-white"
                >
                  <i data-lucide="x" className="w-5 h-5"></i>
                </button>
              </div>

              {/* Quote Items List */}
              {quoteItems.length === 0 ? (
                <div className="text-center py-16 space-y-4 text-slate-400">
                  <i data-lucide="package-open" className="w-12 h-12 mx-auto stroke-1 text-slate-500"></i>
                  <p className="text-sm font-medium">Your corporate quote drawer is empty.</p>
                  <a href="#builder" onClick={() => setIsQuoteDrawerOpen(false)} className="text-xs text-amber-500 font-bold hover:underline">
                    Build a custom gift box &rarr;
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map(item => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-500">{item.quantity} units @ ${item.unitPrice.toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromQuote(item.id)}
                        className="text-red-400 p-1 hover:bg-red-500/10 rounded-lg"
                      >
                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Quote Section */}
            {quoteItems.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Estimated Quote Total:</span>
                  <span className="font-serif text-2xl font-extrabold text-amber-500">
                    {formatCurrency(quoteItems.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0))}
                  </span>
                </div>

                <button
                  onClick={() => {
                    showToast('Official quote request submitted! Dedicated Account Executive will contact you in 2 hrs.', 'Quote Request Submitted');
                    setQuoteItems([]);
                    setIsQuoteDrawerOpen(false);
                  }}
                  className="w-full py-4 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <i data-lucide="send" className="w-5 h-5"></i>
                  <span>Submit Formal Corporate Quote</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-900 text-slate-400 py-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold text-white">AURA & CO.</span>
            <p className="leading-relaxed text-slate-400">The global benchmark in executive corporate gifting, custom branding, and automated employee drop-shipping.</p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Gifting Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#builder" className="hover:text-amber-400">Custom Gift Box Builder</a></li>
              <li><a href="#catalog" className="hover:text-amber-400">Executive VIP Sets</a></li>
              <li><a href="#customizer" className="hover:text-amber-400">Logo Embossing Preview</a></li>
              <li><a href="#estimator" className="hover:text-amber-400">Bulk Logistics Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Corporate Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400">Enterprise Procurement</a></li>
              <li><a href="#" className="hover:text-amber-400">Sustainability & ESG</a></li>
              <li><a href="#" className="hover:text-amber-400">Custom Packaging Proofs</a></li>
              <li><a href="#" className="hover:text-amber-400">Contact Account Specialist</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">Enterprise Newsletter</h4>
            <p>Subscribe for seasonal executive catalog releases.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="corporate@company.com" className="px-3 py-2 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 text-xs flex-1" />
              <button className="px-3 py-2 rounded-lg gold-gradient-bg text-slate-950 font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 flex justify-between text-[11px]">
          <p>&copy; 2026 AURA & CO. Enterprise Gifting Inc. All rights reserved.</p>
          <p>Privacy Policy • Terms of Procurement • Global Logistics SLA</p>
        </div>
      </footer>
    </div>
  );
}

// Render Application Root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
