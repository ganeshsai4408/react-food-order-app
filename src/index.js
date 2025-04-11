import React from 'react';
import ReactDOM from 'react-dom/client';
import { DarkModeProvider } from './assets/context/Dark'
import App from './App';


import { CartProvider } from "./assets/context/CartContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
    <DarkModeProvider>

    <App />
    </DarkModeProvider>
    </CartProvider>
  </React.StrictMode>
);


