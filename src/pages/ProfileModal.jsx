import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; 
import { getDocs, collection } from 'firebase/firestore';
import '../css/profile.scss'; 
import CloseIcon from '@mui/icons-material/Close';

const ProfileModal = ({ showProfile, handleClose }) => {
  const [open, setOpen] = useState(showProfile);
  const { currentUser, userData } = useAuth();
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    setOpen(showProfile);
  }, [showProfile]);

  useEffect(() => {
    if (currentUser) {
      const fetchUserItems = async () => {
        try {
          const itemsCollectionRef = collection(db, 'items');
          const data = await getDocs(itemsCollectionRef);

          const filteredItems = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((item) => item.seller === currentUser.uid);

          setUserItems(filteredItems);
        } catch (err) {
          console.error('Error fetching user items:', err);
        }
      };

      fetchUserItems();
    }
  }, [currentUser]);

  if (!currentUser || !userData) {
    return null;
  }

  const calculateJoinedDuration = (createdAt) => {
    const now = new Date();
    const joinedDate = createdAt.toDate();

    const yearsDiff = now.getFullYear() - joinedDate.getFullYear();
    const monthsDiff = now.getMonth() - joinedDate.getMonth();
    const daysDiff = now.getDate() - joinedDate.getDate();

    if (yearsDiff > 1) {
      return `${yearsDiff} years ${Math.abs(monthsDiff)} months`;
    } else if (yearsDiff === 1) {
      return `1 year ${Math.abs(monthsDiff)} months`;
    } else if (monthsDiff > 1) {
      return `${monthsDiff} months ${Math.abs(daysDiff)} days`;
    } else if (monthsDiff === 1) {
      return `1 month ${Math.abs(daysDiff)} days`;
    } else if (daysDiff > 1) {
      return `${Math.abs(daysDiff)} days`;
    } else if (daysDiff === 0) {
      return `Today`;
    } else {
      return `${Math.abs(daysDiff)} days`;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <div className="modal-box">
        <div className ="modal-header">
            <div className = "modal-header-text">
        <div id="profile-modal-title" className="modal-title">
          Hoo-rah-ray, ray, ray! 
        </div>
        <div className="modal-name">
        {userData.displayName}
        </div>
        <Typography className="modal-description">
          Email: {userData.email}
        </Typography>
        </div>

        <div className="modal-description-wrapper">
            <div className="modal-description">           
                Joined 
            </div>
            <div className="modal-data">
            {calculateJoinedDuration(userData.createdAt)}
            </div>
        </div>

        <div className="modal-description-wrapper">
            <div className="modal-description">
                Rehomed
            </div>
            <div className="modal-data">
                5
            </div>
            <div className="modal-description">
                treasures
            </div>
        </div>

        <div className="modal-description-wrapper">
            <div className="modal-description">
                Revived 
            </div>
            <div className="modal-data">
                3
            </div>
            <div className="modal-description">
            past pieces
            </div>
        </div>
        <Button className="close-button" onClick={handleClose}>
        <CloseIcon/>
        </Button>
        </div>

        <div className="items-wrapper">
        <Typography className="listed-items-title">
          Your Listed Items:
        </Typography>
        <div className="items-container">
        
        {userItems.length > 0 ? (
            userItems.map((item) => (
                
              <div key={item.id} className="itemBox">
                <div className="textContainer">
                  <h1 className="itemTitle">{item.name}</h1>
                  <p className="itemPrice">Price: ${item.price}</p>
                </div>
                {item.imageURL ? (
                <div className="imageContainer">
                  <img src={item.imageURL} alt={item.name} className="itemImage" />
                </div>
              ) : (
                <p>No image available</p>
              )}
              </div>
             
            ))
          
          ) : (
            <Typography>No items listed yet.</Typography>
          )}
        </div>
        </div>


      </div>
    </Modal>
  );
};

export default ProfileModal;
