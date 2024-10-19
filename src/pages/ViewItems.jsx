import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { getDocs, collection } from 'firebase/firestore';

import '../css/ViewItems.css';

const ViewItems = () => {
  const [itemsList, setItemsList] = useState([]);

  const [cart, setCart] = useState([]); // State to track the shopping cart

  const itemsCollectionRef = collection(db, "items");

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const data = await getDocs(itemsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItemsList(filteredData);
      } catch (err) {
        console.error("Error fetching items: ", err);
      }
    };

    // Call the async function
    getItemsList();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const addToCart = (item) => {
    setCart([...cart, item]); // Adds the selected item to the cart state
    alert(`${item.name} has been added to your cart!`);
  };

  return (
    <div className="container">
      {itemsList.map((item) => (
        <div key={item.id} className="itemBox">
          <div className="textContainer">
            <h1 className="itemTitle">{item.name}</h1>
            <p className="itemPrice">Price: ${item.price}</p>
          </div>
          <button className="addToCartButton" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewItems;