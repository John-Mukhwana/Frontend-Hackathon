import React from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

const EventDetail = ({ event }) => {
  const { addToCart } = useCart();

  const handleRSVP = () => {
    // Implement RSVP functionality here
    toast.success(`Login RSVPed to ${event.title}!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleBook = () => {
    // Implement Book functionality here
    toast.success(` Login to Book ${event.title}!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleAddToCart = () => {
    toast.success(`Login to add ${event.title} to cart `, {
      position: 'top-right',
      autoClose: 3000,
    });
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
          <strong>Price:</strong> $ {event.price}
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