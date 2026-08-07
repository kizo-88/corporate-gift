import React, { useState } from "react";
import { useGiftContext } from "../context/GiftContext";
import { packagingOptions, ribbonColors, cardTemplates } from "../data/packagingOptions";
import { boxItems } from "../data/boxItems";
import {
  Package,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Upload,
  FileText,
  Ribbon,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Info,
  Sliders
} from "lucide-react";

export default function GiftBoxBuilder() {
  const { formatPrice, addToCart, logoFile, setLogoFile, setIsCartOpen } = useGiftContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState(packagingOptions[0]);
  const [selectedItems, setSelectedItems] = useState([boxItems[0], boxItems[1]]);
  const [selectedRibbon, setSelectedRibbon] = useState(ribbonColors[0]);
  const [customFoilStyle, setCustomFoilStyle] = useState("Gold Metallic Foil");
  const [selectedCardTemplate, setSelectedCardTemplate] = useState(cardTemplates[0]);
  const [customCardMessage, setCustomCardMessage] = useState(cardTemplates[0].defaultMessage);
  const [boxQuantity, setBoxQuantity] = useState(50);
  const [boxName, setBoxName] = useState("Custom Executive Welcome Box");

  // Volume units calculation
  const totalVolumeUnits = selectedItems.reduce((acc, item) => acc + item.volumeUnits, 0);
  const maxVolume = selectedPkg.maxVolumeUnits;
  const isOverCapacity = totalVolumeUnits > maxVolume;

  // Single Box unit price calculation
  const itemsTotalCost = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const baseBoxUnitPrice = selectedPkg.price + itemsTotalCost + 5; // +$5 custom branding/assembly

  // Volume Tier Discount multiplier
  let discountRate = 0;
  if (boxQuantity >= 500) discountRate = 0.25;
  else if (boxQuantity >= 200) discountRate = 0.18;
  else if (boxQuantity >= 50) discountRate = 0.10;
  else if (boxQuantity >= 25) discountRate = 0.05;

  const discountedUnitPrice = Math.round(baseBoxUnitPrice * (1 - discountRate));
  const totalOrderPrice = discountedUnitPrice * boxQuantity;

  const toggleItemSelection = (item) => {
    if (selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      if (totalVolumeUnits + item.volumeUnits > maxVolume) {
        alert(`Box capacity full! Upgrade packaging or remove an item to add ${item.name}.`);
        return;
      }
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setLogoFile({ name: file.name, url: uploadEvent.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomBoxToCart = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least 1 item for your custom gift box.");
      return;
    }
    const customBoxObject = {
      id: `custom-box-${Date.now()}`,
      name: boxName,
      type: "custom-box",
      unitPrice: discountedUnitPrice,
      baseUnitPrice: baseBoxUnitPrice,
      quantity: boxQuantity,
      packaging: selectedPkg,
      items: selectedItems,
      ribbon: selectedRibbon,
      foilStyle: customFoilStyle,
      cardTemplate: selectedCardTemplate,
      cardMessage: customCardMessage,
      customLogo: logoFile ? logoFile.url : null,
      description: `Custom box with ${selectedItems.length} items encased in ${selectedPkg.name} with ${selectedRibbon.name}.`
    };

    addToCart(customBoxObject);
    setIsCartOpen(true);
  };

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Build-a-Box Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100">
            Design Your Signature{" "}
            <span className="gold-gradient-text">Corporate Gift Box</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Select luxury packaging, handpick artisan swag, upload your company logo, and generate personalized card notes with real-time pricing.
          </p>
        </div>

        {/* Wizard Step Progress Tracker */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-4 gap-2 md:gap-4 relative">
            {[
              { num: 1, title: "1. Packaging", icon: Package },
              { num: 2, title: "2. Add Swag", icon: Plus },
              { num: 3, title: "3. Branding", icon: Layers },
              { num: 4, title: "4. Card & Quantity", icon: FileText }
            ].map((step) => {
              const Icon = step.icon;
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`p-3 md:p-4 rounded-xl border text-left transition-all flex flex-col md:flex-row items-center md:items-center gap-3 ${
                    isCurrent
                      ? "bg-slate-900 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10"
                      : isDone
                      ? "bg-slate-900/60 border-slate-800 text-emerald-400"
                      : "bg-slate-950 border-slate-800 text-slate-500 opacity-70"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? "bg-amber-500 text-slate-950"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                  </div>
                  <div className="hidden md:block">
                    <div className="text-xs font-bold">{step.title}</div>
                    <div className="text-[10px] text-slate-400">
                      {step.num === 1
                        ? selectedPkg.name.split(" ")[0]
                        : step.num === 2
                        ? `${selectedItems.length} items selected`
                        : step.num === 3
                        ? logoFile ? "Logo uploaded" : "Default branding"
                        : `${boxQuantity} units`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wizard Steps (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: PACKAGING SELECTOR */}
            {currentStep === 1 && (
              <div className="glass-panel p-6 md:p-8 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Step 1: Choose Luxury Packaging</h3>
                    <p className="text-xs text-slate-400">Every box includes custom shredded paper fill, tissue wrap & magnetic seal.</p>
                  </div>
                  <span className="badge badge-gold">Box Capacity & Aesthetics</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packagingOptions.map((pkg) => {
                    const isSelected = selectedPkg.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                          isSelected
                            ? "bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10"
                            : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        {pkg.badge && (
                          <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="flex gap-4">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-20 h-20 rounded-xl object-cover border border-slate-800"
                          />
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                              {pkg.name}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-2">{pkg.description}</p>
                            <div className="flex items-center gap-3 pt-2 text-xs font-semibold">
                              <span className="text-amber-400">{formatPrice(pkg.price)} / box</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-slate-300">Max {pkg.maxVolumeUnits} Items</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: ADD ITEMS */}
            {currentStep === 2 && (
              <div className="glass-panel p-6 md:p-8 space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Step 2: Handpick Artisan Swag</h3>
                    <p className="text-xs text-slate-400">Click items to toggle them into your custom gift box.</p>
                  </div>

                  {/* Visual Capacity Meter Bar */}
                  <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-semibold">Box Fill:</span>
                    <div className="w-32 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isOverCapacity
                            ? "bg-rose-500"
                            : totalVolumeUnits / maxVolume > 0.8
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                        style={{ width: `${Math.min(100, (totalVolumeUnits / maxVolume) * 100)}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isOverCapacity ? "text-rose-400" : "text-amber-400"
                      }`}
                    >
                      {totalVolumeUnits} / {maxVolume} Units
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {boxItems.map((item) => {
                    const isSelected = selectedItems.some((i) => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItemSelection(item)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-4 ${
                          isSelected
                            ? "bg-slate-900 border-amber-500 ring-1 ring-amber-500/50"
                            : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-slate-800"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-100 truncate">{item.name}</h4>
                            <span className="text-xs font-bold text-amber-400 ml-2">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate">{item.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {item.category} ({item.volumeUnits} Vol)
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded ${
                                isSelected
                                  ? "bg-amber-500 text-slate-950"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {isSelected ? "Added ✓" : "+ Add Item"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: BRANDING & RIBBON */}
            {currentStep === 3 && (
              <div className="glass-panel p-6 md:p-8 space-y-6 animate-fade-in">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-100">Step 3: Corporate Branding & Ribbon</h3>
                  <p className="text-xs text-slate-400">Personalize box lid finishes and ribbon accenting with your brand identity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Upload Box */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      1. Upload Corporate Logo Vector / PNG
                    </label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-2xl p-6 text-center bg-slate-900/50 transition-colors">
                      {logoFile ? (
                        <div className="space-y-3">
                          <img
                            src={logoFile.url}
                            alt="Logo preview"
                            className="max-h-20 mx-auto object-contain p-2 bg-slate-950 rounded-lg border border-slate-800"
                          />
                          <p className="text-xs text-emerald-400 font-semibold">{logoFile.name}</p>
                          <button
                            onClick={() => setLogoFile(null)}
                            className="text-xs text-rose-400 hover:underline"
                          >
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer space-y-2 block">
                          <Upload className="w-8 h-8 text-amber-400 mx-auto" />
                          <div className="text-sm font-semibold text-slate-200">
                            Click to Upload Logo File
                          </div>
                          <p className="text-xs text-slate-500">Supports SVG, PNG, AI, EPS (High Res)</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Ribbon Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      2. Select Satin Ribbon Accent
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ribbonColors.map((ribbon) => {
                        const isSelected = selectedRibbon.id === ribbon.id;
                        return (
                          <button
                            key={ribbon.id}
                            onClick={() => setSelectedRibbon(ribbon)}
                            className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                              isSelected
                                ? "bg-slate-900 border-amber-500 ring-1 ring-amber-500/50"
                                : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                              style={{ backgroundColor: ribbon.hex }}
                            />
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {ribbon.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Box Foil Stamping Finish */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    3. Outer Lid Foil Imprint Style
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Gold Metallic Foil", "Silver Metallic Foil", "Blind Debossed (No Ink)"].map((style) => (
                      <button
                        key={style}
                        onClick={() => setCustomFoilStyle(style)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          customFoilStyle === style
                            ? "bg-amber-500 text-slate-950 border-amber-500"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CARD & QUANTITY */}
            {currentStep === 4 && (
              <div className="glass-panel p-6 md:p-8 space-y-6 animate-fade-in">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-100">Step 4: Personalised Card Note & Volume Order</h3>
                  <p className="text-xs text-slate-400">Choose a greeting message template and specify total unit box quantity.</p>
                </div>

                {/* Box Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Project / Box Name Reference
                  </label>
                  <input
                    type="text"
                    value={boxName}
                    onChange={(e) => setBoxName(e.target.value)}
                    className="custom-input font-bold"
                    placeholder="e.g. Q4 Executive Partner Gift Box"
                  />
                </div>

                {/* Card Templates */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-slate-300">
                    Greeting Card Template
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {cardTemplates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          setSelectedCardTemplate(tpl);
                          setCustomCardMessage(tpl.defaultMessage);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedCardTemplate.id === tpl.id
                            ? "bg-slate-900 border-amber-500 text-amber-300"
                            : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="text-xs font-bold">{tpl.title}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{tpl.category}</div>
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    value={customCardMessage}
                    onChange={(e) => setCustomCardMessage(e.target.value)}
                    className="custom-input text-xs serif-font italic leading-relaxed"
                    placeholder="Write custom message printed on thick cotton linen card insert..."
                  />
                </div>

                {/* Order Quantity Slider */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-300">
                        Total Order Box Quantity
                      </label>
                      <p className="text-xs text-slate-400">Tier discount applies automatically.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-amber-400 font-heading">
                        {boxQuantity}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">Boxes</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={boxQuantity}
                    onChange={(e) => setBoxQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>10 (Base)</span>
                    <span className={boxQuantity >= 50 ? "text-amber-400" : ""}>50 (10% OFF)</span>
                    <span className={boxQuantity >= 200 ? "text-amber-400" : ""}>200 (18% OFF)</span>
                    <span className={boxQuantity >= 500 ? "text-amber-400" : ""}>500+ (25% OFF)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="btn-secondary text-xs disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                  className="btn-primary text-xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              ) : (
                <button
                  onClick={handleAddCustomBoxToCart}
                  className="btn-primary text-xs py-3 px-6 shadow-xl shadow-amber-500/30"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Add Custom Order to Cart ({formatPrice(totalOrderPrice)})</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Box Preview Card & Pricing Summary (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="glass-panel-gold p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  Live Custom Box Summary
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>

              {/* Box Image Visualizer */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 h-44 flex items-center justify-center p-4">
                <img
                  src={selectedPkg.image}
                  alt={selectedPkg.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center space-y-2">
                  {logoFile ? (
                    <img
                      src={logoFile.url}
                      alt="Brand Logo"
                      className="max-h-12 mx-auto filter drop-shadow-md"
                    />
                  ) : (
                    <div className="text-xs font-bold px-3 py-1 bg-slate-950/80 rounded-lg text-amber-300 border border-amber-500/40 uppercase tracking-widest">
                      [ YOUR LOGO FOIL ]
                    </div>
                  )}
                  <div className="text-xs font-semibold text-slate-200">
                    Ribbon: {selectedRibbon.name}
                  </div>
                </div>
              </div>

              {/* Items Selected Checklist */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Selected Swag ({selectedItems.length})</span>
                  <span>{totalVolumeUnits}/{maxVolume} Vol</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs p-2 rounded bg-slate-900/60 border border-slate-800"
                    >
                      <span className="text-slate-300 truncate">{item.name}</span>
                      <span className="text-amber-400 font-semibold">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                  {selectedItems.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No swag items added yet.</p>
                  )}
                </div>
              </div>

              {/* Price Calculation Table */}
              <div className="pt-4 border-t border-amber-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Box Packaging ({selectedPkg.name.split(" ")[0]})</span>
                  <span>{formatPrice(selectedPkg.price)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Swag Contents Total</span>
                  <span>{formatPrice(itemsTotalCost)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Custom Branding & Assembly</span>
                  <span>{formatPrice(5)}</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-semibold">
                  <span>Standard Unit Price</span>
                  <span className={discountRate > 0 ? "line-through text-slate-500" : ""}>
                    {formatPrice(baseBoxUnitPrice)}
                  </span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Volume Discount ({(discountRate * 100).toFixed(0)}%)</span>
                    <span>-{formatPrice(baseBoxUnitPrice - discountedUnitPrice)} / unit</span>
                  </div>
                )}

                <div className="pt-3 border-t border-amber-500/30 flex justify-between items-baseline">
                  <div>
                    <div className="text-xs text-slate-400">Total ({boxQuantity} Boxes)</div>
                    <div className="text-xs font-bold text-amber-400">
                      {formatPrice(discountedUnitPrice)} / box
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-100 font-heading">
                    {formatPrice(totalOrderPrice)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddCustomBoxToCart}
                className="w-full btn-primary text-xs justify-center py-3"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950" />
                <span>Save & Add to Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
