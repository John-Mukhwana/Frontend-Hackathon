import  from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventList from './components/Home/EventList';
import EventDetail from './components/Home/EventDetails'; 
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EventList />,
  },
  {
    path: "/events/:id",
    element: <EventDetail />, // Use EventDetail here instead of EventDetails
  },
]);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
