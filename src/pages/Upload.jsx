import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, addDoc , updateDoc, arrayUnion, doc} from 'firebase/firestore';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



const AddItem = () => {
  const { currentUser, userData } = useAuth();
  const [newItemName, setItemName] = useState("")
  const [newItemPrice, setItemPrice] = useState(0)
  const [isItemAvailable, setIsItemAvailable] = useState(false)
  const navigate = useNavigate(); 
  const [newItemDescription, setItemDescription] = useState("")




  // const [selectedFile, setSelectedFile] = useState(null);
  // const [filePreview, setFilePreview] = useState(null);

  // // Handles file selection
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);

  //   // Optional: create a file preview for images
  //   if (file && file.type.startsWith('image')) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFilePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // // Handles form submission
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
    
  //   if (!selectedFile) {
  //     alert("Please select a file before uploading.");
  //     return;
  //   }

  //   // Create form data to send to server
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   // Send request to backend
  //   try {
  //     const response = await fetch('/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       alert('File uploaded successfully');
  //     } else {
  //       alert('File upload failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during file upload', error);
  //     alert('Error uploading file');
  //   }
  // };
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const itemsCollectionRef = collection(db, "items");
  const onSubmitItem = async () => {
    try {
      const newItemRef = await addDoc(itemsCollectionRef, {
        name: newItemName,
        price: newItemPrice,
        isAvailable: isItemAvailable,
        description: newItemDescription,
        seller: currentUser.uid,
        timestamp: new Date(),
      });

      const userDocRef = doc(db, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        items: arrayUnion(newItemRef.id), 
      });


    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    // <div>
    //   {/* <h2>File Upload</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" onChange={handleFileChange} />
    //     {filePreview && (
    //       <div>
    //         <p>File Preview:</p>
    //         <img src={filePreview} alt="File Preview" width="100" />
    //       </div>
    //     )}
    //     <button type="submit">Upload</button>
    //   </form> */}



    //   <input 
    //     placeholder="Item Name..." 
    //     onChange={(e) => setItemName(e.target.value)}
    //   />
    //   <input 
    //     placeholder="List Price..." 
    //     type="number"
    //     onChange={(e) => setItemPrice(Number(e.target.value))}
    //   />
    //   <input 
    //     placeholder="Description of Item..." 
    //     onChange={(e) => setItemName(e.target.value)}
    //   />
    //   <input type="checkbox" 
    //     checked={isItemAvailable}
    //     onChange={(e) => setIsItemAvailable(e.target.checked)}
    //   />
    //   <label>Available</label>
    //   <input type="image" />
    //   <button>Upload Image</button>
    //   <button onClick={onSubmitItem}>Add Item</button>

    // </div>

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
        <div>
          <input 
            type="checkbox" 
            checked={isItemAvailable}
            onChange={(e) => setIsItemAvailable(e.target.checked)}
          />
          <label>Available</label>
        </div>
        <button onClick={onSubmitItem}>Add Item</button>
      </div>
    </div>
  );
};

export default AddItem