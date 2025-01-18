import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        const uniqueCategories = ['All', ...new Set(data.map((event) => event.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === category));
    }
  };

  return (
    <div className="event-list bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen p-8">
      {/* Styled Heading */}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center border-b-4 border-blue-500 pb-2">
        🌟 Upcoming Events 🌟
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 mx-2 rounded-md border ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800 hover:bg-blue-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="card p-4 bg-gray-700 text-gray-100 shadow-md hover:shadow-lg rounded-lg transition-shadow duration-200"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-bold mt-2">{event.title}</h3>
            <p className="text-sm text-gray-400">{event.category}</p>
            <p className="text-sm text-gray-300">{event.location}</p>
            <p className="font-semibold text-lg mt-2">KSH {event.price}</p>
            <Link
              to={`/events/${event.id}`}
              className="text-blue-400 mt-4 block text-center hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
