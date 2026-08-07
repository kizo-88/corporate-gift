import React from "react";
import { useGiftContext } from "../context/GiftContext";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Building2,
  Gift,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Boxes
} from "lucide-react";

export default function Hero() {
  const { setActiveTab, setIsQuoteModalOpen } = useGiftContext();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Next-Gen Enterprise Gifting Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-slate-400">Trusted by Fortune 500 HR & Sales Execs</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight tracking-tight">
            Elevate Enterprise Relationships With{" "}
            <span className="gold-gradient-text serif-font italic font-normal">
              Tailored Luxury Gifting
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curated executive gift boxes, automated remote team drop-shipping, and precision logo branding. Engineered for VIP client appreciation, team milestones, and executive onboarding.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab("builder")}
              className="btn-primary text-sm py-3.5 px-8 shadow-xl shadow-amber-500/25"
            >
              <Boxes className="w-5 h-5 text-slate-950" />
              <span>Launch Build-a-Box Studio</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab("catalog")}
              className="btn-secondary text-sm py-3.5 px-8"
            >
              <Gift className="w-5 h-5 text-amber-400" />
              <span>Browse Ready Gift Collections</span>
            </button>

            <button
              onClick={() => setActiveTab("estimator")}
              className="btn-ghost text-sm text-slate-300 hover:text-white flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Volume Discount Calculator</span>
            </button>
          </div>

          {/* Key Value Props Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="glass-panel p-4 rounded-xl border-slate-800/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Truck className="w-4 h-4" />
                <span>Multi-Address Shipping</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Individual Remote Home Drops</p>
              <p className="text-xs text-slate-400 mt-0.5">Ship to 5,000+ addresses seamlessly</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Custom Logo Studio</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Foil, Engrave & Deboss</p>
              <p className="text-xs text-slate-400 mt-0.5">Precision proofing in 24 hours</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/80">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                <span>Enterprise Portal</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Magic Link Redemption</p>
              <p className="text-xs text-slate-400 mt-0.5">Recipients choose address & sizes</p>
            </div>

            <div className="glass-panel p-4 rounded-xl border-slate-800/80">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tier Discounts</span>
              </div>
              <p className="text-sm font-semibold text-slate-200">Up to 35% Volume Savings</p>
              <p className="text-xs text-slate-400 mt-0.5">Transparent instant pricing</p>
            </div>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-10 border-t border-slate-800/60 flex flex-wrap justify-around items-center gap-6 text-center text-slate-400">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-heading">
                50,000+
              </div>
              <div className="text-xs font-medium uppercase tracking-wider">Executive Boxes Delivered</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-slate-100 font-heading">
                99.8%
              </div>
              <div className="text-xs font-medium uppercase tracking-wider">On-Time Global Delivery</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-heading">
                450+
              </div>
              <div className="text-xs font-medium uppercase tracking-wider">Fortune 500 Clients</div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-cyan-400 font-heading">
                100%
              </div>
              <div className="text-xs font-medium uppercase tracking-wider">Carbon Neutral Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
