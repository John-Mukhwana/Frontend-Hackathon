// filepath: /D:/Project 2025/Frontend-Hackathon/src/components/userComponents/cart/cart.jsx

import React from 'react';
import { useCart } from '../../../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleOrderNow = () => {
    // Wait for some time before proceeding to payment
    setTimeout(() => {
      navigate('/UserDashboard/Payment');
    }, 3000);
    toast.info('Proceeding to Payment. Thank you for your order!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="py-14 px-4 md:px-8 lg:px-16">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.eventId} className="flex items-center bg-white rounded-lg shadow-md p-4">
                <img src={item.eventImage} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700">Price: KSH {item.price.toLocaleString()}</p>
                  <p
                    className={`font-semibold ${
                      item.availability
                        ? item.availability.toLowerCase() === 'available'
                          ? 'text-green-500'
                          : item.availability.toLowerCase() === 'sold'
                          ? 'text-red-500'
                          : 'text-yellow-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.availability || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.eventId)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-bold">Total: KSH {totalPrice.toLocaleString()}</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleOrderNow}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Order Now
              </button>
              <button
                onClick={() => {
                  clearCart();
                }}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;