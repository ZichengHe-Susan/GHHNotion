import React, { createContext, useState, useContext } from 'react';
import lawn from '../assets/lawn.jpg';
import login from '../assets/login.jpg';
import old from '../assets/old-cabell.jpg';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const initialCartItems = [
    // { id: 1, title: 'Vintage Jacket', price: 65, quantity: 1, image: lawn },
    // { id: 2, title: 'Leather Boots', price: 80, quantity: 1, image: login },
    // { id: 3, title: 'Antique Watch', price: 120, quantity: 1, image: old }
];

const [cartItems, setCartItems] = useState(initialCartItems);

  const addToCart = (item) => {
    setCartItems(currentItems => [...currentItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
