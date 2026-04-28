import React from "react";
import { useNavigate } from "react-router-dom";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

export const Offers = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cart#middle-section"); // Navigate to CartItems and target the middle section
  };

  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button onClick={handleNavigate}>Check now</button>
      </div>
      <div className="offers-right">
        <img className="bg-img" src={exclusive_image} alt="" />
      </div>
    </div>
  );
};
