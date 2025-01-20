import  { useEffect, useState } from 'react';
import './../../styles/Spinner.css';

const Spinner = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);

    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col align-middle justify-center items-center space-y-5">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      {showMessage && (
        <p className="text-center">
          It is taking a bit longer than usual to complete your request.
        </p>
      )}
    </div>
  );
};

export default Spinner;
