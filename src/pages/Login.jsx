import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import '../css/login.scss'; 
import { Typography, Button, TextField, Grid, Link, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Home from './Home';
import Item from '../Item';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('Login successful');
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName, 
      role: 'user', 
      createdAt: new Date(), 
      items: [],
    });
      setError('Registration successful');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
      </div>

      <div className="login-form">
        <Typography variant="h2" className="welcome-text">
          Welcome to UVA Thrift Store
        </Typography>
        <h2 className="slogan">
          {isRegistering
            ? 'Join the UVA Thrift Community – Reduce, Reuse, and Reimagine'
            : 'Discover Unique Finds & Reduce Waste by Thrifting'}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="form-group">
          {isRegistering && (
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Enter Your Display Name'
                required
              /> 
            </div>
              )
            }
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your Email'
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Your Password'
              required
            />
          </div>


          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <button type="submit" className="login-button">
              {isRegistering ? 'Register' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}
            <button
              className="toggle-button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
