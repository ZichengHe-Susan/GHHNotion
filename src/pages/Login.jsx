import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import auth from firebase.js
import '../css/login.scss'; // Import SCSS file for styling
import {Typography, Button, TextField, Grid, Link, Box, Container} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('Login successful');
      // Redirect or show success message after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('Registration successful');
      // Optionally, you can automatically log the user in or redirect after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left side with image */}
      <div className="login-image">
        {/* Placeholder for a custom image */}
      </div>

      {/* Right side with form */}
      <div className="login-form">
        <Typography variant="h2" className = "welcome-text">
          Welcome to UVA Thrift Store
        </Typography>
        <h2 className="slogan">{isRegistering ? 'Join the UVA Thrift Community – Reduce, Reuse, and Reimagine' : 'Discover Unique Finds & Reduce Waste by Thrifting'}</h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
