
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
import EventList from "./components/Home/EventDetails";
import EventDetail from "./components/Home/EventDetails";
=======
import LoginForm from "./components/Home/Login";
>>>>>>> Bradley

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />
    },
    {
<<<<<<< HEAD
      path: "/event",
      element: <EventList />,
    },
    {
      path: "/events/:id",
      element: <EventDetail />, // Use EventDetail here instead of EventDetails
    },
=======
      path:"/Login",
      element: <LoginForm />
    }
>>>>>>> Bradley
  ])

  return (
    <>
     <RouterProvider router={router} />
     <ToastContainer 
        position="top-right"
        autoClose={2000} // Duration in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </>
  )
}

export default App;
