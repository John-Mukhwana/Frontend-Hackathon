import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import HomePage from "./pages/HomePage";
import LoginForm from "./components/Home/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />
    },
    {
      path:"/Login",
      element: <LoginForm />
    }
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

export default App
