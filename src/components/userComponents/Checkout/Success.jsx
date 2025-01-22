import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md'; // Importing a success check icon

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      toast.success('Payment Successful!', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.log('Stripe Session ID:', sessionId);
      // Optionally, verify the payment on the backend using the session ID
    }
  }, [sessionId]);

  return (
    <div className="flex mt-20 justify-center items-center min-h-screen bg-green-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <MdCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Payment Successful!</h1>
        <p className="text-center text-gray-500 mb-6">Thank you for your purchase.</p>
        <div className="text-center">
          <button
             onClick={() => navigate('/UserDashboard')}
            className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
          >
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
