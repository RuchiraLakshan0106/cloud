import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breedcrum from "../Components/Breedcrums/Breedcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../Components/DescriptionBox/DescriptionBox";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productID } = useParams();
  const product = all_product.find((e) => e.id === Number(productID));
  if (!product) {
    return null;
  }
  return (
    <div>
      <Breedcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox description={product.description} />
      <RelatedProducts />
    </div>
  );
};
