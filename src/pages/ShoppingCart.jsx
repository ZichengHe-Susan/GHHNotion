import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../css/ShoppingCart.css';
import defaultImage from '../assets/coming-soon.jpg';

const ShoppingCart = () => {

    const { cartItems, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
        <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <ul className="cart-items">
                    {cartItems.map((item, index) => (
                        <li key={item.id} className="cart-item">
                            <div className="item-info">
                                <img src={item.imageURL || defaultImage} alt={item.name} className='item-image' />
                                <span className="item-title">{item.name}</span>
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
        <div className="cart-summary">
            <h2>Summary</h2>
                <div className="summary-details">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <button className="checkout-button">Checkout</button>
        </div>
        </>
    );
}

export default ShoppingCart;

