import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { getDocs, collection, addDoc , updateDoc, arrayUnion, doc} from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';


const AddItem = () => {
  const { currentUser, userData } = useAuth();
  const [newItemName, setItemName] = useState("")
  const [newItemPrice, setItemPrice] = useState(0)
  const [isItemAvailable, setIsItemAvailable] = useState(true)
  const [newItemDescription, setItemDescription] = useState("")
  const [newLocationDet, setLocationDet] = useState("")
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

      // const userDocRef = doc(db, "users", currentUser.uid);

      // await updateDoc(userDocRef, {
      //   items: arrayUnion(newItemRef.id), 
      // });


    } catch (err) {
      console.error(err);
    }
    
  };

  const [itemImage, setItemImage] = useState(null);
  const uploadImage = async () => {
    if (itemImage == null) return;

    const imageRef = ref(storage, `${currentUser.uid}/${itemImage.name + v4()}`);

    await uploadBytes(imageRef, itemImage);
    const imageURL = await getDownloadURL(imageRef);
    onSubmitItem(imageURL);
    alert("Image uploaded!");
  };

  return (

    <div className="add-item-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
      </nav>

      {/* Form to Add Item */}
      <div className="form-container">
        <input 
          placeholder="Item Name..." 
          onChange={(e) => setItemName(e.target.value)}
        />
        <input 
          placeholder="List Price..." 
          type="number"
          onChange={(e) => setItemPrice(Number(e.target.value))}
        />
        <input 
          placeholder="Description of Item..." 
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input 
          placeholder="Pickup or Dropoff Details..." 
          onChange={(e) => setLocationDet(e.target.value)}
        />
        <div>
          {/* <input 
            type="checkbox" 
            checked={isItemAvailable}
            onChange={(e) => setIsItemAvailable(e.target.checked)}
          />
          <label>Available</label> */}
          <input 
            type="file"
            onChange={(e) => {setItemImage(e.target.files[0])}}
          />
        </div>
        {/* <button onClick={uploadImage}>Upload Image</button> */}
        <button onClick={uploadImage}>Add Item</button>
      </div>
    </div>
  );
};

export default AddItem