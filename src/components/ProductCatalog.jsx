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
    <section id="product-catalog-section" className="section-padding bg-[#F7F1E7] border-b border-[#E5D9C8]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-sm font-bold uppercase tracking-widest text-[#C6A15B]">
              Curated Collections
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#173F35] leading-tight font-heading">
              Curated <span className="text-[#C6A15B]">Corporate Gifts</span>
            </h2>
            <p className="text-[#6F6A62] text-base md:text-lg leading-relaxed">
              Handcrafted executive gift sets designed for VIP clients, onboarding milestones, and team recognition across Malaysia.
            </p>
          </div>

          <button
            onClick={() => setActiveTab("builder")}
            className="btn-secondary text-base py-3.5 px-7 shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#173F35]" />
            <span>Build a Custom Box</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF8] p-6 md:p-8 rounded-3xl border border-[#E5D9C8] space-y-6 mb-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-5 h-5 text-[#6F6A62] absolute left-4 top-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gifts by keyword, tech item, or theme..."
                className="custom-input pl-12 text-base h-13"
              />
            </div>

            {/* Budget Range Slider */}
            <div className="flex items-center gap-4 bg-[#F7F1E7] px-6 py-3 rounded-2xl border border-[#E5D9C8] shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-[#C6A15B]" />
              <div className="text-sm text-[#252525]">
                Budget Limit: <span className="font-extrabold text-[#173F35]">{formatPrice(maxBudget)}</span>
              </div>
              <input
                type="range"
                min={200}
                max={700}
                step={20}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-36 h-2 bg-[#E5D9C8] rounded-lg appearance-none cursor-pointer"
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
                    ? "bg-[#173F35] text-[#F7F1E7] shadow-md"
                    : "bg-[#F7F1E7] text-[#252525] hover:text-[#173F35] border border-[#E5D9C8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Soft Ivory Cards */}
        <div className="grid-catalog">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FFFDF8] rounded-3xl overflow-hidden border border-[#E5D9C8] hover:border-[#C6A15B] transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F7F1E7]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-[#FFFDF8]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-extrabold text-[#173F35] flex items-center gap-1.5 border border-[#E5D9C8] shadow-sm">
                    <Star className="w-4 h-4 fill-[#C6A15B] text-[#C6A15B]" />
                    <span>{product.rating}</span>
                    <span className="text-[#6F6A62]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-4">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6A15B] block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#173F35] group-hover:text-[#C6A15B] transition-colors line-clamp-1 font-heading">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-base text-[#6F6A62] line-clamp-2 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Included Items */}
                  <div className="bg-[#F7F1E7] p-4 rounded-2xl border border-[#E5D9C8] space-y-1.5">
                    <span className="text-xs font-bold text-[#6F6A62] uppercase tracking-wider block">
                      Includes Premium Swag:
                    </span>
                    <p className="text-sm text-[#252525] truncate">
                      • {product.items[0]}
                    </p>
                    <p className="text-sm text-[#252525] truncate">
                      • {product.items[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-8 pt-0 border-t border-[#E5D9C8]/60 flex items-center justify-between gap-4 mt-4">
                <div>
                  <div className="text-xs text-[#6F6A62] font-semibold">Starting from</div>
                  <div className="text-2xl font-black text-[#C6A15B] font-heading">
                    {formatPrice(product.tiers[3].price)}
                    <span className="text-xs font-normal text-[#6F6A62]"> / box</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openQuickView(product)}
                    className="p-3 rounded-2xl bg-[#F7F1E7] border border-[#E5D9C8] text-[#173F35] hover:border-[#173F35]"
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
                    className="btn-primary text-sm py-3 px-5 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F7F1E7]" />
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
