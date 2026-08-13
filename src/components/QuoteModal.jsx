import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import confetti from "canvas-confetti";
import {
  X,
  FileText,
  CheckCircle2,
  Download,
  Building,
  Mail,
  Calendar,
  Send,
  Printer,
  ShieldCheck
} from "lucide-react";

export default function QuoteModal() {
  const {
    isQuoteModalOpen,
    setIsQuoteModalOpen,
    cart,
    savedQuotes,
    formatPrice,
    clearCart,
    showNotification
  } = useGiftContext();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("100");
  const [budgetRange, setBudgetRange] = useState("RM 5,000 - RM 15,000");
  const [customMessage, setCustomMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const currentQuoteId = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.unitPrice || item.price) * (item.quantity || 1),
    0
  );

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    showNotification("RFQ Quote successfully generated and dispatched!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop animate-fade-in z-50">
      <div className="bg-[#FFFDF8] border border-[#E5D9C8] max-w-3xl w-full p-6 md:p-8 rounded-3xl relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto text-[#252525] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsQuoteModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F1E7] text-[#173F35] hover:bg-[#E5D9C8] border border-[#E5D9C8]"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          /* Step 1: Procurement Form */
          <div className="space-y-6">
            <div className="border-b border-[#E5D9C8] pb-4">
              <div className="flex items-center gap-2 text-[#C6A15B] text-xs font-bold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4 text-[#C6A15B]" />
                <span>Formal Corporate RFQ Request</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#173F35] font-heading">
                Request a Custom Corporate Quote
              </h2>
              <p className="text-xs text-[#6F6A62] mt-1">
                Fill in your company details below to receive a formal 30-day locked pricing quote with sample mockups.
              </p>
            </div>

            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="custom-input text-xs"
                    placeholder="e.g. Sarah Ahmad"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Company / Organization *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#6F6A62] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="custom-input pl-9 text-xs"
                      placeholder="e.g. Axiata Digital"
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6F6A62] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="custom-input pl-9 text-xs"
                      placeholder="sarah@company.com.my"
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="custom-input text-xs"
                    placeholder="+60 12-345 6789"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Estimated Quantity (Units) *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    className="custom-input text-xs"
                    placeholder="e.g. 100"
                  />
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#173F35]">Estimated Total Budget *</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="custom-input text-xs bg-[#FFFDF8]"
                  >
                    <option value="RM 2,000 - RM 5,000">RM 2,000 - RM 5,000</option>
                    <option value="RM 5,000 - RM 15,000">RM 5,000 - RM 15,000</option>
                    <option value="RM 15,000 - RM 30,000">RM 15,000 - RM 30,000</option>
                    <option value="RM 30,000 - RM 50,000+">RM 30,000 - RM 50,000+</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#173F35]">Message / Special Requirements</label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="custom-input text-xs leading-relaxed"
                  placeholder="Tell us about your event, delivery date, custom logo requests, or preferred gift items..."
                />
              </div>

              {/* Items Summary Table if Cart Exists */}
              {cart.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#173F35] uppercase tracking-wider block mb-2">
                    Attached Cart Items ({cart.length} items)
                  </span>
                  <div className="bg-[#F7F1E7] p-4 rounded-xl border border-[#E5D9C8] space-y-2 text-xs">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center text-[#252525]">
                        <div>
                          <span className="font-semibold text-[#173F35]">{item.name}</span>
                          <span className="text-[#6F6A62] ml-2">({item.quantity} units)</span>
                        </div>
                        <span className="font-bold text-[#C6A15B]">
                          {formatPrice((item.unitPrice || item.price) * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-[#E5D9C8] flex justify-between items-center text-xs font-extrabold">
                      <span className="text-[#173F35]">Cart Total Estimate:</span>
                      <span className="text-[#C6A15B] text-sm font-heading">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary text-xs py-3.5 justify-center shadow-md"
              >
                <Send className="w-4 h-4 text-[#F7F1E7]" />
                <span>Submit Quote Request</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Official Document Preview Output */
          <div className="space-y-6 animate-fade-in print:text-black">
            <div className="flex items-center justify-between border-b border-[#E5D9C8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#173F35]/15 text-[#173F35] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#173F35]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#173F35] font-heading">Official RFQ Issued!</h3>
                  <p className="text-xs text-[#173F35] font-semibold">
                    Reference ID: {currentQuoteId}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-[#173F35]" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="bg-[#F7F1E7] p-6 rounded-2xl border border-[#E5D9C8] space-y-6 text-xs text-[#252525]">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-extrabold text-[#173F35] font-heading">
                    KIZO CORPORATE GIFTS
                  </h4>
                  <p className="text-[#6F6A62]">Kuala Lumpur, Malaysia • enterprise@kizogifts.com.my</p>
                  <p className="text-[#6F6A62]">SST Registered • +60 3-8000 9988</p>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-bold text-[#173F35]">{companyName}</div>
                  <div className="text-[#6F6A62]">{contactEmail}</div>
                  <div className="text-[#6F6A62]">Issued Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-[#173F35] border-b border-[#E5D9C8] pb-1">
                  Itemized Order Schedule:
                </div>
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between py-1 border-b border-[#E5D9C8]">
                    <div>
                      <span className="font-semibold text-[#173F35]">{item.name}</span>
                      <span className="text-[#6F6A62] ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#C6A15B]">
                      {formatPrice((item.unitPrice || item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-[#E5D9C8] text-sm font-extrabold">
                <span className="text-[#173F35]">Authorized Grand Total:</span>
                <span className="text-[#C6A15B] text-xl font-heading">
                  {formatPrice(totalAmount > 0 ? totalAmount : 14500)}
                </span>
              </div>

              <div className="text-[11px] text-[#6F6A62] flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#173F35]" />
                <span>30-Day Guaranteed Price Lock. Includes white-glove custom proof approval.</span>
              </div>
            </div>

            <button
              onClick={() => {
                clearCart();
                setIsQuoteModalOpen(false);
                setSubmitted(false);
              }}
              className="w-full btn-secondary text-xs py-3 justify-center"
            >
              Done & Return to Main Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
