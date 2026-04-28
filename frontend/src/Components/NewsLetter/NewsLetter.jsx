import React, { useState } from "react";
import "./NewsLetter.css";

export const NewsLetter = () => {
  const [submitted, setSubmitted] = useState(false); // State to track submission

  const handleSubmit = () => {
    setSubmitted(true); // Update state to true on button click
  };

  return (
    <div className="newsletter">
      {submitted ? (
        <h1>Thank you for subscribing!</h1> // Message after submission
      ) : (
        <>
          <h1>Get Exclusive Offers On Your Email</h1>
          <p>Subscribe to our newsletter and stay updated</p>
          <div>
            <input type="email" placeholder="Your Email id" />
            <button onClick={handleSubmit}>Subscribe</button>
          </div>
        </>
      )}
    </div>
    
  );
};
