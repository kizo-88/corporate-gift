import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import {
  Sliders,
  Calculator,
  Truck,
  Building2,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Download,
  ArrowRight
} from "lucide-react";

export default function BulkEstimator() {
  const { formatPrice, addSavedQuote, setIsQuoteModalOpen } = useGiftContext();

  const [quantity, setQuantity] = useState(150);
  const [budgetPerGift, setBudgetPerGift] = useState(120);
  const [shippingMode, setShippingMode] = useState("remote"); // "single" | "remote"
  const [rushTurnaround, setRushTurnaround] = useState(false);
  const [includeBranding, setIncludeBranding] = useState(true);

  // Volume discount rate calculation
  let volumeDiscountPct = 0;
  if (quantity >= 1000) volumeDiscountPct = 0.30;
  else if (quantity >= 500) volumeDiscountPct = 0.22;
  else if (quantity >= 200) volumeDiscountPct = 0.15;
  else if (quantity >= 50) volumeDiscountPct = 0.08;

  // Costs
  const baseGiftTotal = budgetPerGift * quantity;
  const volumeSavings = baseGiftTotal * volumeDiscountPct;
  const discountedGiftTotal = baseGiftTotal - volumeSavings;

  const brandingFeePerUnit = includeBranding ? 6 : 0;
  const shippingFeePerUnit = shippingMode === "remote" ? 14 : 3;
  const extraFeesPerUnit = brandingFeePerUnit + shippingFeePerUnit;

  let subtotal = discountedGiftTotal + extraFeesPerUnit * quantity;
  const rushFee = rushTurnaround ? subtotal * 0.15 : 0;
  const grandTotal = subtotal + rushFee;
  const effectivePricePerRecipient = grandTotal / quantity;

  const handleGenerateQuote = () => {
    const newQuote = {
      quoteId: `RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      quantity,
      budgetPerGift,
      shippingMode: shippingMode === "remote" ? "Multi-Address Remote Drop-shipping" : "Single HQ Pallet",
      rushTurnaround,
      includeBranding,
      volumeDiscountPct: (volumeDiscountPct * 100).toFixed(0),
      grandTotal,
      effectivePricePerRecipient
    };

    addSavedQuote(newQuote);
    setIsQuoteModalOpen(true);
  };

  return (
    <section className="section-padding bg-slate-950 border-b border-slate-800/80">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Corporate Benefits (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                Bulk Orders & Discounts
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
                Transparent <span className="emerald-gradient-text">Volume Pricing</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Scale your corporate gifting with automated tiered discounts, individual home delivery tracking, and free custom logo proofing.
              </p>
            </div>

            {/* Corporate Benefits List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">Volume Discounts up to 30%</h4>
                  <p className="text-sm text-slate-400 mt-1">Automatic tier savings applied directly to all bulk gift box orders above 50 units.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">Multi-Address Doorstep Shipping</h4>
                  <p className="text-sm text-slate-400 mt-1">Deliver directly to individual remote employee addresses across Malaysia & global offices.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Corporate SST Invoicing</h4>
                  <p className="text-sm text-slate-400 mt-1">Tax-compliant formal invoices with 30-day locked pricing for corporate procurement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Calculator (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 p-8 md:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-slate-100">Instant Bulk Estimator</h3>
                </div>
                <span className="badge badge-emerald">Live Tier Math</span>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-sm font-bold uppercase text-slate-200">
                      1. Total Recipients / Box Quantity
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">Select number of gift boxes to order.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-emerald-400 font-heading">
                      {quantity}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">Boxes</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={20}
                  max={2500}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 font-semibold">
                  <span>20</span>
                  <span className={quantity >= 50 ? "text-emerald-400 font-bold" : ""}>50 (8% Off)</span>
                  <span className={quantity >= 200 ? "text-emerald-400 font-bold" : ""}>200 (15% Off)</span>
                  <span className={quantity >= 500 ? "text-emerald-400 font-bold" : ""}>500 (22% Off)</span>
                  <span className={quantity >= 1000 ? "text-emerald-400 font-bold" : ""}>1,000+ (30% Off)</span>
                </div>
              </div>

              {/* Target Budget Per Recipient */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-sm font-bold uppercase text-slate-200">
                      2. Target Budget Per Gift Box
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">Base gift value per unit.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-amber-400 font-heading">
                      {formatPrice(budgetPerGift)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ unit</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={50}
                  max={800}
                  step={10}
                  value={budgetPerGift}
                  onChange={(e) => setBudgetPerGift(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Logistics Toggles */}
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <label className="text-sm font-bold uppercase text-slate-200 block">
                  3. Fulfillment Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setShippingMode("remote")}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      shippingMode === "remote"
                        ? "bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/40"
                        : "bg-slate-950/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-200">Individual Home Drops</div>
                      <p className="text-xs text-slate-400 mt-1">Multi-address doorstep delivery (+{formatPrice(14)}/box)</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShippingMode("single")}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      shippingMode === "single"
                        ? "bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/40"
                        : "bg-slate-950/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-200">Single Office Freight</div>
                      <p className="text-xs text-slate-400 mt-1">Bulk pallet delivery to 1 HQ location (+{formatPrice(3)}/box)</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Grand Total Calculation Output */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400">Total Estimated Cost</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-heading mt-0.5">
                      {formatPrice(grandTotal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-bold block">Effective Rate</span>
                    <span className="text-lg font-bold text-emerald-300">
                      {formatPrice(effectivePricePerRecipient)} / person
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                  <span>Volume Savings ({(volumeDiscountPct * 100).toFixed(0)}%):</span>
                  <span className="text-emerald-400 font-bold">-{formatPrice(volumeSavings)}</span>
                </div>

                <button
                  onClick={handleGenerateQuote}
                  className="w-full btn-primary text-base py-4 justify-center shadow-xl shadow-amber-500/30"
                >
                  <FileText className="w-5 h-5 text-slate-950" />
                  <span>Request Official RFQ Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
