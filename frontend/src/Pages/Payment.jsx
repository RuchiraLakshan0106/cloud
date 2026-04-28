import React, { useState } from "react";
import "./CSS/Payment.css";

const Payment = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to toggle payment form
  const [addressData, setAddressData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Address Submitted:", addressData);
    alert("Address Details Saved!");
    setShowPaymentForm(true); // Show payment form after successful address submission
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details Submitted:", formData);
    alert("Payment Successful!");
    // Proceed with order confirmation logic
  };

  return (
    <div className="payment-form-container">
      {!showPaymentForm ? (
        <>
          <h2 className="address-form-title">Delivery Address</h2>
          <form className="address-form" onSubmit={handleAddressSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Full Name"
                value={addressData.fullName}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter Address"
                value={addressData.address}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                value={addressData.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter State"
                value={addressData.state}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Enter Postal Code"
                value={addressData.postalCode}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={addressData.country}
                onChange={handleAddressChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Save Address
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="payment-form-title">Payment Method</h2>
          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                placeholder="Enter Cardholder Name"
                value={formData.cardholderName}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter Card Number"
                value={formData.cardNumber}
                onChange={handlePaymentChange}
                maxLength="16"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                placeholder="Enter CVV"
                maxLength="4"
                value={formData.cvv}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit Payment
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Payment;
