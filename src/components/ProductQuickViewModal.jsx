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
      <div className="bg-[#FFFDF8] border border-[#E5D9C8] max-w-3xl w-full p-6 md:p-8 rounded-3xl relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto text-[#252525] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F1E7] text-[#173F35] hover:bg-[#E5D9C8] border border-[#E5D9C8]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image & Badges */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5D9C8] bg-[#F7F1E7] aspect-square">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge badge-gold">
                {quickViewProduct.category}
              </span>
            </div>

            <div className="flex items-center justify-around text-xs text-[#6F6A62] p-3 bg-[#F7F1E7] rounded-xl border border-[#E5D9C8]">
              <div className="flex items-center gap-1.5 font-bold text-[#173F35]">
                <Clock className="w-4 h-4 text-[#C6A15B]" />
                <span>{quickViewProduct.leadTimeDays} Days Lead Time</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-[#173F35]">
                <ShieldCheck className="w-4 h-4 text-[#173F35]" />
                <span>MOQ: {quickViewProduct.moq} Units</span>
              </div>
            </div>
          </div>

          {/* Product Info & Tiers */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-[#173F35] font-heading">{quickViewProduct.name}</h2>
              <p className="text-xs text-[#6F6A62] mt-2 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Included Items Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
                Box Contents Breakdown
              </span>
              <ul className="space-y-1.5 text-xs text-[#252525]">
                {quickViewProduct.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier Pricing Breakdown Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
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
                          ? "bg-[#173F35] text-[#F7F1E7] border-[#173F35] font-bold"
                          : "bg-[#F7F1E7] border-[#E5D9C8] text-[#6F6A62]"
                      }`}
                    >
                      <div className="text-[10px] opacity-75">
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
              <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider">
                Branding / Logo Finish
              </span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.customizationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedCustomization(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      selectedCustomization === opt
                        ? "bg-[#C6A15B] text-[#173F35] border-[#C6A15B] font-bold"
                        : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525] hover:border-[#173F35]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Total */}
            <div className="pt-4 border-t border-[#E5D9C8] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6F6A62]">Order Quantity:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(quickViewProduct.moq, q - 10))}
                      className="w-8 h-8 rounded-lg bg-[#F7F1E7] border border-[#E5D9C8] text-[#173F35] font-bold hover:bg-[#E5D9C8]"
                    >
                      -
                    </button>
                    <span className="text-base font-extrabold text-[#173F35] min-w-[3rem] text-center font-heading">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 10)}
                      className="w-8 h-8 rounded-lg bg-[#F7F1E7] border border-[#E5D9C8] text-[#173F35] font-bold hover:bg-[#E5D9C8]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#6F6A62]">Estimated Total ({quantity} sets)</div>
                  <div className="text-2xl font-extrabold text-[#C6A15B] font-heading">
                    {formatPrice(totalPrice)}
                  </div>
                  <div className="text-[10px] text-[#6F6A62]">
                    ({formatPrice(unitPrice)} / box)
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-sm py-3 justify-center shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#F7F1E7]" />
                <span>Add {quantity} Sets to Quote Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
