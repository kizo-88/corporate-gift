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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Malaysia's Premium Corporate Gifting Partner</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-slate-400">Doorstep & Bulk Delivery</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight tracking-tight">
              Elevate Enterprise Relationships With{" "}
              <span className="gold-gradient-text serif-font italic font-normal">
                Bespoke Premium Gifts
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Curated luxury gift sets, custom branding, and seamless doorstep delivery across Malaysia and worldwide for VIP clients and high-performing teams.
            </p>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("product-catalog-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else setActiveTab("products");
                }}
                className="btn-primary text-sm py-3.5 px-8 shadow-xl shadow-amber-500/25"
              >
                <Gift className="w-5 h-5 text-slate-950" />
                <span>Shop Gifts</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-secondary text-sm py-3.5 px-8"
              >
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Request a Quote</span>
              </button>

              <button
                onClick={() => setActiveTab("builder")}
                className="btn-ghost text-sm text-slate-300 hover:text-amber-400 flex items-center gap-2"
              >
                <Boxes className="w-4 h-4 text-emerald-400" />
                <span>Build a Gift Box</span>
              </button>
            </div>

            {/* Key Value Props Bar */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Nationwide & Global Delivery</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Individual home drops & multi-address shipping</p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Custom Logo Printing</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Foil stamping, laser engraving & debossing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Corporate Gift Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-amber-500/30 via-slate-800 to-amber-500/10 shadow-2xl shadow-amber-500/10">
              <div className="bg-slate-900 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                  alt="Corporate Executive Gift Box"
                  className="w-full h-80 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">C-Suite Bestseller</span>
                    <h3 className="text-sm font-bold text-white">Executive Welcoming Gift Box</h3>
                    <p className="text-xs text-slate-400">Includes Saffiano Journal, ANC Earbuds & Tumbler</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Starting from</span>
                    <p className="text-lg font-black text-amber-400">RM 450</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -top-4 -left-4 glass-panel px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2 shadow-xl">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-200">100% On-Time Delivery Guarantee</span>
            </div>
          </div>
        </div>

        {/* Social Proof Stats Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/60 flex flex-wrap justify-around items-center gap-6 text-center text-slate-400">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-heading">
              50,000+
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">Executive Gifts Delivered</div>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-100 font-heading">
              99.8%
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">On-Time Malaysia Delivery</div>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-heading">
              450+
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">Enterprise Corporate Clients</div>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block" />
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-cyan-400 font-heading">
              RM 0
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">Design & Proofing Fee</div>
          </div>
        </div>
      </div>
    </section>
  );
}
