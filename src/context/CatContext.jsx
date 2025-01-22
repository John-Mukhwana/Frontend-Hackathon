// filepath: /D:/Project 2025/Frontend-Hackathon/src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (event) => {
    setCartItems((prevItems) => [...prevItems, event]);
    console.log(`${event.title} added to cart!`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};