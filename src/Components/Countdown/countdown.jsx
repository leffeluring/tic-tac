import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {

    const formatNumber = (number) => {
        return number < 10 ? `0${number}` : number;
      };

  // Helper to calculate the time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = +new Date(targetDate) - now;
    const oneHour = 60 * 60 * 1000; // milliseconds in an hour

    if (difference > 0) {
        // Before target time
        return {
          timeLeft: difference,
          message: '',
        };
      } else if (difference > -oneHour) {
        // Within one hour after target time
        return {
          timeLeft: 0,
          message: 'It is time!',
        };
      } else {
        // More than an hour after target time, reset
        const resetTargetDate = new Date(targetDate);
        resetTargetDate.setDate(resetTargetDate.getDate() + 1); // Reset to the same time on the next day
        return {
          timeLeft: +resetTargetDate - now,
          message: '',
        };
      }
    };

  const [timeLeftDetails, setTimeLeftDetails] = useState(calculateTimeLeft());
  const { timeLeft, message } = timeLeftDetails;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftDetails(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

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
