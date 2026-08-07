import React, { createContext, useContext, useState, useEffect } from "react";

const GiftContext = createContext();

export const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£"
};

export const currencyRates = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79
};

export const GiftProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState("USD");
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

  const formatPrice = (usdAmount) => {
    const rate = currencyRates[currency] || 1.0;
    const symbol = currencySymbols[currency] || "$";
    const converted = Math.round(usdAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
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
