import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore';
import '../css/ItemDetail.scss';

const ItemDetails = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const itemDoc = await getDoc(doc(db, "items", id)); // Fetch the item by ID
        if (itemDoc.exists()) {
          setItemData(itemDoc.data());
        } else {
          console.log("No such item!");
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]); // Run effect when the ID changes

  if (loading) {
    return <p>Loading item details...</p>;
  }

  if (!itemData) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="item-details-container">
      <h1>{itemData.name}</h1>
      <p><strong>Price:</strong> ${itemData.price}</p>
      <p><strong>Description:</strong> {itemData.description}</p>
      <p><strong>Location Details:</strong> {itemData.location}</p>
      {itemData.imageURL ? (
        <img src={itemData.imageURL} alt={itemData.name} className="item-image" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ItemDetails;
