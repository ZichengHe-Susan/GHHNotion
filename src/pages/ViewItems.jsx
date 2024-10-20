import React, { useEffect, useState } from 'react';
import { db,storage } from '../firebase'; 
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ref, deleteObject } from 'firebase/storage';


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

  const { currentUser, userData } = useAuth();

  const deleteItem = async (itemId, imageURL) => {
    const itemDocRef = doc(db, "items", itemId);
  
    // Create a reference to the file to delete
    const imageRef = ref(storage, imageURL);
  
    try {
      // Delete the image from storage
      if (imageURL) {
        const imageRef = ref(storage, imageURL);
        await deleteObject(imageRef);
        console.log("Image deleted successfully");
      }
  
      // Delete the item from Firestore
      await deleteDoc(itemDocRef);
      setItemsList(itemsList.filter(item => item.id !== itemId)); // Remove the item from the local state
      alert("Item deleted successfully.");
    } catch (err) {
      console.error("Error deleting item: ", err);
    }
  };

  return (
    <div className="container">
      {itemsList.map((item) => (
        <div key={item.id} className="itemBox">
          <div className="textContainer">
            <h1 className="itemTitle">{item.name}</h1>
            <p className="itemPrice">Price: ${item.price}</p>
            <div className="button-group">
            <button
              className="addToCartButton" 
              onClick={() => addToCart(item)} 
            >Add to Cart</button>
            {currentUser && currentUser.uid === item.seller && ( 
            <button className="deleteButton" onClick={() => deleteItem(item.id, item.imageURL || null)}>
              Delete Item
            </button>
          )}
          </div>
          </div>
          {item.imageURL ? (
            <div className="imageContainer">
              <img src={item.imageURL} alt={item.name} className="itemImage" />
            </div>
          ) : (
            <p>No image available</p>
          )}
          {/* <button className="addToCartButton" onClick={() => addToCart(item)}>
            Add to Cart
          </button> */}
          
        </div>
      ))}
    </div>
  );
};

export default ViewItems;