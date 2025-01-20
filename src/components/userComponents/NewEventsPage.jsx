import  { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './eventCard';
import Spinner from '../shared/Spinner';
import { toast } from 'react-toastify';

const NewEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ...existing code...
const fetchNewEvents = async () => {
  setLoading(true);
  try {
    const response = await axios.get('http://localhost:5000/events');
    const allEvents = response.data;

    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= oneWeekFromNow;
    });

    setEvents(upcomingEvents);

    if (upcomingEvents.length === 0) {
      toast.info('No new arrivals in the next week.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    toast.error(`Error fetching new arrivals: ${error.message}`, {
      position: 'top-right',
      autoClose: 3000,
    });
  } finally {
    setLoading(false);
  }
};
// ...existing code...
  useEffect(() => {
    fetchNewEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 mt-32">New Arrivals</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewEventsPage;