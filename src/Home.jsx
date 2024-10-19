import React, { useState, useEffect } from 'react';
import Item from './Item';
import DetailedItem from './DetailedItem'; // Assume you've created this component
import backgroundImage from './assets/old-cabell.jpg';
import './Home.css';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    // You can adjust the threshold based on the layout and your requirements
    if (position > 300) { // This threshold can be adjusted
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

  const items = [
    {
      id: 1,
      image: 'path_to_image1.jpg',
      title: 'Vintage Jacket',
      description: 'A cool vintage jacket in excellent condition.',
      price: 50
    },
    {
      id: 2,
      image: 'path_to_image2.jpg',
      title: 'Retro Sneakers',
      description: 'Classic sneakers for all-day comfort.',
      price: 75
    },
    // Add more items here
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const style ={
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div >
      <header className="home-header">
        <h1>Welcome to the UVA Thrift Store</h1>
      </header>
      {selectedItem ? (
        <DetailedItem item={selectedItem} />
      ) : (
        items.map(item => (
          <Item key={item.id} {...item} onClick={() => handleSelectItem(item)} />
        ))
      )}
    </div>
  );
}
export default Home;

