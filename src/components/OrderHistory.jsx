import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase'; 
import { getDocs, collection } from 'firebase/firestore';
import '../css/profile.scss'; 

const OrderHistory = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const fetchOrders = async () => {
                try {
                    const ordersCollectionRef = collection(db, 'orders');
                    const data = await getDocs(ordersCollectionRef);

                    const filteredOrders = data.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }))
                        .filter((order) => order.buyer === currentUser.uid);

                    setOrders(filteredOrders);
                } catch (err) {
                    console.error('Error fetching user orders:', err);
                }
            };

            fetchOrders();
        }
    }, [currentUser]);

    return (
        <div className="order-history">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="order">
                        <Typography variant="h6" gutterBottom className="order-id">
                            Order ID: {order.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom className="order-total">
                            Total: ${order.totalPrice}
                        </Typography>
                        <Typography variant="body1" gutterBottom className="order-status">
                            Status: {order.status}
                        </Typography>
                    </div>
                ))
            ) : (
                <Typography variant="body1" gutterBottom>
                    You have not placed any orders yet.
                </Typography>
            )}
        </div>
    );
};

export default OrderHistory;
