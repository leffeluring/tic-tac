import React, { useState, useEffect } from 'react';

const NotificationBar = () => {
  const [messages, setMessages] = useState([
    "Ge mig öl!",
    "Kalle, vad ska jag göra nu?",
    "Zelda har så sjuk story",
    "Fyfan jag är så jävla knackad"
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, 5000); // Change the interval time as needed (currently set to 5 seconds)

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div className="talk-bubble tri-right border round btm-right-in">
      {currentMessage ? (
        <p>{currentMessage}</p>
      ) : (
        <p>Äntligen fredag!! Klicka på mig för att ge mig öl</p> // Fallback message when there are no messages
      )}
    </div>
  );
};

export default NotificationBar;