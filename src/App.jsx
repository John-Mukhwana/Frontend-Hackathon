import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Home/Login";
import EventList from "./components/Home/EventList";
import SignUp from "./components/Home/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />
    },
    {
      path: "/Login",
      element: <LoginForm />
    },
    {
      path: "/SignUP",
      element: <SignUp />
    },
    {
      path: "/events", // Corrected path for the event list
      element: <EventList />, // EventList will handle the modal for event details
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
