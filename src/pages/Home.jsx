import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import Item from '../Item';
import DetailedItem from '../DetailedItem'; 
import backgroundImage from '../assets/old-cabell.jpg';
import '../css/Home.css';
import ProfileModal from './ProfileModal';
import ViewItems from './ViewItems';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate(); 
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    if (position > 300) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleUpload = async () => {
    try {
      navigate('/upload');
    } catch (error) {
      console.error('Failed to render:', error);
    }
  };

  const navigateCart = async () => {
    try {
      navigate('/cart');
    } catch (error) {
      console.error('Failed to navigate to shopping cart:', error);
    }
  };

  // const items = [
  //   {
  //     id: 1,
  //     image: 'path_to_image1.jpg',
  //     title: 'Vintage Jacket',
  //     description: 'A cool vintage jacket in excellent condition.',
  //     price: 50,
  //   },
  //   {
  //     id: 2,
  //     image: 'path_to_image2.jpg',
  //     title: 'Retro Sneakers',
  //     description: 'Classic sneakers for all-day comfort.',
  //     price: 75,
  //   },
  // ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <header className="home-header">
        <h1>Welcome to the UVA Thrift Store</h1>
      </header>

      <div>
        <button onClick={handleUpload}>Add Item</button>
        <button onClick={() => setShowProfile(true)}>Profile</button> 
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={navigateCart}>Shopping Cart</button>
        <ViewItems />
      </div>

      {/* {selectedItem ? (
        <DetailedItem item={selectedItem} />
      ) : (
        items.map((item) => (
          <Item key={item.id} {...item} onClick={() => handleSelectItem(item)} />
        ))
      )} */}

      <ProfileModal showProfile={showProfile} handleClose={() => setShowProfile(false)} />
    </div>
  );
};

export default Home;
