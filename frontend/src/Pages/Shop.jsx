import React from "react";
import { Hero } from "../Components/Hero/Hero";
import { Popular } from "../Components/Popular/Popular";
import { Offers } from "../Components/Offers/Offers";
import { NewsLetter } from "../Components/NewsLetter/NewsLetter";
import NewCollection from "../Components/NewCollection/NewCollection";

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollection/>
      <NewsLetter />
    </div>
  );
};
