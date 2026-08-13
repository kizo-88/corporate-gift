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
    { id: "catalog", label: "Home" },
    { id: "products", label: "Gifts" },
    { id: "builder", label: "Build a Box" },
    { id: "estimator", label: "Corporate" },
    { id: "branding", label: "Branding" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="container mx-auto h-24 flex items-center justify-between">
        {/* Brand Logo - Left */}
        <div
          onClick={() => setActiveTab("catalog")}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-wider text-slate-100 font-heading">
              KIZO <span className="gold-gradient-text">GIFTS</span>
            </span>
            <p className="text-[11px] text-slate-400 tracking-widest uppercase font-semibold">
              Bespoke Corporate Gifting
            </p>
          </div>
        </div>

        {/* Middle Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`text-base font-semibold transition-all relative py-2 ${
                  isActive
                    ? "text-amber-400 font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-4">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-xl p-1.5">
            <Globe className="w-4 h-4 text-slate-400 ml-1.5" />
            {Object.keys(currencySymbols).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === curr
                    ? "bg-amber-500 text-slate-950 shadow"
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
            className="relative p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/50 hover:text-amber-400 transition-all"
            aria-label="Open Quote Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Request Quote CTA Button */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="hidden md:flex btn-primary text-sm py-3 px-6 shadow-lg shadow-amber-500/20"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Request Quote</span>
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
