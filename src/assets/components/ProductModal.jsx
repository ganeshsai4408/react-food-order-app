import React, { useState, useContext, useEffect } from "react";
import "./ProductModal.css";

import { CartContext } from "../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(product.price);

  useEffect(() => {
    let optionPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    let addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    setTotal((product.price + optionPrice + addonPrice) * quantity);
  }, [selectedOptions, selectedAddons, quantity, product.price]);

  const toggleOption = (option) => {
    let updated = [...selectedOptions];
    if (updated.find(o => o.id === option.id)) {
      updated = updated.filter(o => o.id !== option.id);
    } else {
      if (updated.length < 2) updated.push(option);
    }
    setSelectedOptions(updated);
  };

  const toggleAddon = (addon) => {
    let updated = [...selectedAddons];
    if (updated.find(a => a.id === addon.id)) {
      updated = updated.filter(a => a.id !== addon.id);
    } else {
      updated.push(addon);
    }
    setSelectedAddons(updated);
  };

  const handleAddToCart = () => {
    if (selectedOptions.length < 1) {
      alert("Please select at least 1 option.");
      return;
    }

    const cartItem = {
      id: Date.now(), 
      name: product.name,
      basePrice: product.price,
      options: selectedOptions,
      addons: selectedAddons,
      quantity,
      total,
      

    };
    console.log("🛒 Sending item to addToCart:", cartItem);

  
    

    addToCart(cartItem);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
  
       
        <div className="modal-top">
          <div className="modal-image-section">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>
  
          <div className="modal-name-price">
            <h2>{product.name}</h2>
            <p>Base Price: ₹{product.price.toFixed(2)}</p>
          </div>
        </div>
  
       
        <div className="modal-bottom">
          <div className="section">
            <h4>Choose Options (1-2 required)</h4>
            {product.options?.map((opt) => (
              <label key={opt.id}>
                <input
                  type="checkbox"
                  checked={selectedOptions.some(o => o.id === opt.id)}
                  onChange={() => toggleOption(opt)}
                />
                {opt.label} (+₹{opt.price})
              </label>
            ))}
          </div>
  
          <div className="section">
            <h4>Addons (optional)</h4>
            {product.addons?.map((addon) => (
              <label key={addon.id}>
                <input
                  type="checkbox"
                  checked={selectedAddons.some(a => a.id === addon.id)}
                  onChange={() => toggleAddon(addon)}
                />
                {addon.label} (+₹{addon.price})
              </label>
            ))}
          </div>
  
          <div className="section">
            <label>Quantity: </label>
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>
  
          <h3>Total Price: ₹{total.toFixed(2)}</h3>
          <button className="add-button" onClick={handleAddToCart}>
            ➕ Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ProductModal;
