import React from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const EventDetail = ({ event }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
    // Retrieve user from localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

  const handleRSVP = () => {
    // Implement RSVP functionality here
    toast.success(`RSVPed to ${event.title}!`, {
      position: 'top-right',
      autoClose: 3000,
    });
    console.log(`RSVPed to event: ${event.title}`);
  };

  const handleBook = async () => {
    if (!user || !user.id) {
      toast.error('Please log in to book an event.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.log('User not logged in.');
      return;
    }

    console.log('Initiating payment for event:', event.id);

    try {
      const response = await fetch('https://backend-hackathon-0dnz.onrender.com/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: event.price * 100, // Amount in cents
          currency: 'KES',
          userId: user.id, // Ensure you're sending userId
        }),
      });

      console.log('Received response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        toast.error('Failed to create checkout session. Please try again.');
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      console.log('Checkout session data:', data);

      if (data.url) {
        console.log('Redirecting to:', data.url);
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('No URL found in response:', data);
        toast.error('No checkout URL received. Please try again.');
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      toast.error('Unable to initiate checkout. Please try again.');
    }
  };

  const handleAddToCart = () => {
    addToCart(event);
    toast.success(`${event.title} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
    });
    console.log(`Added to cart: ${event.title}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-1">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Description:</strong> {event.description}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Price:</strong> KSH {event.price}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleRSVP}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            RSVP
          </button>
          <button
            onClick={handleBook}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Book
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;