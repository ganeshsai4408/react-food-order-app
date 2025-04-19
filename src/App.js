import React from "react";
import { CartProvider } from "./assets/context/CartContext";
import ProductList from "./assets/components/ProductList";
import BillingSection from "./assets/components/BillingSection";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="app-container" style={{ display: "flex", padding: "20px" }}>
        
        <ProductList />
        
        <BillingSection />
       
      </div>
    </CartProvider>
  );
}

export default App;

