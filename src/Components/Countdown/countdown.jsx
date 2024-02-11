import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = ({ targetDate }) => {
  // Define calculateTimeLeft function before using it
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +new Date(targetDate) - now;
    const oneHour = 60 * 60 * 1000; // milliseconds in an hour

    if (difference > 0) {
      return {
        timeLeft: difference,
        message: '',
      };
    } else if (difference > -oneHour) {
      return {
        timeLeft: 0,
        message: 'It is time',
      };
    } else {
      const resetTargetDate = new Date(targetDate);
      resetTargetDate.setDate(resetTargetDate.getDate() + 1);
      return {
        timeLeft: +resetTargetDate - now,
        message: '',
      };
    }
  };

  const [timeLeftDetails, setTimeLeftDetails] = useState(calculateTimeLeft());
  const { timeLeft, message } = timeLeftDetails;

  const audioRef = useRef(new Audio('../Assets/LOVEKILLER.mp3')); // Update this path


  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  useEffect(() => {
    // Timer to update the countdown every second
    const timer = setTimeout(() => {
      const newTimeLeftDetails = calculateTimeLeft();
      setTimeLeftDetails(newTimeLeftDetails);

    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);


  const renderTimeLeft = () => {
    if (message) {
      return <h2>{message}</h2>;
    } else if (timeLeft > 0) {
      return (
        <div className='countdown-hossa'>

          <span>{formatNumber(Math.floor((timeLeft / (1000 * 60 * 60)) % 24))}:</span>
          <span>{formatNumber(Math.floor((timeLeft / 1000 / 60) % 60))}:</span>
          <span>{formatNumber(Math.floor((timeLeft / 1000) % 60))}</span>
        </div>
      );
    }
  };

  return (
    <div className='hossa-stream'>
                        
      <h1 className='title-hossa'>Hossa <span>Stream:</span></h1>
      {renderTimeLeft()}
    </div>
  );
};

export default CountdownTimer;
