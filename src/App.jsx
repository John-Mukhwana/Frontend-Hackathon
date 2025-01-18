
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import EventList from "./components/Home/EventDetails";
import EventDetail from "./components/Home/EventDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />
    },
    {
      path: "/event",
      element: <EventList />,
    },
    {
      path: "/events/:id",
      element: <EventDetail />, // Use EventDetail here instead of EventDetails
    },
  ])

  return (
     <RouterProvider router={router} />
  )
}

export default App;
