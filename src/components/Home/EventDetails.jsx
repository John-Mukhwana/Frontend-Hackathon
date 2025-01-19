const EventDetail = ({ event }) => {
  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="event-detail">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg my-4"
      />
      <div className="text-lg mb-4">
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> KSH {event.price}</p>
        <p><strong>Date:</strong> {event.date}</p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          RSVP
        </button>
        <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Book
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
