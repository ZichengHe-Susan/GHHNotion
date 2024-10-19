import React from 'react';

function Item({ image, title, description, price }) {
  return (
    <div className="item">
      <img src={image} alt={title} className="item-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
      <button className="view-button">View Item</button>
    </div>
  );
}

export default Item;

