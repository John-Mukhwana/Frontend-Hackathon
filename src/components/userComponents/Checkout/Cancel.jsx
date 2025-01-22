import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md'; // Importing a cancel icon

const Cancel = () => {
 const navigate=useNavigate();

  React.useEffect(() => {
    toast.error('Payment Canceled.', {
      position: 'top-right',
      autoClose: 3000,
    });
  }, []);


  return (
    <div className="flex  justify-center items-center min-h-screen bg-red-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-4">
          <MdCancel className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Payment Canceled</h1>
        <p className="text-center text-gray-500 mb-6">You have canceled the payment.</p>
        <div className="text-center">
          <button
            onClick={() => navigate('/UserDashboard')}
            className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
          >
            Go back to Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
