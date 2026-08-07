import React from "react";
import { useGiftContext } from "../context/GiftContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  FileText,
  Package,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatPrice,
    setIsQuoteModalOpen
  } = useGiftContext();

  if (!isCartOpen) return null;

  const totalEstimate = cart.reduce(
    (sum, item) => sum + (item.unitPrice || item.price) * (item.quantity || 1),
    0
  );

  const totalItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleCheckoutRFQ = () => {
    setIsCartOpen(false);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-fade-in">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Enterprise Quote Cart</h3>
                <p className="text-xs text-slate-400">{totalItemCount} Total Boxes Selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 relative group"
              >
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex gap-3">
                  {item.image || item.packaging?.image ? (
                    <img
                      src={item.image || item.packaging?.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                      BOX
                    </div>
                  )}

                  <div className="flex-1 pr-6">
                    <span className="text-[10px] uppercase font-bold text-amber-400">
                      {item.type === "custom-box" ? "Custom Gift Box" : item.category || "Gift Set"}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{item.name}</h4>
                    <div className="text-xs font-semibold text-slate-300 mt-1">
                      {formatPrice(item.unitPrice || item.price)} / unit
                    </div>
                  </div>
                </div>

                {/* Specs Pill */}
                {item.type === "custom-box" && (
                  <div className="text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-400 space-y-0.5">
                    <div>• Box: {item.packaging?.name}</div>
                    <div>• Swag Items: {item.items?.length} items included</div>
                    <div>• Ribbon: {item.ribbon?.name}</div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity - 5)}
                      className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-slate-100 min-w-[2.5rem] text-center font-heading">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity + 5)}
                      className="w-7 h-7 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-amber-400 font-heading">
                      {formatPrice((item.unitPrice || item.price) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="text-center py-12 space-y-3 text-slate-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
                <p className="text-sm font-semibold">Your quote cart is empty.</p>
                <p className="text-xs">Browse ready sets or build a custom gift box to generate an RFQ.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-900/80 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Volume Total:</span>
                  <span className="font-extrabold text-slate-100 text-lg font-heading">
                    {formatPrice(totalEstimate)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Fulfillment & Tax:</span>
                  <span>Calculated in formal RFQ</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutRFQ}
                  className="w-full btn-primary text-xs py-3.5 justify-center shadow-xl shadow-amber-500/25"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                  <span>Generate Formal Enterprise RFQ PDF</span>
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-xs text-slate-500 hover:text-rose-400 py-1"
                >
                  Clear Quote Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
