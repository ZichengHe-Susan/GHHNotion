import React from 'react';
import { Typography } from '@mui/material';

const ListedItems = ({ userItems }) => {
  return (
    <div className="items-wrapper">
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
  );
};

export default ListedItems;
