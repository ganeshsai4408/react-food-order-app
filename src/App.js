import React from "react";
import { CartProvider } from "./assets/context/CartContext";
import { DarkModeProvider } from "./assets/context/Dark";
import ProductList from "./assets/components/ProductList";
import BillingSection from "./assets/components/BillingSection";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <DarkModeProvider>
        <div className="app-container" style={{ display: "flex", padding: "10px" }}>
          <div className="main-container">
            <ProductList />
            <BillingSection />
          </div>
        </div>
      </DarkModeProvider>
    </CartProvider>
  );
}

export default App;