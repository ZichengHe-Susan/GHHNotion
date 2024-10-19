import React from 'react';

function DetailedItem({ item }) {
  if (!item) {
    return <div>Loading...</div>; // Render a loading or placeholder component if no item is provided
  }

  return (
    <div className="detailed-item">
      <img src={item.image} alt={item.title} className="detailed-item-image" />
      <div className="item-info">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p className="price">${item.price}</p>
        <button className="buy-button">Buy Now</button>
        {/* Additional information like sizes or colors could go here */}
      </div>
    </div>
  );
}

export default DetailedItem;
