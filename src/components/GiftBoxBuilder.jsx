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
    <section className="section-padding bg-[#173F35] text-[#F7F1E7] border-b border-[#245447]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#C6A15B]">
            Interactive Box Studio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F7F1E7] leading-tight font-heading">
            Build Your Custom <span className="text-[#C6A15B]">Gift Box</span>
          </h2>
          <p className="text-[#F7F1E7]/85 text-base md:text-lg leading-relaxed">
            Curate luxury packaging, handpick artisan swag, upload your company logo, and generate personalized card notes with real-time pricing.
          </p>
        </div>

        {/* Spacious 4-Step Indicator Bar */}
        <div className="max-w-5xl mx-auto mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: 1, code: "01", title: "Choose Packaging", icon: Package },
              { num: 2, code: "02", title: "Choose Swag", icon: Plus },
              { num: 3, code: "03", title: "Add Branding", icon: Layers },
              { num: 4, code: "04", title: "Review Gift Box", icon: FileText }
            ].map((step) => {
              const isDone = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                    isCurrent
                      ? "bg-[#C6A15B] text-[#173F35] border-[#C6A15B] shadow-xl font-bold"
                      : isDone
                      ? "bg-[#245447] border-[#C6A15B]/40 text-[#C6A15B]"
                      : "bg-[#245447]/40 border-[#245447] text-[#F7F1E7]/60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                      isCurrent
                        ? "bg-[#173F35] text-[#C6A15B] font-heading"
                        : isDone
                        ? "bg-[#C6A15B] text-[#173F35]"
                        : "bg-[#173F35]/60 text-[#F7F1E7]/60"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : step.code}
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isCurrent ? "text-[#173F35]" : "text-[#F7F1E7]"}`}>
                      {step.title}
                    </div>
                    <div className={`text-xs mt-0.5 ${isCurrent ? "text-[#173F35]/80" : "text-[#F7F1E7]/70"}`}>
                      {step.num === 1
                        ? selectedPkg.name.split(" ")[0]
                        : step.num === 2
                        ? `${selectedItems.length} items`
                        : step.num === 3
                        ? logoFile ? "Logo set" : "Branding"
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
              <div className="bg-[#FFFDF8] p-6 md:p-8 rounded-3xl border border-[#E5D9C8] space-y-6 animate-fade-in text-[#252525] shadow-lg">
                <div className="flex items-center justify-between border-b border-[#E5D9C8] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#173F35]">Step 1: Choose Luxury Packaging</h3>
                    <p className="text-xs text-[#6F6A62]">Every box includes custom shredded paper fill, tissue wrap & magnetic seal.</p>
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
                            ? "bg-[#FFFDF8] border-[#C6A15B] ring-2 ring-[#C6A15B]/40 shadow-md"
                            : "bg-[#F7F1E7] border-[#E5D9C8] hover:border-[#173F35]"
                        }`}
                      >
                        {pkg.badge && (
                          <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#C6A15B]/20 text-[#A9843F] border border-[#C6A15B]/40">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="flex gap-4">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-20 h-20 rounded-xl object-cover border border-[#E5D9C8]"
                          />
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-[#173F35] group-hover:text-[#C6A15B] transition-colors font-heading">
                              {pkg.name}
                            </h4>
                            <p className="text-xs text-[#6F6A62] line-clamp-2">{pkg.description}</p>
                            <div className="flex items-center gap-3 pt-2 text-xs font-semibold">
                              <span className="text-[#C6A15B] font-bold">{formatPrice(pkg.price)} / box</span>
                              <span className="text-[#E5D9C8]">•</span>
                              <span className="text-[#252525]">Max {pkg.maxVolumeUnits} Items</span>
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
              <div className="bg-[#FFFDF8] p-6 md:p-8 rounded-3xl border border-[#E5D9C8] space-y-6 animate-fade-in text-[#252525] shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5D9C8] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#173F35]">Step 2: Handpick Artisan Swag</h3>
                    <p className="text-xs text-[#6F6A62]">Click items to toggle them into your custom gift box.</p>
                  </div>

                  {/* Capacity Meter Bar */}
                  <div className="bg-[#F7F1E7] px-4 py-2 rounded-xl border border-[#E5D9C8] flex items-center gap-3">
                    <span className="text-xs text-[#6F6A62] font-semibold">Box Fill:</span>
                    <div className="w-32 bg-[#E5D9C8] h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isOverCapacity
                            ? "bg-rose-500"
                            : totalVolumeUnits / maxVolume > 0.8
                            ? "bg-[#C6A15B]"
                            : "bg-[#173F35]"
                        }`}
                        style={{ width: `${Math.min(100, (totalVolumeUnits / maxVolume) * 100)}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        isOverCapacity ? "text-rose-600" : "text-[#173F35]"
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
                            ? "bg-[#FFFDF8] border-[#C6A15B] ring-2 ring-[#C6A15B]/40 shadow-sm"
                            : "bg-[#F7F1E7] border-[#E5D9C8] hover:border-[#173F35]"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#E5D9C8]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-[#173F35] truncate">{item.name}</h4>
                            <span className="text-xs font-bold text-[#C6A15B] ml-2">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="text-xs text-[#6F6A62] truncate">{item.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#E5D9C8]/60 text-[#252525] font-semibold">
                              {item.category} ({item.volumeUnits} Vol)
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded ${
                                isSelected
                                  ? "bg-[#173F35] text-[#F7F1E7]"
                                  : "bg-[#E5D9C8] text-[#252525]"
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
              <div className="bg-[#FFFDF8] p-6 md:p-8 rounded-3xl border border-[#E5D9C8] space-y-6 animate-fade-in text-[#252525] shadow-lg">
                <div className="border-b border-[#E5D9C8] pb-4">
                  <h3 className="text-xl font-bold text-[#173F35]">Step 3: Corporate Branding & Ribbon</h3>
                  <p className="text-xs text-[#6F6A62]">Personalize box lid finishes and ribbon accenting with your brand identity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Upload Box */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#173F35]">
                      1. Upload Corporate Logo Vector / PNG
                    </label>
                    <div className="border-2 border-dashed border-[#E5D9C8] hover:border-[#173F35] rounded-2xl p-6 text-center bg-[#F7F1E7] transition-colors">
                      {logoFile ? (
                        <div className="space-y-3">
                          <img
                            src={logoFile.url}
                            alt="Logo preview"
                            className="max-h-20 mx-auto object-contain p-2 bg-[#FFFDF8] rounded-lg border border-[#E5D9C8]"
                          />
                          <p className="text-xs text-[#173F35] font-bold">{logoFile.name}</p>
                          <button
                            onClick={() => setLogoFile(null)}
                            className="text-xs text-rose-600 hover:underline font-bold"
                          >
                            Remove Logo
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer space-y-2 block">
                          <Upload className="w-8 h-8 text-[#C6A15B] mx-auto" />
                          <div className="text-sm font-semibold text-[#173F35]">
                            Click to Upload Logo File
                          </div>
                          <p className="text-xs text-[#6F6A62]">Supports SVG, PNG, AI, EPS (High Res)</p>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#173F35]">
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
                                ? "bg-[#FFFDF8] border-[#C6A15B] ring-2 ring-[#C6A15B]/40 font-bold"
                                : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525]"
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                              style={{ backgroundColor: ribbon.hex }}
                            />
                            <span className="text-xs font-semibold text-[#252525] truncate">
                              {ribbon.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Box Foil Stamping Finish */}
                <div className="pt-4 border-t border-[#E5D9C8] space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#173F35]">
                    3. Outer Lid Foil Imprint Style
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Gold Metallic Foil", "Silver Metallic Foil", "Blind Debossed (No Ink)"].map((style) => (
                      <button
                        key={style}
                        onClick={() => setCustomFoilStyle(style)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          customFoilStyle === style
                            ? "bg-[#173F35] text-[#F7F1E7] border-[#173F35]"
                            : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525] hover:border-[#173F35]"
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
              <div className="bg-[#FFFDF8] p-6 md:p-8 rounded-3xl border border-[#E5D9C8] space-y-6 animate-fade-in text-[#252525] shadow-lg">
                <div className="border-b border-[#E5D9C8] pb-4">
                  <h3 className="text-xl font-bold text-[#173F35]">Step 4: Personalised Card Note & Volume Order</h3>
                  <p className="text-xs text-[#6F6A62]">Choose a greeting message template and specify total unit box quantity.</p>
                </div>

                {/* Box Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-[#173F35]">
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
                  <label className="text-xs font-bold uppercase text-[#173F35]">
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
                            ? "bg-[#173F35] text-[#F7F1E7] border-[#173F35]"
                            : "bg-[#F7F1E7] border-[#E5D9C8] text-[#252525]"
                        }`}
                      >
                        <div className="text-xs font-bold">{tpl.title}</div>
                        <div className="text-[10px] opacity-75 mt-1">{tpl.category}</div>
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
                <div className="pt-4 border-t border-[#E5D9C8] space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-xs font-bold uppercase text-[#173F35]">
                        Total Order Box Quantity
                      </label>
                      <p className="text-xs text-[#6F6A62]">Tier discount applies automatically.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-[#C6A15B] font-heading">
                        {boxQuantity}
                      </span>
                      <span className="text-xs text-[#6F6A62] ml-1">Boxes</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={boxQuantity}
                    onChange={(e) => setBoxQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5D9C8] rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-[#6F6A62] font-semibold">
                    <span>10 (Base)</span>
                    <span className={boxQuantity >= 50 ? "text-[#173F35] font-bold" : ""}>50 (10% OFF)</span>
                    <span className={boxQuantity >= 200 ? "text-[#173F35] font-bold" : ""}>200 (18% OFF)</span>
                    <span className={boxQuantity >= 500 ? "text-[#173F35] font-bold" : ""}>500+ (25% OFF)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="btn-secondary text-xs disabled:opacity-30 bg-[#FFFDF8]"
              >
                <ArrowLeft className="w-4 h-4 text-[#173F35]" />
                <span>Previous Step</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                  className="btn-gold text-xs py-3 px-6 shadow-md"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4 text-[#173F35]" />
                </button>
              ) : (
                <button
                  onClick={handleAddCustomBoxToCart}
                  className="btn-gold text-xs py-3 px-6 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#173F35]" />
                  <span>Add Custom Order ({formatPrice(totalOrderPrice)})</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Live Box Preview Card (Soft Ivory Card) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#E5D9C8] space-y-6 text-[#252525] shadow-xl">
              <div className="flex items-center justify-between border-b border-[#E5D9C8] pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#173F35]">
                  Live Custom Box Summary
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B]" />
              </div>

              {/* Box Image Visualizer */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E5D9C8] bg-[#F7F1E7] h-44 flex items-center justify-center p-4">
                <img
                  src={selectedPkg.image}
                  alt={selectedPkg.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-center space-y-2">
                  {logoFile ? (
                    <img
                      src={logoFile.url}
                      alt="Brand Logo"
                      className="max-h-12 mx-auto filter drop-shadow-md"
                    />
                  ) : (
                    <div className="text-xs font-bold px-3 py-1 bg-[#FFFDF8]/90 rounded-lg text-[#173F35] border border-[#E5D9C8] uppercase tracking-widest">
                      [ YOUR LOGO FOIL ]
                    </div>
                  )}
                  <div className="text-xs font-semibold text-[#173F35]">
                    Ribbon: {selectedRibbon.name}
                  </div>
                </div>
              </div>

              {/* Items Selected Checklist */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#173F35]">
                  <span>Selected Swag ({selectedItems.length})</span>
                  <span>{totalVolumeUnits}/{maxVolume} Vol</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs p-2 rounded bg-[#F7F1E7] border border-[#E5D9C8]"
                    >
                      <span className="text-[#252525] truncate">{item.name}</span>
                      <span className="text-[#C6A15B] font-bold">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                  {selectedItems.length === 0 && (
                    <p className="text-xs text-[#6F6A62] italic">No swag items added yet.</p>
                  )}
                </div>
              </div>

              {/* Price Calculation Table */}
              <div className="pt-4 border-t border-[#E5D9C8] space-y-2 text-xs">
                <div className="flex justify-between text-[#6F6A62]">
                  <span>Box Packaging ({selectedPkg.name.split(" ")[0]})</span>
                  <span>{formatPrice(selectedPkg.price)}</span>
                </div>
                <div className="flex justify-between text-[#6F6A62]">
                  <span>Swag Contents Total</span>
                  <span>{formatPrice(itemsTotalCost)}</span>
                </div>
                <div className="flex justify-between text-[#6F6A62]">
                  <span>Custom Branding & Assembly</span>
                  <span>{formatPrice(5)}</span>
                </div>

                <div className="flex justify-between text-[#252525] pt-2 border-t border-[#E5D9C8] font-semibold">
                  <span>Standard Unit Price</span>
                  <span className={discountRate > 0 ? "line-through text-[#6F6A62]" : ""}>
                    {formatPrice(baseBoxUnitPrice)}
                  </span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between text-[#173F35] font-bold">
                    <span>Volume Discount ({(discountRate * 100).toFixed(0)}%)</span>
                    <span>-{formatPrice(baseBoxUnitPrice - discountedUnitPrice)} / unit</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E5D9C8] flex justify-between items-baseline">
                  <div>
                    <div className="text-xs text-[#6F6A62]">Total ({boxQuantity} Boxes)</div>
                    <div className="text-xs font-bold text-[#C6A15B]">
                      {formatPrice(discountedUnitPrice)} / box
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#173F35] font-heading">
                    {formatPrice(totalOrderPrice)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddCustomBoxToCart}
                className="w-full btn-primary text-xs justify-center py-3 shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#F7F1E7]" />
                <span>Save & Add to Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
