import React, { createContext, useContext, useState, useEffect } from "react";

const GiftContext = createContext();

export const currencySymbols = {
  MYR: "RM",
  USD: "$",
  SGD: "S$"
};

export const currencyRates = {
  MYR: 1.0,
  USD: 0.22,
  SGD: 0.30
};

export const GiftProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState("MYR");
  const [logoFile, setLogoFile] = useState(null); // { name, url }
  const [savedQuotes, setSavedQuotes] = useState([]);
  
  // UI Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("catalog");
  const [toastMessage, setToastMessage] = useState(null);

  // Toast helper
  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const formatPrice = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "RM 0";
    const symbol = currencySymbols[currency] || "RM";
    const rate = currencyRates[currency] || 1.0;
    const converted = Math.round(amount * rate);
    return `${symbol} ${converted.toLocaleString()}`;
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1 && item.type !== "custom-box") {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }
      return [...prev, { ...item, cartId: Date.now() + Math.random() }];
    });
    showNotification(`Added "${item.name}" to your quote cart.`);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateCartQuantity = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const addSavedQuote = (quote) => {
    setSavedQuotes((prev) => [quote, ...prev]);
    showNotification("Formal Enterprise RFQ generated successfully!");
  };

  return (
    <GiftContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        currency,
        setCurrency,
        formatPrice,
        logoFile,
        setLogoFile,
        savedQuotes,
        addSavedQuote,
        isCartOpen,
        setIsCartOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        activeTab,
        setActiveTab,
        toastMessage,
        showNotification
      }}
    >
      {children}
    </GiftContext.Provider>
  );
};

export const useGiftContext = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error("useGiftContext must be used within a GiftProvider");
  }
  return context;
};
