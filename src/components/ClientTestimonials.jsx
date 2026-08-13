import React, { useState } from "react";
import { caseStudies } from "../data/caseStudies";
import { Award, Quote, Star, ArrowRight, Building2 } from "lucide-react";

export default function ClientTestimonials() {
  const featured = caseStudies[0];
  const supporting = [caseStudies[1], caseStudies[2]];

  return (
    <section className="section-padding bg-[#173F35] text-[#F7F1E7] border-b border-[#245447]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#C6A15B]">
            Enterprise Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F7F1E7] leading-tight font-heading">
            Trusted by <span className="text-[#C6A15B]">Leading Brands</span>
          </h2>
          <p className="text-[#F7F1E7]/80 text-base md:text-lg leading-relaxed">
            See how enterprise leaders elevate employee appreciation and close high-value client contracts with KIZO Gifts.
          </p>
        </div>

        {/* 1. Large Featured Testimonial Spotlight */}
        <div className="bg-[#245447] p-8 md:p-14 rounded-3xl border border-[#C6A15B]/40 relative overflow-hidden mb-12 shadow-2xl">
          <Quote className="w-16 h-16 text-[#C6A15B]/30 absolute top-8 left-8" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Quote content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-2xl sm:text-3xl md:text-4xl text-[#F7F1E7] font-serif italic leading-relaxed">
                "{featured.quote}"
              </p>

              <div className="flex items-center gap-5 pt-4">
                <img
                  src={featured.avatar}
                  alt={featured.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#C6A15B] shadow-md"
                />
                <div>
                  <div className="font-extrabold text-[#F7F1E7] text-xl font-heading">{featured.author}</div>
                  <div className="text-sm text-[#C6A15B] font-bold">{featured.role}</div>
                  <div className="text-sm text-[#F7F1E7]/70">{featured.company} • {featured.industry}</div>
                </div>
              </div>
            </div>

            {/* Impact Metric Card (4 cols) */}
            <div className="lg:col-span-4 bg-[#173F35] p-6 rounded-2xl border border-[#C6A15B]/30 text-center space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F7F1E7]/70 block">
                Enterprise Impact Metric
              </span>
              <div className="text-4xl font-extrabold text-[#C6A15B] font-heading">
                {featured.metrics[0].value}
              </div>
              <div className="text-sm font-semibold text-[#F7F1E7]">
                {featured.metrics[0].label}
              </div>
              <div className="text-xs text-[#F7F1E7]/70 pt-2 border-t border-[#245447]">
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
              className="bg-[#245447]/80 p-8 rounded-3xl border border-[#245447] space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-10 h-10 text-[#C6A15B]/40" />
                <p className="text-lg md:text-xl text-[#F7F1E7] font-serif italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#173F35]/80">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#C6A15B]/40"
                />
                <div>
                  <div className="font-bold text-[#F7F1E7] text-base">{item.author}</div>
                  <div className="text-xs text-[#C6A15B] font-semibold">{item.role}</div>
                  <div className="text-xs text-[#F7F1E7]/70">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
