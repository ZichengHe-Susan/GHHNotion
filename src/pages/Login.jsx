import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Import auth from firebase.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);

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
        console.log('Firebase API Key:', process.env.REACT_APP_FIREBASE_API_KEY);

      await createUserWithEmailAndPassword(auth, email, password);
      setError('Registration successful');
      // Optionally, you can automatically log the user in or redirect after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>

      {/* Toggle between Login and Register */}
      <p>
        {isRegistering ? 
          'Already have an account?' : 
          "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
