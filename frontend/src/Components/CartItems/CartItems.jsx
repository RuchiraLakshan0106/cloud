import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks
import remove_icon from "../Assets/cart_cross_icon.png";
import qr from "../Assets/qr_promo.png";

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // For handling hash-based navigation

  const [promoCode, setPromoCode] = useState(""); // State for promo code
  const [discount, setDiscount] = useState(0); // State for discount percentage

  // Handle scrolling to the target element when the location hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Mocking user login status, replace this with actual authentication logic
  const isLoggedIn = true; // Set `true` if the user is logged in

  const handleProceedCheckout = () => {
    if (isLoggedIn) {
      navigate("/payment"); // Navigate to payment page if logged in
    } else {
      alert("Please log in first."); // Alert user to log in
      navigate("/login"); // Navigate to login page
    }
  };

  const handlePromoCodeSubmit = () => {
    if (promoCode === "gf600") {
      setDiscount(20); // Set 20% discount if promo code matches
      alert("Promo code applied! 20% discount applied.");
    } else {
      setDiscount(0); // Reset discount if promo code is invalid
      alert("Invalid promo code.");
    }
  };

  const totalAmount = getTotalCartAmount();
  const discountedTotal = totalAmount - (totalAmount * discount) / 100;

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.new_Price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_Price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
      <div id="middle-section" className="down">
        <div className="qr-code">
          <p className="p">Scan QR code to get promo code</p>
          <img className="qr-code-img" src={qr} alt="QR Code" />
        </div>
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Discount</p>
                <p>{discount > 0 ? `-${discount}%` : "$0.00"}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>${discountedTotal.toFixed(2)}</h3>
              </div>
            </div>

            <div className="cartitems-promocode">
              <p>If you have a promo code, enter it here</p>
              <div className="cartitems-promobox">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)} // Update promo code
                />
                <button
                  className="promobox-button"
                  onClick={handlePromoCodeSubmit}
                >
                  Submit
                </button>
              </div>
            </div>

            <button onClick={handleProceedCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
