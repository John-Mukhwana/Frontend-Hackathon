import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-detail p-4">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="text-lg mb-4">
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> KSH {event.price}</p>
        <p><strong>Date:</strong> {event.date}</p>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        RSVP
      </button>
    </div>
  );
};

export default EventDetail;
