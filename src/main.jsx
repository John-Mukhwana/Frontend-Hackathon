// filepath: /D:/Project 2025/Frontend-Hackathon/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SupabaseProvider } from './context/SupabaseContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CatContext'; // Import CartProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <UserProvider>
        <CartProvider> {/* Wrap with CartProvider */}
          <App />
        </CartProvider>
      </UserProvider>
    </SupabaseProvider>
  </React.StrictMode>
);