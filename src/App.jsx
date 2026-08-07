import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import GiftBoxBuilder from './components/GiftBoxBuilder';
import QuoteCalculator from './components/QuoteCalculator';
import ClientsAndTestimonials from './components/ClientsAndTestimonials';
import InquiryModal from './components/InquiryModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import { PRODUCTS, CATEGORIES } from './data/products';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Add Item to Sample Quote Cart
  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // GSAP Smooth Scroll Animations Initializer
  useEffect(() => {
    if (window.gsap) {
      window.gsap.from('header', { y: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Top Sticky Navbar */}
      <Navbar
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Body Flow */}
      <main style={{ flexGrow: 1 }}>
        <Hero onOpenInquiry={() => setIsInquiryOpen(true)} />
        
        <ProductCatalog 
          products={PRODUCTS}
          categories={CATEGORIES}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          searchTerm={searchTerm}
        />

        <GiftBoxBuilder 
          products={PRODUCTS}
          onAddBoxToCart={handleAddToCart}
        />

        <QuoteCalculator 
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />

        <ClientsAndTestimonials />
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Modals & Slide-out Drawers */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      <InquiryModal 
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

    </div>
  );
}

// Global window reference export for Standalone Browser execution fallback
if (typeof window !== 'undefined') {
  window.App = App;
}
