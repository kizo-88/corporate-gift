import React, { useState } from "react";
import { useGiftContext, currencySymbols } from "../context/GiftContext";
import {
  Crown,
  ShoppingBag,
  Sliders,
  Sparkles,
  Layers,
  FileText,
  Users,
  Award,
  Globe,
  Menu,
  X,
  Plus
} from "lucide-react";

export default function Navbar() {
  const {
    cart,
    currency,
    setCurrency,
    setIsCartOpen,
    setIsQuoteModalOpen,
    activeTab,
    setActiveTab,
    savedQuotes
  } = useGiftContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navLinks = [
    { id: "catalog", label: "Gift Catalog", icon: ShoppingBag },
    { id: "builder", label: "Build-a-Box Studio", icon: Sparkles, badge: "Interactive" },
    { id: "estimator", label: "Bulk Estimator", icon: Sliders },
    { id: "branding", label: "Branding Studio", icon: Layers },
    { id: "portal", label: "Recipient Portal", icon: Users },
    { id: "cases", label: "Client Stories", icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab("catalog")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-wider text-slate-100 font-heading">
                AURA
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                LUXE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-widest uppercase -mt-0.5">
              Enterprise Gifting
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {Object.keys(currencySymbols).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                  currency === curr
                    ? "bg-slate-800 text-amber-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {curr} ({currencySymbols[curr]})
              </button>
            ))}
          </div>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/50 hover:text-amber-400 transition-all"
            aria-label="Open Quote Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Quick RFQ Quote CTA */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="hidden md:flex btn-primary text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Instant RFQ Quote</span>
            {savedQuotes.length > 0 && (
              <span className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded-full text-[10px]">
                {savedQuotes.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Select Currency:</span>
            <div className="flex gap-2">
              {Object.keys(currencySymbols).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    currency === curr
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
