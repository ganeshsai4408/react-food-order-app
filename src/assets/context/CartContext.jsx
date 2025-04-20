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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const updatedCart = [...prev, item];
      console.log("🛍 Cart updated:", updatedCart);
      return updatedCart;
    });
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
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: (item.quantity + 1) * Number(item.price),
            }
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
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * Number(item.price),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const base = item.basePrice || item.price || 0;
      const optionTotal = item.options?.reduce((sum, o) => sum + o.price, 0) || 0;
      const addonTotal = item.addons?.reduce((sum, a) => sum + a.price, 0) || 0;
      const itemTotal = (base + optionTotal + addonTotal) * item.quantity;
      return total + itemTotal;
    }, 0);
  };
  
  const calculateTax = (taxRate) => {
    return calculateSubtotal() * taxRate;
  };
  
  const calculateTotal = (taxRate, deliveryCharge) => {
    return calculateSubtotal() + calculateTax(taxRate) + deliveryCharge;
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
