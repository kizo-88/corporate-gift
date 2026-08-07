import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import {
  Layers,
  Upload,
  Sparkles,
  RotateCw,
  ZoomIn,
  MoveVertical,
  Palette,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";

export default function BrandingStudio() {
  const { logoFile, setLogoFile, showNotification } = useGiftContext();

  const mockProducts = [
    {
      id: "prod-tumbler",
      name: "24hr Thermal Stainless Tumbler",
      category: "Drinkware",
      baseImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "prod-journal",
      name: "Saffiano Leather Executive Journal",
      category: "Stationery",
      baseImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "prod-powerbank",
      name: "Anodized Aluminum Power Bank",
      category: "Tech",
      baseImage: "https://images.unsplash.com/photo-1609592424009-dd27906d4455?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const productColors = [
    { name: "Midnight Slate", hex: "#1e293b" },
    { name: "Royal Emerald", hex: "#064e3b" },
    { name: "Champagne Gold", hex: "#78350f" },
    { name: "Matte White", hex: "#e2e8f0" }
  ];

  const imprintMethods = [
    { id: "laser", name: "Laser Engraving", textStyle: "text-amber-400 font-extrabold tracking-widest opacity-90 drop-shadow" },
    { id: "foil-gold", name: "Metallic Gold Foil", textStyle: "text-amber-300 font-black tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" },
    { id: "deboss", name: "Blind Debossed", textStyle: "text-slate-900/80 font-black tracking-widest mix-blend-multiply" },
    { id: "screen", name: "Full Color Screen Print", textStyle: "text-cyan-400 font-bold tracking-widest" }
  ];

  const sampleLogos = [
    "ACME CORP",
    "NEXA LABS",
    "AURA ENTERPRISE",
    "VERTEX AI"
  ];

  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedImprint, setSelectedImprint] = useState(imprintMethods[0]);
  const [sampleTextLogo, setSampleTextLogo] = useState(sampleLogos[0]);

  // Adjustments
  const [logoScale, setLogoScale] = useState(100);
  const [logoYPos, setLogoYPos] = useState(50); // percentage 20 to 80
  const [logoRotation, setLogoRotation] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setLogoFile({ name: file.name, url: evt.target.result });
        showNotification("Logo loaded into 3D Branding Studio visualizer!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Virtual Mockup Tool</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            Custom Logo <span className="cyan-gradient-text">Branding Studio</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Test precision laser engraving, gold foil stamping, and debossing on luxury merchandise before mass production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Canvas Visualizer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border-slate-800 relative overflow-hidden text-center">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                <span className="font-bold text-slate-200">{selectedProduct.name}</span>
                <span className="badge badge-cyan">{selectedImprint.name}</span>
              </div>

              {/* Product Mockup Canvas Area */}
              <div
                className="relative rounded-2xl overflow-hidden h-[420px] flex items-center justify-center border border-slate-800 transition-colors"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <img
                  src={selectedProduct.baseImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                />

                {/* Overlaid Logo / Branding Element */}
                <div
                  className="absolute pointer-events-none transition-all duration-150 flex items-center justify-center"
                  style={{
                    top: `${logoYPos}%`,
                    transform: `translateY(-50%) scale(${logoScale / 100}) rotate(${logoRotation}deg)`
                  }}
                >
                  {logoFile ? (
                    <img
                      src={logoFile.url}
                      alt="Uploaded Logo"
                      className="max-h-24 max-w-[200px] object-contain filter drop-shadow-lg"
                    />
                  ) : (
                    <div
                      className={`text-xl md:text-2xl font-black uppercase tracking-widest px-4 py-2 border-2 border-dashed border-current rounded-lg ${selectedImprint.textStyle}`}
                    >
                      {sampleTextLogo}
                    </div>
                  )}
                </div>

                {/* Canvas Overlay Guides */}
                <div className="absolute bottom-3 left-3 text-[10px] bg-slate-950/80 px-3 py-1 rounded-full text-slate-400 border border-slate-800">
                  Visual Proof • Laser Precision Scale: {logoScale}%
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              {/* Product Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-300">
                  1. Select Merchandise Item
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {mockProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        selectedProduct.id === p.id
                          ? "bg-slate-900 border-cyan-500 text-cyan-300 font-bold"
                          : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <img src={p.baseImage} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="text-xs">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Imprint Finish Selection */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <label className="text-xs font-bold uppercase text-slate-300">
                  2. Choose Logo Imprint Finish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {imprintMethods.map((imp) => (
                    <button
                      key={imp.id}
                      onClick={() => setSelectedImprint(imp)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedImprint.id === imp.id
                          ? "bg-cyan-500 text-slate-950 font-bold border-cyan-500"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {imp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Logo vs Preset */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="text-xs font-bold uppercase text-slate-300">
                  3. Upload Custom Vector Logo
                </label>
                <div className="border-2 border-dashed border-slate-800 p-4 rounded-xl text-center bg-slate-900/50">
                  {logoFile ? (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 truncate">{logoFile.name}</span>
                      <button
                        onClick={() => setLogoFile(null)}
                        className="text-rose-400 hover:underline text-[11px]"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-cyan-300">
                      <Upload className="w-4 h-4" />
                      <span>Upload PNG / SVG Logo</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {!logoFile && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 w-full">Or test with preset:</span>
                    {sampleLogos.map((txt) => (
                      <button
                        key={txt}
                        onClick={() => setSampleTextLogo(txt)}
                        className={`text-[10px] px-2 py-1 rounded border ${
                          sampleTextLogo === txt
                            ? "bg-slate-800 text-amber-300 border-amber-500/50"
                            : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sliders: Scale, Y Position, Rotation */}
              <div className="space-y-4 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Logo Scale ({logoScale}%)</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={160}
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Vertical Position ({logoYPos}%)</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={75}
                    value={logoYPos}
                    onChange={(e) => setLogoYPos(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
