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

        {/* Render Hero on Catalog tab for max impact */}
        {activeTab === "catalog" && <Hero />}

        {/* Dynamic Tab Content Renderer */}
        <main>
          {activeTab === "catalog" && <ProductCatalog />}
          {activeTab === "builder" && <GiftBoxBuilder />}
          {activeTab === "estimator" && <BulkEstimator />}
          {activeTab === "branding" && <BrandingStudio />}
          {activeTab === "portal" && <RecipientPortal />}
          {activeTab === "cases" && <ClientTestimonials />}
        </main>

        {/* Social Proof Section shown on main catalog */}
        {activeTab === "catalog" && <ClientTestimonials />}
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
