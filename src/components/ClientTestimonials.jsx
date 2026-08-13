import React, { useState } from "react";
import { caseStudies } from "../data/caseStudies";
import { Award, Quote, Star, ArrowRight, Building2 } from "lucide-react";

export default function ClientTestimonials() {
  const featured = caseStudies[0];
  const supporting = [caseStudies[1], caseStudies[2]];

  return (
    <section className="section-padding bg-slate-950 border-b border-slate-800/80">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-amber-400">
            Enterprise Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
            Trusted by <span className="gold-gradient-text">Leading Brands</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            See how enterprise leaders elevate employee appreciation and close high-value client contracts with KIZO Gifts.
          </p>
        </div>

        {/* 1. Large Featured Testimonial Spotlight */}
        <div className="bg-slate-900/80 p-8 md:p-14 rounded-3xl border border-amber-500/30 relative overflow-hidden mb-12 shadow-2xl">
          <Quote className="w-16 h-16 text-amber-400/20 absolute top-8 left-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Quote content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-2xl sm:text-3xl md:text-4xl text-slate-100 font-serif italic leading-relaxed">
                "{featured.quote}"
              </p>

              <div className="flex items-center gap-5 pt-4">
                <img
                  src={featured.avatar}
                  alt={featured.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
                />
                <div>
                  <div className="font-extrabold text-slate-100 text-xl font-heading">{featured.author}</div>
                  <div className="text-sm text-amber-400 font-bold">{featured.role}</div>
                  <div className="text-sm text-slate-400">{featured.company} • {featured.industry}</div>
                </div>
              </div>
            </div>

            {/* Impact Metric Card (4 cols) */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block">
                Enterprise Impact Metric
              </span>
              <div className="text-4xl font-extrabold text-amber-400 font-heading">
                {featured.metrics[0].value}
              </div>
              <div className="text-sm font-semibold text-slate-300">
                {featured.metrics[0].label}
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                {featured.giftVolume} delivered nationwide
              </div>
            </div>
          </div>
        </div>

        {/* 2 Supporting Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supporting.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-10 h-10 text-amber-400/30" />
                <p className="text-lg md:text-xl text-slate-200 font-serif italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="font-bold text-slate-100 text-base">{item.author}</div>
                  <div className="text-xs text-amber-400 font-semibold">{item.role}</div>
                  <div className="text-xs text-slate-400">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
