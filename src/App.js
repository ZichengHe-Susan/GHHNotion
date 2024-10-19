import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext'; 
import AddItem from './pages/Upload';
import ViewItems from './pages/ViewItems';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<AddItem />} />
          <Route path="/items" element={<ViewItems />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
