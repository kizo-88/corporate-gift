export const categories = [
  { id: 'all', name: 'All Treatments' },
  { id: 'hair', name: 'Hair Styling' },
  { id: 'facial', name: 'Facials' },
  { id: 'massage', name: 'Massage Therapy' },
  { id: 'nails', name: 'Nail Care' },
  { id: 'brows', name: 'Brow & Lash' },
  { id: 'wellness', name: 'Wellness Rituals' }
];

export const services = [
  {
    id: 's1',
    category: 'hair',
    name: 'Signature Hair Styling & Cut',
    shortDesc: 'Custom hair consultation, revitalizing wash, precision cut, and editorial blow-dry finish.',
    duration: '60 mins',
    price: 120,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    category: 'hair',
    name: 'Botanical Hair Spa Treatment',
    shortDesc: 'Deep scalp detoxification and nourishing plant oil therapy for glossy, healthy tresses.',
    duration: '75 mins',
    price: 160,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's3',
    category: 'facial',
    name: 'Signature Lumé Glow Facial',
    shortDesc: 'Deep cleansing, double exfoliation, hyaluronic hydration infusion, and soothing facial massage.',
    duration: '75 mins',
    price: 180,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's4',
    category: 'facial',
    name: 'Cellular Renewal Peel',
    shortDesc: 'Gentle AHA acid resurfacing combined with red light therapy to stimulate collagen regeneration.',
    duration: '60 mins',
    price: 210,
    image: 'https://images.unsplash.com/photo-1512290900673-700200411b51?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's5',
    category: 'massage',
    name: 'Aromatherapy Sanctuary Massage',
    shortDesc: 'Custom essential oil blend with rhythmic Swedish techniques to dissolve tension and restore balance.',
    duration: '90 mins',
    price: 220,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's6',
    category: 'massage',
    name: 'Deep Tissue Muscle Release',
    shortDesc: 'Targeted pressure therapy focusing on deep muscle layers to alleviate persistent tightness.',
    duration: '60 mins',
    price: 195,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's7',
    category: 'nails',
    name: 'Luxury Spa Manicure',
    shortDesc: 'Exfoliating rose scrub, cuticle care, hand hydration mask, massage, and premium non-toxic polish.',
    duration: '45 mins',
    price: 95,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's8',
    category: 'nails',
    name: 'Velvet Gel Pedicure',
    shortDesc: 'Essential foot soak, smoothing pumice treatment, gel color application, and foot massage.',
    duration: '60 mins',
    price: 130,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's9',
    category: 'brows',
    name: 'Precision Brow Sculpting',
    shortDesc: 'Custom brow map styling, organic wax shaping, trimming, and custom tinting for perfect arches.',
    duration: '30 mins',
    price: 75,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's10',
    category: 'brows',
    name: 'Keratin Lash Lift & Tint',
    shortDesc: 'Nourishing lash lamination to curl and darken natural eyelashes for an open, youthful gaze.',
    duration: '50 mins',
    price: 140,
    image: 'https://images.unsplash.com/photo-1583001809873-a1284d5630d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's11',
    category: 'wellness',
    name: 'Lumé Holistic Wellness Ritual',
    shortDesc: 'Full body dry brushing, warm herbal oil body wrap, sound bowl meditation, and scalp therapy.',
    duration: '100 mins',
    price: 280,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80'
  }
];

