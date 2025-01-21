import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Home/Login";
import EventList from "./components/userComponents/EventList";
import SignUp from "./components/Home/SignUp";
import UserLayout from "./components/Layout/userLayout";
import NewEventsPage from "./components/userComponents/NewEventsPage";
import BookingHistoryPage from "./components/userComponents/bookingHistoryPage";
import Cart from './components/userComponents/cart/cart'
import TicketPage from "./components/userComponents/ticketPage";
import UserProfile from "./components/userComponents/userProfile";
import PaymentPage from "./components/userComponents/PaymentPage";

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
    {
      path: "/UserDashboard",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <EventList />,
        },
        {
          path: "NewArrivals",
          element: <NewEventsPage />,

        },
        {
          path: "BookingHistory",
          element: <BookingHistoryPage />,
        },
        {
          path: "Cart",
          element: <Cart />, // Integrated Cart component
        },
        {
          path: "Ticket",
          element: <TicketPage />,
        },
        {
          path: "Payment",
          element: <PaymentPage />,
        },
        {
          path:"Profile",
          element:<UserProfile/>

        },
      ],
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
