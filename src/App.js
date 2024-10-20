import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailedItem from "./pages/DetailedItem";

import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import AddItem from "./pages/Upload";
import ViewItems from "./pages/ViewItems";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<AddItem />} />
            <Route path="/items" element={<ViewItems />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/item/:itemId" element={<DetailedItem />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
