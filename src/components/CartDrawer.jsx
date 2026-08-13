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
        className="absolute inset-0 bg-[#173F35]/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#E5D9C8] shadow-2xl flex flex-col justify-between animate-fade-in text-[#252525]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5D9C8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/20 border border-[#C6A15B]/40 flex items-center justify-center text-[#173F35]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#173F35] font-heading">Enterprise Quote Cart</h3>
                <p className="text-xs text-[#6F6A62]">{totalItemCount} Total Boxes Selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#6F6A62] hover:text-[#173F35] rounded-lg hover:bg-[#F7F1E7]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="p-4 rounded-2xl bg-[#F7F1E7] border border-[#E5D9C8] space-y-3 relative group"
              >
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="absolute top-3 right-3 text-[#6F6A62] hover:text-rose-600 p-1"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex gap-3">
                  {item.image || item.packaging?.image ? (
                    <img
                      src={item.image || item.packaging?.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E5D9C8]"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[#FFFDF8] border border-[#E5D9C8] flex items-center justify-center text-[#173F35] font-bold text-xs">
                      BOX
                    </div>
                  )}

                  <div className="flex-1 pr-6">
                    <span className="text-[10px] uppercase font-bold text-[#C6A15B]">
                      {item.type === "custom-box" ? "Custom Gift Box" : item.category || "Gift Set"}
                    </span>
                    <h4 className="text-sm font-bold text-[#173F35] line-clamp-1 font-heading">{item.name}</h4>
                    <div className="text-xs font-semibold text-[#6F6A62] mt-1">
                      {formatPrice(item.unitPrice || item.price)} / unit
                    </div>
                  </div>
                </div>

                {/* Specs Pill */}
                {item.type === "custom-box" && (
                  <div className="text-[11px] bg-[#FFFDF8] p-2 rounded-lg border border-[#E5D9C8] text-[#6F6A62] space-y-0.5">
                    <div>• Box: {item.packaging?.name}</div>
                    <div>• Swag Items: {item.items?.length} items included</div>
                    <div>• Ribbon: {item.ribbon?.name}</div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E5D9C8]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity - 5)}
                      className="w-7 h-7 rounded bg-[#FFFDF8] border border-[#E5D9C8] flex items-center justify-center text-[#173F35] hover:bg-[#E5D9C8]/40"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-[#173F35] min-w-[2.5rem] text-center font-heading">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity + 5)}
                      className="w-7 h-7 rounded bg-[#FFFDF8] border border-[#E5D9C8] flex items-center justify-center text-[#173F35] hover:bg-[#E5D9C8]/40"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#C6A15B] font-heading">
                      {formatPrice((item.unitPrice || item.price) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="text-center py-12 space-y-3 text-[#6F6A62]">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#C6A15B]" />
                <p className="text-sm font-semibold text-[#173F35]">Your quote cart is empty.</p>
                <p className="text-xs">Browse ready sets or build a custom gift box to generate an RFQ.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5D9C8] bg-[#F7F1E7] space-y-4">
              <div className="space-y-2 text-xs text-[#6F6A62]">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItemCount} units)</span>
                  <span className="font-bold text-[#173F35]">{formatPrice(totalEstimate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Doorstep Shipping</span>
                  <span className="text-[#173F35] font-bold">Calculated in Quote</span>
                </div>
                <div className="flex justify-between border-t border-[#E5D9C8] pt-2 text-sm font-extrabold text-[#173F35]">
                  <span>Estimated Total</span>
                  <span className="text-[#C6A15B] font-heading">{formatPrice(totalEstimate)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={clearCart}
                  className="btn-secondary text-xs justify-center py-3"
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckoutRFQ}
                  className="btn-primary text-xs justify-center py-3"
                >
                  <FileText className="w-4 h-4 text-[#F7F1E7]" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
