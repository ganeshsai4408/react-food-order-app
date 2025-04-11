import React, { useState, useContext } from "react";

import { DarkModeContext } from "../context/Dark"
import ProductModal from "./ProductModal";
import "./ProductList.css";
import burgerImg from "../images/burger-image.jpg";
import pizzaImg from "../images/pizza-image.jpg";
import oreoImg from "../images/oreo.jpg";
import RiceImg from "../images/rice-bolw.jpg";
import sandwichImg from "../images/sandwhich.jpg";
import { IoSunnyOutline } from "react-icons/io5";
import { WiMoonAltNew } from "react-icons/wi";

const sampleProducts = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 120,
    image: burgerImg,
    options: [
      { id: "size-s", label: "Small", price: 0 },
      { id: "size-m", label: "Medium", price: 20 },
      { id: "size-l", label: "Large", price: 40 },
    ],
    addons: [
      { id: "addon-cheese", label: "Extra Cheese", price: 10 },
      { id: "addon-bacon", label: "Bacon", price: 15 },
    ],
  },
  {
    id: 2,
    name: "Veg Pizza",
    price: 150,
    image: pizzaImg,
    options: [
      { id: "thin", label: "Thin Crust", price: 0 },
      { id: "thick", label: "Thick Crust", price: 10 },
    ],
    addons: [
      { id: "addon-paneer", label: "Paneer", price: 20 },
      { id: "addon-olives", label: "Olives", price: 15 },
    ],
  },
  {
    id: 3,
    name: "special cold coffe",
    price: 130,
    image: oreoImg,
    options: [
      { id: "sprinkels", label: "sprinkels", price: 80 },
      { id: "nuts", label: "nuts", price: 50 },
    ],
    addons: [
      { id: "addon-ice-cream", label: "addon-ice-cream", price: 29 },
      { id: "addon-syrup", label: "addon-syrup", price: 55 },
    ],
  },
  {
    id: 4,
    name: "Rice",
    price: 130,
    image: RiceImg,
    options: [
      { id: "non-veg", label: "non-veg", price: 80 },
      { id: "veg", label: "veg", price: 50 },
    ],
    addons: [
      { id: "addon-ice-cream", label: "chicken-65", price: 89 },
      { id: "addon-syrup", label: "paneer-65", price: 55 },
    ],
  },
  {
    id: 5,
    name: "sandwich",
    price: 140,
    image: sandwichImg,
    options: [
      { id: "non-veg", label: "non-veg", price: 80 },
      { id: "veg", label: "veg", price: 50 },
    ],
    addons: [
      { id: "musturd", label: "musturd", price: 89 },
      { id: "mayo", label: "mayo", price: 55 },
    ],
  },
];

const ProductList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  //const toggleMode = () => {
    //setDarkMode((prev) => !prev);
    // This affects the entire document/body
   // document.body.classList.toggle("dark-mode");
  //};

  return (
    <div className={`main-container ${darkMode ? "dark-theme" : ""}`}>
    

      {/* Product Section */}
      <div className="product-section">
        <div className="product-header">
          <div className="header-title">Product Section</div>
          <div className="toggle-btn-container">
          <button onClick={toggleDarkMode} className="toggle-mode-btn">
            {darkMode ? <IoSunnyOutline size={20} /> : <WiMoonAltNew size={22} />}
            Toggle Mode
          </button>
          </div>
        </div>

        <div className="product-controls">
          <select>
            <option value="all">All Categories</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="drinks">Drinks</option>
          </select>
          <input type="text" placeholder="🔍 Search here" />
        </div>

        <div className="grid responsive-grid">
          {sampleProducts.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={item.name} className="product-image" />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedItem && (
        <ProductModal
          product={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
