import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; 
import { getDocs, collection } from 'firebase/firestore';
import ListedItems from '../components/ListedItems'; // Import the refactored ListedItems component
import OrderHistory from '../components/OrderHistory';
import EditProfile from '../components/EditProfile';
import '../css/profile.scss'; 
import CloseIcon from '@mui/icons-material/Close';

const ProfileModal = ({ showProfile, handleClose }) => {
  const [open, setOpen] = useState(showProfile);
  const { currentUser, userData } = useAuth();
  const [userItems, setUserItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // State to track active tab
  const [itemBought, setItemBought] = useState(0);
  const [itemSold, setItemSold] = useState(0);

  useEffect(() => {
    setOpen(showProfile);
  }, [showProfile]);

  useEffect(() => {
    if (currentUser) {
      const fetchUserItems = async () => {
        try {
          const itemsCollectionRef = collection(db, 'items');
          const data = await getDocs(itemsCollectionRef);
  
          const filteredItems = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
          let boughtCount = 0;
          let soldCount = 0;
  
          filteredItems.forEach((item) => {
            if (item.buyer === currentUser.uid) {
              boughtCount += 1;
            }
            if (item.seller === currentUser.uid && item.buyer) {
              soldCount += 1;
            }
          });
  
          setItemBought(boughtCount);  // Set the number of items bought
          setItemSold(soldCount);  // Set the number of items sold
          
          const userListedItems = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((item) => item.seller === currentUser.uid);

          setUserItems(userListedItems); 
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        <div className="modal-header">
          <div className="modal-header-text">
            <div id="profile-modal-title" className="modal-title">
              Hoo-rah-ray, ray, ray!
            </div>
            <div className="modal-name">{userData.displayName}</div>
            <Typography className="modal-description">
              Email: {userData.email}
            </Typography>
          </div>

          <div className="modal-description-wrapper">
            <div className="modal-description">Joined</div>
            <div className="modal-data">{calculateJoinedDuration(userData.createdAt)}</div>
            
          </div>
          <div className="modal-description-wrapper">
            <div className="modal-description">
                Rehomed
            </div>
            <div className="modal-data">
                {itemSold}
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
                {itemBought}
            </div>
            <div className="modal-description">
            past pieces
            </div>
        </div>

          <Button className="close-button" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="tabs-container">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Listed Items" />
          <Tab label="Order History" />
          <Tab label="Edit Profile" />
        </Tabs>
      </Box>


        {/* Render the content based on the selected tab */}
        <div className="tab-content">
          {activeTab === 0 && <ListedItems userItems={userItems} />}
          {activeTab === 1 && <OrderHistory />}
          {activeTab === 2 && <EditProfile />}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
