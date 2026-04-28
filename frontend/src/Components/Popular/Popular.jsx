import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Item } from "../Item/Item";
import { API_BASE_URL } from "../../config/api";

export const Popular = () => {

  const [popularProducts,setpopularProducts] = useState([]);

  useEffect(()=>{
    fetch(`${API_BASE_URL}/products/popularinwoman`)
    .then((response)=>response.json())
    .then((data)=>setpopularProducts(data));
  },[])

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_Price}
              old_price={item.old_Price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
