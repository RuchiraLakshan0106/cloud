import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Item from '../Item/Item'
import { API_BASE_URL } from "../../config/api";

const NewCollection = () => {

    const [new_collection,setNew_collection] = useState([]);

    useEffect(()=>{
        fetch(`${API_BASE_URL}/products/newcollection`)
        .then((response)=>response.json())
        .then((data)=>setNew_collection(data));
    },[])

  return (
    <div className='collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className='collections-Item'>
        {new_collection.map((item,i)=>{
            return <Item 
            key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_Price}
              old_price={item.old_Price}
            />
        })}
      </div>
    </div>
  )
}

export default NewCollection
