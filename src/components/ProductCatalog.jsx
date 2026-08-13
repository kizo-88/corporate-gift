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
  const [maxBudget, setMaxBudget] = useState(700);

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
    <section id="product-catalog-section" className="section-padding bg-slate-950 border-b border-slate-800/80">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Curated Collections
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight">
              Curated <span className="gold-gradient-text">Corporate Gifts</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Handcrafted executive gift sets designed for VIP clients, onboarding milestones, and team recognition across Malaysia.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("builder")}
            className="btn-secondary text-base py-3.5 px-7 shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Build a Custom Box</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gifts by keyword, tech item, or theme..."
                className="custom-input pl-12 text-base h-13"
              />
            </div>

            {/* Budget Range Slider */}
            <div className="flex items-center gap-4 bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-amber-400" />
              <div className="text-sm text-slate-300">
                Budget Limit: <span className="font-extrabold text-amber-400">{formatPrice(maxBudget)}</span>
              </div>
              <input
                type="range"
                min={200}
                max={700}
                step={20}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-36 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Max 3 per row on desktop */}
        <div className="grid-catalog">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/70 rounded-3xl overflow-hidden border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Large Product Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-extrabold text-amber-300 flex items-center gap-1.5 border border-slate-800 shadow-md">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-base text-slate-300 line-clamp-2 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Included Items preview */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Includes Premium Swag:
                    </span>
                    <p className="text-sm text-slate-200 truncate">
                      • {product.items[0]}
                    </p>
                    <p className="text-sm text-slate-200 truncate">
                      • {product.items[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-8 pt-0 border-t border-slate-800/60 flex items-center justify-between gap-4 mt-4">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Starting from</div>
                  <div className="text-2xl font-black text-amber-400 font-heading">
                    {formatPrice(product.tiers[3].price)}
                    <span className="text-xs font-normal text-slate-400"> / box</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openQuickView(product)}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                    title="Quick View"
                  >
                    <Eye className="w-5 h-5" />
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
                    className="btn-primary text-sm py-3 px-5 shadow-md shadow-amber-500/20"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Select</span>
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
