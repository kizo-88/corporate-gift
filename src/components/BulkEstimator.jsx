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
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Enterprise Budget Calculator</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            Instant Bulk Order <span className="emerald-gradient-text">RFQ Estimator</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Calculate tiered volume discounts, individual home delivery fees, and custom logo proofing costs in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 md:p-8 space-y-6">
              {/* Quantity Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300">
                      1. Total Recipients / Quantity
                    </label>
                    <p className="text-xs text-slate-500">Number of gifts to deliver.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-400 font-heading">
                      {quantity}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">Gifts</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={20}
                  max={2500}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                  <span>20</span>
                  <span className={quantity >= 50 ? "text-emerald-400" : ""}>50 (8% Off)</span>
                  <span className={quantity >= 200 ? "text-emerald-400" : ""}>200 (15% Off)</span>
                  <span className={quantity >= 500 ? "text-emerald-400" : ""}>500 (22% Off)</span>
                  <span className={quantity >= 1000 ? "text-emerald-400" : ""}>1,000+ (30% Off)</span>
                </div>
              </div>

              {/* Target Budget Per Recipient */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300">
                      2. Target Budget Per Gift Set
                    </label>
                    <p className="text-xs text-slate-500">Base budget before volume discount.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-amber-400 font-heading">
                      {formatPrice(budgetPerGift)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">/ person</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={400}
                  step={5}
                  value={budgetPerGift}
                  onChange={(e) => setBudgetPerGift(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Shipping Logistics Mode */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-xs font-bold uppercase text-slate-300 block">
                  3. Shipping & Fulfillment Logistics
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setShippingMode("remote")}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      shippingMode === "remote"
                        ? "bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/50"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        Individual Remote Drop-shipping
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Ship directly to each recipient's home address globally (+{formatPrice(14)}/addr).
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShippingMode("single")}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      shippingMode === "single"
                        ? "bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/50"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        Single Location Bulk HQ Freight
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Palletized bulk shipment to 1 office or event location (+{formatPrice(3)}/unit).
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Turnaround & Options Toggles */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBranding}
                    onChange={(e) => setIncludeBranding(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Full Logo Stamping & Ribbon</div>
                    <div className="text-[10px] text-slate-400">Custom box lid imprint (+{formatPrice(6)}/unit)</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rushTurnaround}
                    onChange={(e) => setRushTurnaround(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Rush Turnaround (3-5 Days)</div>
                    <div className="text-[10px] text-slate-400">Expedited production (+15% total)</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Live Estimate Output (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="glass-panel-gold p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                  Calculated Enterprise RFQ
                </span>
                <span className="badge badge-emerald">Live Tier Math</span>
              </div>

              {/* Big Price Display */}
              <div className="space-y-1">
                <div className="text-xs text-slate-400">Estimated Total Expenditure</div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-100 font-heading">
                  {formatPrice(grandTotal)}
                </div>
                <div className="text-xs font-semibold text-emerald-400">
                  Effective Cost: {formatPrice(effectivePricePerRecipient)} / recipient
                </div>
              </div>

              {/* Cost Itemization Table */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-amber-500/20">
                <div className="flex justify-between text-slate-400">
                  <span>Base Gift Cost ({quantity} × {formatPrice(budgetPerGift)})</span>
                  <span>{formatPrice(baseGiftTotal)}</span>
                </div>

                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Volume Tier Discount ({(volumeDiscountPct * 100).toFixed(0)}%)</span>
                  <span>-{formatPrice(volumeSavings)}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Logo Branding ({includeBranding ? formatPrice(6) : "$0"} × {quantity})</span>
                  <span>{formatPrice(brandingFeePerUnit * quantity)}</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Fulfillment ({shippingMode === "remote" ? "Multi-Address" : "Bulk Freight"})</span>
                  <span>{formatPrice(shippingFeePerUnit * quantity)}</span>
                </div>

                {rushTurnaround && (
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>Rush Production Fee (+15%)</span>
                    <span>{formatPrice(rushFee)}</span>
                  </div>
                )}
              </div>

              {/* Production Timeline Estimate */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Delivery Window:</span>
                </div>
                <span className="font-bold text-amber-300">
                  {rushTurnaround ? "3 - 5 Business Days" : "7 - 10 Business Days"}
                </span>
              </div>

              {/* Generate Formal PDF RFQ Button */}
              <button
                onClick={handleGenerateQuote}
                className="w-full btn-primary text-xs py-3.5 justify-center shadow-xl shadow-amber-500/30"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Generate Official PDF Quote & Lock Pricing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
