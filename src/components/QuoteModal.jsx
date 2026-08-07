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

  const [companyName, setCompanyName] = useState("Acme Global Technologies");
  const [contactEmail, setContactEmail] = useState("procurement@acme.com");
  const [deliveryDate, setDeliveryDate] = useState("2026-09-15");
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
    showNotification("RFQ Quote successfully generated and dispatched to your procurement team!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="glass-panel-gold max-w-3xl w-full p-6 md:p-8 rounded-3xl relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsQuoteModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          /* Step 1: Procurement Form */
          <div className="space-y-6">
            <div className="border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                <span>Formal Enterprise RFQ Generation</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100">
                Lock Price & Request Official Proposal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Provide procurement contact details to receive a binding 30-day quote with tax exemption & multi-address shipping schedules.
              </p>
            </div>

            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Company Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="custom-input pl-9 text-xs"
                      placeholder="Enterprise Org Name"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Procurement Contact Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="custom-input pl-9 text-xs"
                      placeholder="work.email@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Target Delivery Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="custom-input pl-9 text-xs"
                  />
                </div>
              </div>

              {/* Items Summary Table */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Quote Summary ({cart.length} Line Items)
                </span>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex justify-between items-center text-slate-300">
                      <div>
                        <span className="font-semibold text-slate-100">{item.name}</span>
                        <span className="text-slate-500 ml-2">({item.quantity} units)</span>
                      </div>
                      <span className="font-bold text-amber-400">
                        {formatPrice((item.unitPrice || item.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <div className="text-slate-500 italic">No cart items. Showing default bulk estimate.</div>
                  )}

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-extrabold">
                    <span className="text-slate-200">Estimated Total Expenditure:</span>
                    <span className="text-amber-400 text-lg font-heading">
                      {formatPrice(totalAmount > 0 ? totalAmount : 14500)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-xs py-3.5 justify-center shadow-xl shadow-amber-500/30"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Submit & Download Official RFQ Proposal</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Official Document Preview Output */
          <div className="space-y-6 animate-fade-in print:text-black">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-100">Official RFQ Issued!</h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Reference ID: {currentQuoteId}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-xs text-slate-300">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-extrabold text-amber-400 font-heading">
                    AURACRAFT ENTERPRISE GIFTING
                  </h4>
                  <p className="text-slate-500">100 Luxury Avenue, Suite 400 • San Francisco, CA</p>
                  <p className="text-slate-500">Tax ID: 94-3829102 • SOC2 Certified</p>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="font-bold text-slate-200">{companyName}</div>
                  <div className="text-slate-400">{contactEmail}</div>
                  <div className="text-slate-500">Issued Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                  Itemized Order Schedule:
                </div>
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between py-1 border-b border-slate-900">
                    <div>
                      <span className="font-semibold text-slate-200">{item.name}</span>
                      <span className="text-slate-500 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-amber-400">
                      {formatPrice((item.unitPrice || item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline pt-4 border-t border-amber-500/20 text-sm font-extrabold">
                <span className="text-slate-200">Authorized Grand Total:</span>
                <span className="text-amber-400 text-xl font-heading">
                  {formatPrice(totalAmount > 0 ? totalAmount : 14500)}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
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
