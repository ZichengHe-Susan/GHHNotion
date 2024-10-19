import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../css/ShoppingCart.css';

const ShoppingCart = () => {

    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <ul className="cart-items">
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="item-info">
                                <img src={item.image} alt={item.title} className='item-image' />
                                <span className="item-title">{item.title}</span>
                                <span className="item-price">${item.price}</span>
                            </div>
                            <div className="item-actions">
                                <button className="item-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;

