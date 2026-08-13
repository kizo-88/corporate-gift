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
    { name: "Royal Emerald", hex: "#173F35" },
    { name: "Champagne Gold", hex: "#C6A15B" },
    { name: "Matte Cream", hex: "#F7F1E7" }
  ];

  const imprintMethods = [
    { id: "laser", name: "Laser Engraving", textStyle: "text-[#C6A15B] font-extrabold tracking-widest opacity-90 drop-shadow" },
    { id: "foil-gold", name: "Metallic Gold Foil", textStyle: "text-[#C6A15B] font-black tracking-widest drop-shadow-[0_0_8px_rgba(198,161,91,0.8)]" },
    { id: "deboss", name: "Blind Debossed", textStyle: "text-[#173F35] font-black tracking-widest mix-blend-multiply" },
    { id: "screen", name: "Full Color Screen Print", textStyle: "text-[#173F35] font-bold tracking-widest" }
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
    <section className="section-padding bg-[#F7F1E7] border-b border-[#E5D9C8]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#C6A15B]">
            3D Virtual Proofing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173F35] leading-tight font-heading">
            Custom Logo <span className="text-[#C6A15B]">Branding Studio</span>
          </h2>
          <p className="text-[#6F6A62] text-base md:text-lg leading-relaxed">
            Preview laser engraving, metallic foil stamping, and debossing directly on luxury merchandise before production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Controls & Logo Upload (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF8] p-8 rounded-3xl border border-[#E5D9C8] space-y-6 shadow-md text-[#252525]">
              {/* Product Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-[#173F35] block">
                  1. Select Merchandise Item
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {mockProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                        selectedProduct.id === p.id
                          ? "bg-[#173F35] text-[#F7F1E7] font-bold shadow-md"
                          : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525] hover:border-[#173F35]"
                      }`}
                    >
                      <img src={p.baseImage} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-[#E5D9C8]" />
                      <div>
                        <div className="text-sm font-bold">{p.name}</div>
                        <div className={`text-xs ${selectedProduct.id === p.id ? "text-[#C6A15B]" : "text-[#6F6A62]"}`}>{p.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Imprint Finish Selection */}
              <div className="space-y-3 pt-4 border-t border-[#E5D9C8]">
                <label className="text-sm font-bold uppercase tracking-wider text-[#173F35] block">
                  2. Choose Logo Imprint Finish
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {imprintMethods.map((imp) => (
                    <button
                      key={imp.id}
                      onClick={() => setSelectedImprint(imp)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedImprint.id === imp.id
                          ? "bg-[#C6A15B] text-[#173F35] border-[#C6A15B] font-extrabold shadow"
                          : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525] hover:border-[#173F35]"
                      }`}
                    >
                      {imp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Logo vs Preset */}
              <div className="space-y-3 pt-4 border-t border-[#E5D9C8]">
                <label className="text-sm font-bold uppercase tracking-wider text-[#173F35] block">
                  3. Upload Company Vector Logo
                </label>
                <div className="border-2 border-dashed border-[#E5D9C8] hover:border-[#173F35] p-5 rounded-2xl text-center bg-[#F7F1E7] transition-colors">
                  {logoFile ? (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#173F35] font-bold truncate">{logoFile.name}</span>
                      <button
                        onClick={() => setLogoFile(null)}
                        className="text-rose-600 hover:underline text-xs font-bold"
                      >
                        Reset Logo
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold text-[#173F35] py-2">
                      <Upload className="w-5 h-5 text-[#C6A15B]" />
                      <span>Click to Upload Logo File (PNG / SVG)</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {!logoFile && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs text-[#6F6A62] w-full font-semibold">Or test preset brand text:</span>
                    {sampleLogos.map((txt) => (
                      <button
                        key={txt}
                        onClick={() => setSampleTextLogo(txt)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-bold ${
                          sampleTextLogo === txt
                            ? "bg-[#173F35] text-[#F7F1E7] border-[#173F35]"
                            : "bg-[#F7F1E7] text-[#252525] border-[#E5D9C8]"
                        }`}
                      >
                        {txt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sliders: Scale & Position */}
              <div className="space-y-4 pt-4 border-t border-[#E5D9C8] text-xs">
                <div>
                  <div className="flex justify-between text-[#173F35] font-semibold mb-1.5">
                    <span>Logo Scale ({logoScale}%)</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={160}
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5D9C8] rounded appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#173F35] font-semibold mb-1.5">
                    <span>Vertical Position ({logoYPos}%)</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={75}
                    value={logoYPos}
                    onChange={(e) => setLogoYPos(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5D9C8] rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Merchandise Mockup Preview Canvas */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF8] p-8 rounded-3xl border border-[#E5D9C8] space-y-4 shadow-xl text-center">
              <div className="flex items-center justify-between text-xs text-[#6F6A62] border-b border-[#E5D9C8] pb-4">
                <span className="font-extrabold text-[#173F35] text-base font-heading">{selectedProduct.name}</span>
                <span className="badge badge-forest">{selectedImprint.name}</span>
              </div>

              {/* Large Mockup Canvas (h-[520px]) */}
              <div
                className="relative rounded-2xl overflow-hidden h-[520px] flex items-center justify-center border border-[#E5D9C8] transition-colors shadow-inner"
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

                <div className="absolute bottom-4 left-4 text-xs bg-[#FFFDF8]/90 px-4 py-1.5 rounded-full text-[#173F35] border border-[#E5D9C8] font-bold shadow-md">
                  Visual Proof • Precision Scale: {logoScale}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
