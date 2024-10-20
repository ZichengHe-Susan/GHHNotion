import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { getDocs, collection, addDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import '../css/Upload.scss';

const AddItem = () => {
  const { currentUser, userData } = useAuth();
  const [newItemName, setItemName] = useState("");
  const [newItemPrice, setItemPrice] = useState("");
  const [isItemAvailable, setIsItemAvailable] = useState(true);
  const [newItemDescription, setItemDescription] = useState("");
  const [newLocationDet, setLocationDet] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form is submitted
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const itemsCollectionRef = collection(db, "items");
  const onSubmitItem = async (imageURL) => {
    try {
      await addDoc(itemsCollectionRef, {
        name: newItemName,
        price: newItemPrice,
        isAvailable: isItemAvailable,
        description: newItemDescription,
        seller: currentUser.uid,
        timestamp: new Date(),
        imageURL: imageURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async () => {
    setIsSubmitted(true); // Set the form as submitted when clicking "Add Item"

    // Validate form fields
    if (!newItemName || !newItemPrice || !newItemDescription || !newLocationDet || !itemImage) {
      alert("Please fill in all the fields.");
      return;
    }

    const imageRef = ref(storage, `${currentUser.uid}/${itemImage.name + v4()}`);
    try {
      await uploadBytes(imageRef, itemImage);
      const imageURL = await getDownloadURL(imageRef);
      await onSubmitItem(imageURL);

      // Reset form fields
      setItemImage(null);
      setItemName('');
      setItemPrice('');
      setItemDescription('');
      setLocationDet('');

      // Optionally navigate back to homepage
      navigate('/'); // Redirect to homepage after submission
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div id="add-item-page">
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
      </nav>

      <div className="add-item-container">
      <h2 style={{ color: 'white' }}>Item Details</h2>

        <div className="form-container">
          {/* Name Input */}
          <input
            placeholder="Item Name..."
            onChange={(e) => setItemName(e.target.value)}
            value={newItemName}
            className={isSubmitted && !newItemName ? 'invalid' : ''}
            required
          />

          {/* Price Input */}
          <input
            placeholder="$0"
            type="number"
            onChange={(e) => setItemPrice(Number(e.target.value))}
            value={newItemPrice}
            className={isSubmitted && !newItemPrice ? 'invalid' : ''}
            required
          />

          {/* Description Input */}
          <textarea
            className={`description-textarea ${isSubmitted && !newItemDescription ? 'invalid' : ''}`}
            placeholder="Description of Item..."
            onChange={(e) => setItemDescription(e.target.value)}
            value={newItemDescription}
            required
          />

          {/* Location Input */}
          <input
            placeholder="Pickup or Dropoff Details..."
            onChange={(e) => setLocationDet(e.target.value)}
            value={newLocationDet}
            className={isSubmitted && !newLocationDet ? 'invalid' : ''}
            required
          />

          {/* File Input */}
          <input
            type="file"
            onChange={(e) => setItemImage(e.target.files[0])}
            className={isSubmitted && !itemImage ? 'invalid' : ''}
            required
          />

          {/* Submit Button */}
          <button onClick={uploadImage}>Add Item</button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
