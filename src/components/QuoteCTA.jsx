import React from "react";
import { useGiftContext } from "../context/GiftContext";
import { Sparkles, FileText, ArrowRight, Building2 } from "lucide-react";

export default function QuoteCTA() {
  const { setIsQuoteModalOpen, setActiveTab } = useGiftContext();

  return (
    <section className="section-padding bg-[#FFFDF8] border-t border-[#E5D9C8] relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F7F1E7] border border-[#C6A15B]/40 text-[#173F35] text-sm font-semibold shadow-sm">
          <Sparkles className="w-4 h-4 text-[#C6A15B]" />
          <span>Elevate Your Brand Relationships</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#173F35] leading-tight font-heading">
          Ready to Create Something{" "}
          <span className="text-[#C6A15B] serif-font italic font-normal">
            Memorable?
          </span>
        </h2>

        <p className="text-[#6F6A62] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Request an instant official RFQ quote, lock volume pricing, or speak directly with our executive gifting concierges in Malaysia.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="btn-gold text-base py-4 px-9 shadow-md"
          >
            <FileText className="w-5 h-5 text-[#173F35]" />
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 text-[#173F35]" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById("product-catalog-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else setActiveTab("products");
            }}
            className="btn-secondary text-base py-4 px-9"
          >
            <Building2 className="w-5 h-5 text-[#173F35]" />
            <span>Explore Corporate Gifts</span>
          </button>
        </div>
      </div>
    </section>
  );
}
