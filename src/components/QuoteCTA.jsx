import React from "react";
import { useGiftContext } from "../context/GiftContext";
import { Sparkles, FileText, ArrowRight, Building2 } from "lucide-react";

export default function QuoteCTA() {
  const { setIsQuoteModalOpen, setActiveTab } = useGiftContext();

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Elevate Your Brand Relationships</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-100 leading-tight">
          Ready to Create Something{" "}
          <span className="gold-gradient-text serif-font italic font-normal">
            Memorable?
          </span>
        </h2>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Request an instant official RFQ quote, lock volume pricing, or speak directly with our executive gifting concierges in Malaysia.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="btn-primary text-base py-4 px-9 shadow-2xl shadow-amber-500/30"
          >
            <FileText className="w-5 h-5 text-slate-950" />
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById("product-catalog-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else setActiveTab("products");
            }}
            className="btn-secondary text-base py-4 px-9"
          >
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Explore Corporate Gifts</span>
          </button>
        </div>
      </div>
    </section>
  );
}
