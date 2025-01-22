import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = location.state || {};

  useEffect(() => {
    if (success === undefined) {
      navigate('/UserDashboard');
    }
  }, [success, history]);

  return (
    <div className="flex justify-center items-center h-screen">
      {success ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Payment Successful!</h2>
          <p>Thank you for your booking.</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Payment Failed</h2>
          <p>There was an issue processing your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default Confirmation;