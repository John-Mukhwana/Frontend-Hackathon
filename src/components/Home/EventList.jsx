import { useState, useEffect } from 'react';
import EventDetail from './EventDetails'; 

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:5000/events')
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

  const openModal = (event) => {
    setSelectedEvent(event); 
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
    setSelectedEvent(null); 
  };

  return (
    <div className="event-list bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center border-b-4 border-blue-500 pb-2">
        🌟 Upcoming Events 🌟
      </h2>

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
            <button
              onClick={() => openModal(event)} 
              className="text-blue-400 mt-4 block text-center hover:underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-4/5 max-w-lg p-6 shadow-lg relative">
            <button
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <EventDetail event={selectedEvent} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
