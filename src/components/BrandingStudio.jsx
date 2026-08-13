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
    <section className="section-padding bg-slate-900/40 border-b border-slate-800/80">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            3D Virtual Proofing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
            Custom Logo <span className="cyan-gradient-text">Branding Studio</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Preview laser engraving, metallic foil stamping, and debossing directly on luxury merchandise before production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Controls & Logo Upload (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              {/* Product Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-200 block">
                  1. Select Merchandise Item
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {mockProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                        selectedProduct.id === p.id
                          ? "bg-slate-950 border-cyan-500 text-cyan-300 font-bold shadow-lg"
                          : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <img src={p.baseImage} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="text-sm font-bold text-slate-100">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Imprint Finish Selection */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-200 block">
                  2. Choose Logo Imprint Finish
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {imprintMethods.map((imp) => (
                    <button
                      key={imp.id}
                      onClick={() => setSelectedImprint(imp)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedImprint.id === imp.id
                          ? "bg-cyan-500 text-slate-950 font-bold border-cyan-500 shadow"
                          : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      {imp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Logo vs Preset */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-200 block">
                  3. Upload Company Vector Logo
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl text-center bg-slate-950/60 transition-colors">
                  {logoFile ? (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-400 font-semibold truncate">{logoFile.name}</span>
                      <button
                        onClick={() => setLogoFile(null)}
                        className="text-rose-400 hover:underline text-xs font-bold"
                      >
                        Reset Logo
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold text-cyan-300 py-2">
                      <Upload className="w-5 h-5" />
                      <span>Click to Upload Logo File (PNG / SVG)</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {!logoFile && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs text-slate-400 w-full font-semibold">Or test preset brand text:</span>
                    {sampleLogos.map((txt) => (
                      <button
                        key={txt}
                        onClick={() => setSampleTextLogo(txt)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-bold ${
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

              {/* Sliders: Scale & Position */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Logo Scale ({logoScale}%)</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={160}
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded appearance-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Vertical Position ({logoYPos}%)</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={75}
                    value={logoYPos}
                    onChange={(e) => setLogoYPos(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: LARGE Merchandise Mockup Preview Canvas (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 space-y-4 shadow-2xl text-center">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
                <span className="font-extrabold text-slate-200 text-base">{selectedProduct.name}</span>
                <span className="badge badge-cyan">{selectedImprint.name}</span>
              </div>

              {/* Large Mockup Canvas (h-[520px]) */}
              <div
                className="relative rounded-2xl overflow-hidden h-[520px] flex items-center justify-center border border-slate-800 transition-colors shadow-inner"
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
                      className="max-h-28 max-w-[260px] object-contain filter drop-shadow-xl"
                    />
                  ) : (
                    <div
                      className={`text-2xl md:text-3xl font-black uppercase tracking-widest px-6 py-3 border-2 border-dashed border-current rounded-xl ${selectedImprint.textStyle}`}
                    >
                      {sampleTextLogo}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 text-xs bg-slate-950/85 px-4 py-1.5 rounded-full text-slate-300 border border-slate-800 font-semibold">
                  Visual Proof • Precision Laser Scale: {logoScale}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
