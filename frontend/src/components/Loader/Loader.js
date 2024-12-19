import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
  const [timer, setTimer] = useState(5); // Timer in seconds

  useEffect(() => {
    // Start a countdown timer
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 20000);

    // When the timer reaches 0, clear the interval and perform an action
    if (timer === 0) {
      clearInterval(countdown);
      // Perform your desired action here
      alert('Timer reached 5 seconds. Performing action...');
    }

    // Cleanup: clear the interval when the component unmounts
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  return (
    <div className="loader">
      <div className="loader-content">
        Redirecting...
      </div>
      <div className="timer">
        {timer}s
      </div>
    </div>
  );
};

export default Loader;
