import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [customer, setCustomer] = useState(null);
  const [orderType, setOrderType] = useState("takeaway");

  // 🔁 Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (id) => {
    const item = cart.find((item) => item.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info(`${item?.name || "Item"} removed`);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      )
    );
    const item = cart.find((item) => item.id === id);
    toast.success(`+1 ${item?.name}`);
  };

  const decreaseQty = (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      toast.warn(`${item.name} removed`);
    } else {
      toast.info(`-1 ${item.name}`);
    }

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = (rate) => {
    return calculateSubtotal() * rate;
  };

  const calculateTotal = (rate, delivery) => {
    return calculateSubtotal() + calculateTax(rate) + delivery;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        customer,
        setCustomer,
        orderType,
        setOrderType,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
