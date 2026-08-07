import React, { useState } from "react";
import { caseStudies } from "../data/caseStudies";
import { Award, Quote, Star, ArrowRight, Building2 } from "lucide-react";

export default function ClientTestimonials() {
  const [activeCase, setActiveCase] = useState(caseStudies[0]);

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-800/80">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Proven Enterprise Impact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            Trusted by Leaders at <span className="gold-gradient-text">Top Global Brands</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            See how HR and Revenue teams elevate employee retention and close high-value client contracts with AuraCraft.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {caseStudies.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveCase(cs)}
              className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-3 ${
                activeCase.id === cs.id
                  ? "bg-slate-900 border-amber-500 text-amber-300 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{cs.company}</span>
            </button>
          ))}
        </div>

        {/* Active Case Study Spotlight Card */}
        <div className="glass-panel-gold p-8 md:p-12 rounded-3xl relative overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Quote Section (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Quote className="w-12 h-12 text-amber-400/40" />
              <p className="text-lg md:text-xl text-slate-100 font-serif italic leading-relaxed">
                "{activeCase.quote}"
              </p>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src={activeCase.avatar}
                  alt={activeCase.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/50"
                />
                <div>
                  <div className="font-bold text-slate-100 text-base">{activeCase.author}</div>
                  <div className="text-xs text-amber-300 font-medium">{activeCase.role}</div>
                  <div className="text-xs text-slate-400">{activeCase.company} • {activeCase.industry}</div>
                </div>
              </div>
            </div>

            {/* Right Metrics Cards (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30 text-center space-y-1">
                <div className="text-xs font-semibold uppercase text-slate-400">Total Gift Volume</div>
                <div className="text-xl font-extrabold text-amber-400">{activeCase.giftVolume}</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {activeCase.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center space-y-0.5"
                  >
                    <div className="text-lg font-black text-slate-100 font-heading">{m.value}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
