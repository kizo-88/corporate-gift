import React, { useState } from "react";
import { products } from "../data/products";
import { useGiftContext } from "../context/GiftContext";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Eye,
  ShoppingBag,
  Star,
  ShieldCheck,
  PackageCheck
} from "lucide-react";

export default function ProductCatalog() {
  const { formatPrice, openQuickView, addToCart, setIsCartOpen, setActiveTab } = useGiftContext();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxBudget, setMaxBudget] = useState(350);

  const categories = [
    "All",
    "Executive Onboarding",
    "Tech & Innovation",
    "Eco-Friendly",
    "Client Appreciation",
    "Wellness & Care",
    "Holiday & Milestones"
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBudget = prod.price <= maxBudget;
    return matchesCategory && matchesSearch && matchesBudget;
  });

  return (
    <section className="py-12 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Gift Collections</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">
              Curated Ready-to-Ship <span className="gold-gradient-text">Gift Sets</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Handcrafted, turn-key corporate gift boxes ready for custom branding and multi-address drop-shipping.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("builder")}
            className="btn-primary text-xs py-3 px-6 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Or Build Custom Box from Scratch</span>
          </button>
        </div>

        {/* Filter Bar Controls */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4 border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, tech item, or theme..."
                className="custom-input pl-10 text-xs"
              />
            </div>

            {/* Budget Range Slider */}
            <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <div className="text-xs text-slate-300">
                Max Budget: <span className="font-bold text-amber-400">{formatPrice(maxBudget)}</span>
              </div>
              <input
                type="range"
                min={80}
                max={350}
                step={10}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid-catalog">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 badge badge-gold shadow-lg">
                    {product.tag}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1 border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
                  </div>

                  {/* Hover Quick View Trigger */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => openQuickView(product)}
                      className="btn-primary text-xs py-2.5 px-5 shadow-xl"
                    >
                      <Eye className="w-4 h-4 text-slate-950" />
                      <span>Quick View & Custom Proof</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Items preview */}
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Includes 5 Premium Items:
                    </span>
                    <p className="text-xs text-slate-300 truncate">
                      • {product.items[0]}
                    </p>
                    <p className="text-xs text-slate-300 truncate">
                      • {product.items[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Pricing & Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/60 flex items-center justify-between gap-4 mt-2">
                <div>
                  <div className="text-[10px] text-slate-400">Starting from</div>
                  <div className="text-xl font-extrabold text-amber-400 font-heading">
                    {formatPrice(product.tiers[3].price)}
                    <span className="text-xs font-normal text-slate-400"> / unit</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Base: {formatPrice(product.price)} (MOQ: {product.moq})
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openQuickView(product)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      addToCart({
                        ...product,
                        unitPrice: product.tiers[1].price,
                        quantity: 25,
                        selectedCustomization: product.customizationOptions[0]
                      });
                      setIsCartOpen(true);
                    }}
                    className="btn-primary text-xs py-2.5 px-4"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Quick Quote</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
