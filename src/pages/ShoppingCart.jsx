import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShoppingCart.css';
import defaultImage from '../assets/coming-soon.jpg';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; 
import { getDocs, collection, updateDoc, arrayRemove,doc, getDoc} from 'firebase/firestore';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    const [cart, setCart] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [isCardUpdated, setIsCardUpdated] = useState(false);


    useEffect(() => {
        if (currentUser) {
            getCart();
            getPrice();
        }
    }, [currentUser, isCardUpdated]); 

    const getCart = async () => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);  
            const userDoc = await getDoc(userDocRef);  
    
            if (userDoc.exists()) {
                const userData = userDoc.data();  
    
                const itemsCollectionRef = collection(db, 'items');
                const cartData = await getDocs(itemsCollectionRef);
    
                const filteredCartData = cartData.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                    .filter((item) => userData.items.includes(item.id));
    
                setCart(filteredCartData);  
                getPrice();  
            } else {
                console.error("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching cart data: ", error);
        }
    };
    
    
    const getPrice = ()=>{
        const totalP = cart.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(totalP);
    }


    const removeItem = async (itemId) => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                items: arrayRemove(itemId),
            });
            
            getCart();  
            setIsCardUpdated(!isCardUpdated);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }
    

    const navigateHome = async () => {
        try {
            navigate('/');
        } catch (error) {
            console.error('Failed to navigate to homepage:', error);
        }
    }

    return (
        <div className="shopping-cart-wrapper">
        <div className="shopping-cart">
            <h1 className="shopping-cart-title">Shopping Cart</h1>
            <button className = "back-button"onClick={navigateHome}>Back to Homepage</button>
            {cart.length > 0 ? (
                <ul className="cart-items">
                    {cart.map((item, index) => (
                        <li key={item.id} className="cart-item">
                            <div className="item-info">
                                <img src={item.imageURL || defaultImage} alt={item.name} className='item-image' />
                                <span className="item-title">{item.name}</span>
                                <span className="item-price">${item.price}</span>
                            </div>
                            <div className="item-actions">
                                <button className="item-remove" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                </div>
            )}
            <div className="cart-sum">
            <h2>Summary</h2>
                <div className="summary-details">
                    <p>Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <button className="checkout-button">Checkout</button>
                </div>
        </div>
        <div className="cart-summary">
            
        </div>
        </div>
    );
}

export default ShoppingCart;