export const specialists = [
  {
    id: 'sp1',
    name: 'Alya Rahman',
    role: 'Senior Hair Stylist',
    specialty: 'Precision Cut & Organic Scalp Spa',
    experience: '7+ Years',
    rating: '4.9',
    reviewsCount: 142,
    intro: 'Alya specializes in effortless, lived-in haircuts and restorative botanical hair therapies tailored to individual face shapes.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp2',
    name: 'Mei Lin Tan',
    role: 'Lead Skin Therapist',
    specialty: 'Hydra Glow & Advanced Dermal Facials',
    experience: '9+ Years',
    rating: '5.0',
    reviewsCount: 198,
    intro: 'Mei Lin blends clinical skin science with relaxing holistic facial touch to treat skin concerns from deep within.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp3',
    name: 'Sarah Ismail',
    role: 'Senior Massage Therapist',
    specialty: 'Aromatherapy & Deep Tissue Healing',
    experience: '8+ Years',
    rating: '4.9',
    reviewsCount: 165,
    intro: 'Trained in Eastern and Western bodywork, Sarah intuitively customizes pressure points to release physical stress.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sp4',
    name: 'Nadia Lee',
    role: 'Nail & Brow Artist',
    specialty: 'Keratin Lash Lamination & Luxury Nail Art',
    experience: '6+ Years',
    rating: '4.8',
    reviewsCount: 120,
    intro: 'Nadia is celebrated for her meticulous attention to brow architecture and minimalist, healthy nail care.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  }
];

export const packages = [
  {
    id: 'p1',
    name: 'Glow Reset',
    tagline: 'Deep Cleanse & Mindful Relaxation',
    included: ['Signature Facial (75m)', 'Aromatherapy Massage (60m)'],
    duration: '2.5 Hours',
    price: 320,
    originalPrice: 380,
    popular: true
  },
  {
    id: 'p2',
    name: 'Weekend Recharge',
    tagline: 'Total Body & Hand Pampering',
    included: ['Deep Tissue Massage (60m)', 'Luxury Spa Manicure (45m)', 'Scalp Therapy (15m)'],
    duration: '2 Hours',
    price: 350,
    originalPrice: 410,
    popular: false
  },
  {
    id: 'p3',
    name: 'Bridal Preparation',
    tagline: 'Head-to-Toe Luminescent Glow',
    included: ['Botanical Hair Spa (60m)', 'Signature Glow Facial (75m)', 'Luxury Manicure & Pedicure (90m)'],
    duration: '3.5 Hours',
    price: 520,
    originalPrice: 620,
    popular: true
  },
  {
    id: 'p4',
    name: 'Executive Wellness',
    tagline: 'Ultimate Rejuvenation Sanctuary',
    included: ['Aromatherapy Massage (90m)', 'Cellular Renewal Facial (60m)', 'Holistic Wellness Ritual (90m)'],
    duration: '4 Hours',
    price: 580,
    originalPrice: 710,
    popular: false
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Experienced Specialists',
    desc: 'Certified practitioners with over 5+ years of dedicated expertise in beauty science and holistic therapy.'
  },
  {
    id: 2,
    title: 'Premium Products',
    desc: 'We exclusively use organic, non-toxic, and dermatologically tested botanical skincare and oils.'
  },
  {
    id: 3,
    title: 'Personalized Treatments',
    desc: 'Every session begins with a bespoke consultation to align treatments with your specific needs.'
  },
  {
    id: 4,
    title: 'Seamless Online Booking',
    desc: 'Select your preferred artist, choose convenient time slots, and manage appointments effortlessly.'
  },
  {
    id: 5,
    title: 'Calm & Serene Environment',
    desc: 'Thoughtfully designed interior with soothing acoustic resonance, warm lighting, and private suites.'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Verified Client',
    service: 'Signature Lumé Glow Facial',
    rating: 5,
    review: 'Lumé Studio is truly an oasis of tranquil luxury. Mei Lin analyzed my skin concerns with such care. My skin hasn’t glowed like this in years!',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'Sophia Chen',
    role: 'Regular Member',
    service: 'Glow Reset Package',
    rating: 5,
    review: 'The attention to detail from the moment you step through the doors is immaculate. The warm herbal tea and quiet suite made all my work stress melt away.',
    featured: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'Amira Azman',
    role: 'Verified Client',
    service: 'Signature Hair Styling & Cut',
    rating: 5,
    review: 'Alya transformed my dry hair into glossy perfection. The scalp massage during the wash was heavenly. Worth every single ringgit.',
    featured: false,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
  }
];

export const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    title: 'Private Treatment Suite',
    subtitle: 'Quiet relaxation sanctuary'
  },
  {
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    title: 'Botanical Elixirs',
    subtitle: '100% Organic certified formulas'
  },
  {
    url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
    title: 'Lumé Reception Lounge',
    subtitle: 'Warm ivory aesthetics'
  },
  {
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    title: 'Holistic Massage Chamber',
    subtitle: 'Heated beds & essential oils'
  }
];

export const timeSlots = [
  '9:00 AM',
  '10:30 AM',
  '12:00 PM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM'
];

export const contactDetails = {
  address: '18, Jalan Telawi 3, Bangsar, 59100 Kuala Lumpur, Malaysia',
  phone: '+60 3-2284 8920',
  email: 'hello@lumestudio.my',
  hours: [
    { days: 'Monday – Friday', time: '10:00 AM – 8:00 PM' },
    { days: 'Saturday – Sunday', time: '9:00 AM – 7:00 PM' }
  ]
};
