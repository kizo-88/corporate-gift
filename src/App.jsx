import React from "react";
import { GiftProvider, useGiftContext } from "./context/GiftContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalog from "./components/ProductCatalog";
import GiftBoxBuilder from "./components/GiftBoxBuilder";
import BulkEstimator from "./components/BulkEstimator";
import BrandingStudio from "./components/BrandingStudio";
import RecipientPortal from "./components/RecipientPortal";
import ClientTestimonials from "./components/ClientTestimonials";
import QuoteCTA from "./components/QuoteCTA";
import CartDrawer from "./components/CartDrawer";
import ProductQuickViewModal from "./components/ProductQuickViewModal";
import QuoteModal from "./components/QuoteModal";
import Footer from "./components/Footer";

function MainAppContent() {
  const { activeTab } = useGiftContext();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      <div>
        <Navbar />

        {/* Home Tab: Full Luxurious Spacious Page Flow */}
        {activeTab === "catalog" && (
          <>
            <Hero />
            <ProductCatalog />
            <GiftBoxBuilder />
            <BulkEstimator />
            <BrandingStudio />
            <ClientTestimonials />
          </>
        )}

        {/* Individual Tab Specific Views */}
        <main>
          {activeTab === "products" && <ProductCatalog />}
          {activeTab === "builder" && <GiftBoxBuilder />}
          {activeTab === "estimator" && <BulkEstimator />}
          {activeTab === "branding" && <BrandingStudio />}
          {activeTab === "portal" && <RecipientPortal />}
          {activeTab === "cases" && <ClientTestimonials />}
        </main>

        {/* Pre-Footer Striking CTA */}
        <QuoteCTA />
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductQuickViewModal />
      <QuoteModal />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <GiftProvider>
      <MainAppContent />
    </GiftProvider>
  );
}
