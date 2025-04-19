import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from 'react-toastify';
import "./BillingSection.css";

const BillingSection = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    clearCart,
  } = useContext(CartContext);

  const taxRate = 0.08;
  const deliveryCharge = 20;

  const subtotal = calculateSubtotal();
  const tax = calculateTax(taxRate);
  const total = calculateTotal(taxRate, deliveryCharge);

  return (
    <div className="billing">
      <div className="billing-container">
        <div className="billing-header">Billing Section</div>

        <div className="billing-top-row">
          <select className="customer-select">
            <option value="">Select Customer</option>
            <option value="customer1">John Doe</option>
            <option value="customer2">Jane Smith</option>
          </select>
          <button className="add-customer-btn">+ Customer</button>
        </div>

        <div className="billing-subsection">
          <label className="section-label">Select Branch</label>
          <select className="branch-select">
            <option>Main Branch</option>
            <option>Branch 1</option>
            <option>Branch 2</option>
          </select>
        </div>

        <div className="billing-subsection">
          <label className="section-label">Select Order Type</label>
          <div className="order-type-options">
            <label><input type="radio" name="orderType" defaultChecked /> Take Away</label>
            <label><input type="radio" name="orderType" /> Dine-In</label>
            <label><input type="radio" name="orderType" /> Home Delivery</label>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="billing-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: "0.8rem", color: "#555" }}>
                      {item.options?.map((opt) => (
                        <div key={opt.id}>+ {opt.label}</div>
                      ))}
                      {item.addons?.map((addon) => (
                        <div key={addon.id}>+ {addon.label}</div>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </td>

                  <td>₹{item.total.toFixed(2)}</td>

                  <td>
                    <button onClick={() => removeFromCart(item.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="billing-summary">
            <p>Subtotal: <span>₹{subtotal.toFixed(2)}</span></p>
            <p>Tax (8%): <span>₹{tax.toFixed(2)}</span></p>
            <p>Delivery: <span>₹{deliveryCharge.toFixed(2)}</span></p>
            <hr />
            <h3>Total: <span>₹{total.toFixed(2)}</span></h3>

            <div className="payment-buttons">
              <button className="cash-btn">Cash</button>
              <button className="card-btn">Card</button>
            </div>

            <button
              className="place-order-btn"
              onClick={() => {
                if (cart.length === 0) return toast.error("Cart is empty!");
                toast.success("Order placed successfully!");
                clearCart();
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BillingSection;
