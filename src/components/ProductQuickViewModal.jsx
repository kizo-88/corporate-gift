import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import { X, Check, ShoppingBag, ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";

export default function ProductQuickViewModal() {
  const { quickViewProduct, closeQuickView, formatPrice, addToCart, setIsCartOpen } = useGiftContext();

  const [quantity, setQuantity] = useState(25);
  const [selectedCustomization, setSelectedCustomization] = useState("");

  if (!quickViewProduct) return null;

  // Tier price calculation based on quantity
  let unitPrice = quickViewProduct.price;
  if (quickViewProduct.tiers) {
    const tier = quickViewProduct.tiers.find((t) => quantity >= t.min && quantity <= t.max);
    if (tier) unitPrice = tier.price;
  }

  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      ...quickViewProduct,
      unitPrice: unitPrice,
      quantity: quantity,
      selectedCustomization: selectedCustomization || quickViewProduct.customizationOptions[0]
    });
    closeQuickView();
    setIsCartOpen(true);
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="glass-panel-gold max-w-3xl w-full p-6 md:p-8 rounded-3xl relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image & Badges */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge badge-gold">
                {quickViewProduct.category}
              </span>
            </div>

            <div className="flex items-center justify-around text-xs text-slate-400 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{quickViewProduct.leadTimeDays} Days Lead Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>MOQ: {quickViewProduct.moq} Units</span>
              </div>
            </div>
          </div>

          {/* Product Info & Tiers */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100">{quickViewProduct.name}</h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Included Items Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Box Contents Breakdown
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {quickViewProduct.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier Pricing Breakdown Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Volume Tier Discount Pricing
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                {quickViewProduct.tiers.map((t, idx) => {
                  const isActive = quantity >= t.min && quantity <= t.max;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border ${
                        isActive
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="text-[10px] text-slate-500">
                        {t.max > 1000 ? `${t.min}+` : `${t.min}-${t.max}`}
                      </div>
                      <div>{formatPrice(t.price)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Branding Choice */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Branding / Logo Finish
              </span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.customizationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedCustomization(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      selectedCustomization === opt
                        ? "bg-amber-500 text-slate-950 border-amber-500"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Total */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Order Quantity:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(quickViewProduct.moq, q - 10))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-slate-100 min-w-[3rem] text-center font-heading">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 10)}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Estimated Total ({quantity} sets)</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-heading">
                    {formatPrice(totalPrice)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ({formatPrice(unitPrice)} / box)
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-sm py-3 justify-center shadow-lg shadow-amber-500/25"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Add {quantity} Sets to Quote Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
