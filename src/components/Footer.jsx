import React from "react";
import { useGiftContext } from "../context/GiftContext";
import { Crown, ShieldCheck, Mail, Phone, MapPin, Award, Check } from "lucide-react";

export default function Footer() {
  const { setActiveTab, toastMessage } = useGiftContext();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 relative">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-slate-100 px-5 py-3 rounded-2xl shadow-2xl shadow-amber-500/20 flex items-center gap-3 animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Crown className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-100 font-heading tracking-wider">
                AURA <span className="text-amber-400">LUXE</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              The premium enterprise gifting engine. Providing white-glove custom gift box curation, automated remote recipient drop-shipping, and precision logo branding for global leaders.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SOC2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>100% Carbon Neutral</span>
              </div>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-heading">
              Gifting Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab("catalog")} className="hover:text-amber-300 transition-colors">
                  Gift Box Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("builder")} className="hover:text-amber-300 transition-colors">
                  Build-a-Box Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("estimator")} className="hover:text-amber-300 transition-colors">
                  Bulk RFQ Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("branding")} className="hover:text-amber-300 transition-colors">
                  Custom Branding Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("portal")} className="hover:text-amber-300 transition-colors">
                  Recipient Magic Link Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-heading">
              Curated Use Cases
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 cursor-pointer">C-Suite Executive Onboarding</li>
              <li className="hover:text-slate-200 cursor-pointer">VIP Client Appreciation</li>
              <li className="hover:text-slate-200 cursor-pointer">Tech Summit & Retreat Kits</li>
              <li className="hover:text-slate-200 cursor-pointer">Annual Holiday Gala Hampers</li>
              <li className="hover:text-slate-200 cursor-pointer">FSC Eco-Friendly Goods</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-heading">
              Enterprise Support
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>concierge@auragifts.io</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+1 (800) 589-3420</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>San Francisco • New York • London</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} AuraCraft Enterprise Gifting Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
