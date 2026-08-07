import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import {
  Users,
  Link,
  FileSpreadsheet,
  CheckCircle2,
  Package,
  Send,
  Truck,
  Sparkles,
  ShieldAlert,
  Copy
} from "lucide-react";

export default function RecipientPortal() {
  const { showNotification } = useGiftContext();

  const [activeTab, setActiveTab] = useState("magic-link"); // "magic-link" | "csv" | "tracker"
  const [recipientEmail, setRecipientEmail] = useState("alex.rivera@techcorp.io");
  const [generatedLink, setGeneratedLink] = useState("");
  const [redeemedStatus, setRedeemedStatus] = useState(false);

  // Mock Recipient Status List
  const [recipientsList, setRecipientsList] = useState([
    { id: 1, name: "Sarah Jenkins", email: "sarah.j@acme.com", city: "San Francisco, CA", status: "Delivered", date: "Aug 5" },
    { id: 2, name: "David Chen", email: "d.chen@apex.io", city: "Austin, TX", status: "In Transit", date: "Aug 6" },
    { id: 3, name: "Emily Watson", email: "emily.w@vanguard.com", city: "London, UK", status: "Custom Engraving", date: "Aug 7" },
    { id: 4, name: "Michael Vance", email: "m.vance@cloudtech.org", city: "Toronto, CA", status: "Claim Link Sent", date: "Aug 7" }
  ]);

  const handleGenerateMagicLink = (e) => {
    e.preventDefault();
    const link = `https://auragifts.io/claim?token=exec_${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedLink(link);
    showNotification("Magic Link generated & dispatched to recipient!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    showNotification("Magic Link copied to clipboard!");
  };

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Remote Workforce Logistics Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            Multi-Address <span className="purple-gradient-text">Recipient Portal</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Eliminate address collection hassles. Send magic links so remote employees can input private delivery details or pick gift preferences.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("magic-link")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "magic-link"
                ? "bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Magic Link Redemption</span>
          </button>

          <button
            onClick={() => setActiveTab("csv")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "csv"
                ? "bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV Recipient Upload</span>
          </button>

          <button
            onClick={() => setActiveTab("tracker")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "tracker"
                ? "bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Global Shipment Tracker</span>
          </button>
        </div>

        {/* TAB 1: MAGIC LINK */}
        {activeTab === "magic-link" && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 animate-fade-in">
            <div className="max-w-xl mx-auto space-y-4 text-center">
              <h3 className="text-xl font-bold text-slate-100">Send Zero-Touch Gift Claim Link</h3>
              <p className="text-xs text-slate-400">
                The recipient opens the link, selects apparel sizing/colors, enters their shipping address, and receives live tracking updates.
              </p>

              <form onSubmit={handleGenerateMagicLink} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="custom-input text-xs flex-1"
                  placeholder="Enter recipient employee email..."
                />
                <button type="submit" className="btn-primary text-xs py-2.5 px-5 shrink-0">
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Generate Link</span>
                </button>
              </form>

              {generatedLink && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3 animate-fade-in text-left">
                  <div className="flex items-center justify-between text-xs text-purple-300 font-bold">
                    <span>Generated Claim Link (Expires in 30 Days):</span>
                    <span className="badge badge-purple">Active</span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-200">
                    <span className="truncate">{generatedLink}</span>
                    <button
                      onClick={copyToClipboard}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 ml-2"
                      title="Copy Link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recipient privacy protected under GDPR & SOC2. Address encrypted.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CSV UPLOAD */}
        {activeTab === "csv" && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-100">Bulk CSV Recipient Batch Upload</h3>
              <p className="text-xs text-slate-400">
                Upload your HR spreadsheet (CSV/Excel) containing columns: Name, Email, Address, City, Zip.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-800 hover:border-purple-500/50 p-8 rounded-2xl text-center bg-slate-900/40 space-y-3 cursor-pointer">
              <FileSpreadsheet className="w-10 h-10 text-purple-400 mx-auto" />
              <div className="text-sm font-bold text-slate-200">Drop your Recipient Spreadsheet here</div>
              <p className="text-xs text-slate-500">Supports .CSV, .XLSX up to 10,000 rows</p>
              <button
                onClick={() => showNotification("Sample CSV uploaded with 250 recipients!")}
                className="btn-secondary text-xs py-2 px-4 inline-flex"
              >
                Upload Sample CSV File
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: TRACKER */}
        {activeTab === "tracker" && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100">Live Global Dispatch Dashboard</h3>
              <span className="text-xs text-slate-400">4 Recipient Shipments Active</span>
            </div>

            <div className="space-y-2">
              {recipientsList.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-200 text-sm">{r.name}</div>
                    <div className="text-slate-400">{r.email} • {r.city}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{r.date}</span>
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                        r.status === "Delivered"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : r.status === "In Transit"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
