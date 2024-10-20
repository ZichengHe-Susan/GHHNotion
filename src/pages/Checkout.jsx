import React from 'react';
import { useNavigate } from 'react-router-dom';

const generateOrderNumber = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const Checkout = () => {
    const navigate = useNavigate();
    const orderNumber = generateOrderNumber();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Thank you for your payment!</h1>
            <p>Order Number: {orderNumber}</p>
            <p>Status: Waiting for seller to confirm</p>
            <button onClick={handleGoBack}>Go back to homepage</button>
        </div>
    );
};

export default Checkout;