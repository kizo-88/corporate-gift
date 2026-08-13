import React from "react";
import { useGiftContext } from "../context/GiftContext";
import { Crown, ShieldCheck, Mail, Phone, MapPin, Award, Check, Globe, Share2, Send, MessageSquare } from "lucide-react";

export default function Footer() {
  const { setActiveTab, toastMessage } = useGiftContext();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 relative py-20 lg:py-24">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-slate-100 px-6 py-4 rounded-2xl shadow-2xl shadow-amber-500/20 flex items-center gap-3 animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Crown className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl text-slate-100 font-heading tracking-wider">
                KIZO <span className="text-amber-400">GIFTS</span>
              </span>
            </div>

            <p className="text-sm md:text-base leading-relaxed text-slate-400">
              Malaysia's premier corporate gifting platform. Executive gift sets, custom logo branding, volume pricing discounts, and doorstep delivery across Malaysia and worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>FSC Certified Eco Goods</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>100% On-Time Guarantee</span>
              </div>
            </div>
          </div>

          {/* Column 2: Explore Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-slate-100 uppercase tracking-wider font-heading">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => setActiveTab("catalog")} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("products")} className="hover:text-amber-400 transition-colors">
                  Gifts Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("builder")} className="hover:text-amber-400 transition-colors">
                  Build a Box
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("estimator")} className="hover:text-amber-400 transition-colors">
                  Bulk Estimator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("branding")} className="hover:text-amber-400 transition-colors">
                  Branding Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-slate-100 uppercase tracking-wider font-heading">
              Corporate Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-slate-200 cursor-pointer">Executive Onboarding Kits</li>
              <li className="hover:text-slate-200 cursor-pointer">Client Appreciation Gifts</li>
              <li className="hover:text-slate-200 cursor-pointer">Verdant Eco-Gift Hampers</li>
              <li className="hover:text-slate-200 cursor-pointer">Multi-Address Drop-Shipping</li>
              <li className="hover:text-slate-200 cursor-pointer">Tax-Compliant SST Invoicing</li>
            </ul>
          </div>

          {/* Column 4: Contact & Social (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-slate-100 uppercase tracking-wider font-heading">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>enterprise@kizogifts.com.my</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+60 3-8000 9988</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase block">Follow Our Socials</span>
              <div className="flex items-center gap-3">
                <a href="#linkedin" className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors" title="Website">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#twitter" className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors" title="Share">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#instagram" className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors" title="Message">
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a href="#facebook" className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors" title="Send">
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-wrap justify-between items-center gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} KIZO Corporate Gifts Enterprise. All rights reserved.</div>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">SST Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
