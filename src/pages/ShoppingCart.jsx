import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShoppingCart.css';
import defaultImage from '../assets/coming-soon.jpg';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; 
import { getDocs, collection, updateDoc, arrayRemove,doc, getDoc,addDoc} from 'firebase/firestore';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    const [cart, setCart] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (!currentUser) {
          navigate('/login');
        }
      }, [currentUser, navigate]);
    
    useEffect(() => {
        if (currentUser) {
            getCart();
        }
    }, [currentUser]); 

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
                const totalP = filteredCartData.reduce((acc, item) => acc + item.price, 0);
                setTotalPrice(totalP);
            } else {
                console.error("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching cart data: ", error);
        }
    };
    
    

    const removeItem = async (itemId) => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                items: arrayRemove(itemId),
            });
            
            getCart();  
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
    const handleCheckout = async () => {
        try {
            if(cart.length === 0) {
                alert('No items in cart');
                return;
            }
            const curDate = new Date();
            const orderNumber = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                items: [],
            });
            const orderDocRef = collection(db, 'orders');
            await addDoc(orderDocRef, {
                orderNumber: orderNumber,
                buyer: currentUser.uid,
                items: cart,
                totalPrice: totalPrice,
                timestamp: curDate,
                status: 'pending',
            });
    
            for(let i = 0; i < cart.length; i++) {
                const itemDocRef = doc(db, 'items', cart[i].id);
                await updateDoc(itemDocRef, {
                    isAvailable: false,
                    buyer: currentUser.uid,
                    soldOn: curDate,
                });
            }
    
            navigate('/checkedOut', {
                state: {
                    orderNumber: orderNumber,
                    items: cart,
                    totalPrice: totalPrice,
                    timestamp: curDate,
                    status: 'pending'
                }
            });
        } catch (error) {
            console.error('Error during checkout:', error);
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
                <button className="checkout-button" onClick ={handleCheckout}>Checkout</button>
                </div>
        </div>
        <div className="cart-summary">
            
        </div>
        </div>
    );
}

export default ShoppingCart;

