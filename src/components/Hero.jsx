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
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[75vh] lg:min-h-[85vh] flex items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28 border-b border-slate-800/80">
        {/* Soft Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-glow" />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Small Premium Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Bespoke Corporate Gifting Partner</span>
              </div>

              {/* Large Dominant Headline (64-80px desktop) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-slate-100 leading-[1.08] tracking-tight">
                Gifts That Make <br className="hidden sm:inline" />
                <span className="gold-gradient-text serif-font italic font-normal">
                  Business Feel Personal
                </span>
              </h1>

              {/* Short 2-3 Line Description */}
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed font-normal">
                Curated luxury gift boxes, custom logo branding, and seamless doorstep delivery across Malaysia for VIP clients and high-performing teams.
              </p>

              {/* ONLY 2 Primary Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => {
                    const el = document.getElementById("product-catalog-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else setActiveTab("products");
                  }}
                  className="btn-primary text-base py-4 px-9 shadow-xl shadow-amber-500/25"
                >
                  <Gift className="w-5 h-5 text-slate-950" />
                  <span>Explore Gifts</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-secondary text-base py-4 px-9"
                >
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span>Request a Quote</span>
                </button>
              </div>
            </div>

            {/* Right Column: One Large Premium Corporate Gift Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-slate-800 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium Executive Gift Set"
                  className="w-full h-[440px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30">
                  <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">Featured Collection</div>
                  <div className="text-lg font-bold text-white mt-0.5">The C-Suite Executive Box</div>
                  <div className="text-xs text-slate-400 mt-0.5">Handcrafted Saffiano leather, thermal tumbler & ANC audio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STANDALONE STATISTICS SECTION (BELOW HERO) */}
      <section className="py-16 md:py-20 bg-slate-900/60 border-b border-slate-800/80">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-400 font-heading">
                50,000+
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-300 tracking-wide uppercase">
                Gifts Delivered
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 font-heading">
                99.8%
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-300 tracking-wide uppercase">
                On-Time Delivery
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-400 font-heading">
                450+
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-300 tracking-wide uppercase">
                Corporate Clients
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-cyan-400 font-heading">
                RM 0
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-300 tracking-wide uppercase">
                Design & Proofing Fee
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
