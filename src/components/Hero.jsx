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
      {/* 1. HERO SECTION (Warm Cream Background) */}
      <section className="relative overflow-hidden min-h-[75vh] lg:min-h-[85vh] flex items-center bg-[#F7F1E7] py-20 lg:py-28 border-b border-[#E5D9C8]">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Small Premium Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFDF8] border border-[#C6A15B]/40 text-[#173F35] text-sm font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span>Bespoke Corporate Gifting Partner</span>
              </div>

              {/* Large Dominant Headline (Deep Forest Green with Gold Highlight) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-[#173F35] leading-[1.08] tracking-tight font-heading">
                Gifts That Make <br className="hidden sm:inline" />
                <span className="text-[#C6A15B] serif-font italic font-normal">
                  Business Feel Personal
                </span>
              </h1>

              {/* Short 2-3 Line Description */}
              <p className="text-lg md:text-xl text-[#6F6A62] max-w-xl leading-relaxed font-normal">
                Curated luxury gift boxes, custom logo branding, and seamless doorstep delivery across Malaysia for VIP clients and high-performing teams.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => {
                    const el = document.getElementById("product-catalog-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else setActiveTab("products");
                  }}
                  className="btn-primary text-base py-4 px-9"
                >
                  <Gift className="w-5 h-5 text-[#F7F1E7]" />
                  <span>Explore Gifts</span>
                  <ArrowRight className="w-4 h-4 text-[#F7F1E7]" />
                </button>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-secondary text-base py-4 px-9"
                >
                  <Building2 className="w-5 h-5 text-[#173F35]" />
                  <span>Request a Quote</span>
                </button>
              </div>
            </div>

            {/* Right Column: One Large Premium Corporate Gift Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5D9C8] bg-[#FFFDF8] group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium Executive Gift Set"
                  className="w-full h-[440px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#FFFDF8]/95 backdrop-blur-md border border-[#E5D9C8] shadow-lg">
                  <div className="text-xs uppercase font-bold text-[#C6A15B] tracking-wider">Featured Collection</div>
                  <div className="text-lg font-bold text-[#173F35] mt-0.5">The C-Suite Executive Box</div>
                  <div className="text-xs text-[#6F6A62] mt-0.5">Handcrafted Saffiano leather, thermal tumbler & ANC audio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STANDALONE STATISTICS SECTION (Soft Ivory Background) */}
      <section className="py-16 md:py-20 bg-[#FFFDF8] border-b border-[#E5D9C8]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173F35] font-heading">
                50,000+
              </div>
              <div className="text-sm md:text-base font-semibold text-[#6F6A62] tracking-wide uppercase">
                Gifts Delivered
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173F35] font-heading">
                99.8%
              </div>
              <div className="text-sm md:text-base font-semibold text-[#6F6A62] tracking-wide uppercase">
                On-Time Delivery
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173F35] font-heading">
                450+
              </div>
              <div className="text-sm md:text-base font-semibold text-[#6F6A62] tracking-wide uppercase">
                Corporate Clients
              </div>
            </div>

            <div className="space-y-2 p-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#C6A15B] font-heading">
                RM 0
              </div>
              <div className="text-sm md:text-base font-semibold text-[#6F6A62] tracking-wide uppercase">
                Design & Proofing Fee
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
