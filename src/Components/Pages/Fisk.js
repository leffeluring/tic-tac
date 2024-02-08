import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Image from '../Assets/jocke.png';
import Beer from '../Assets/beer.png';
import './Fisk.css';
import Notification from '../Notification';

function Fisk() {
  const [cookies, setCookies] = useState(0);
  const [cookiesPerMinute, setCookiesPerMinute] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickValue, setAutoClickValue] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [autoClickers, setAutoClickers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => prevCookies + autoClickValue);
      setCookiesPerMinute(autoClickValue);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickValue]);

  const clickCookie = (event) => {
    const click = {
      id: Math.random(),
      x: event.clientX,
      y: event.clientY,
      size: Math.random() * 30 + 10, // Random size between 20 and 60
      speed: Math.random() * 2 + 1, // Random speed between 1 and 3
    };
    setClicks([...clicks, click]);
    setCookies((prevCookies) => prevCookies + clickValue);
    setTimeout(() => {
      setClicks((prevClicks) => prevClicks.filter((c) => c.id !== click.id));
    }, click.speed * 1000); // Remove the cookie after animation duration
  };

  const upgradeClickValue = () => {
    if (cookies >= 10) {
      setClickValue((prevClickValue) => prevClickValue + 1);
      setCookies((prevCookies) => prevCookies - 10);
    } else {
      alert('Inte tillräckligt med öl!');
    }
  };

  const purchaseAutoClicker = () => {
    if (cookies >= 50) {
      setAutoClickValue(autoClickValue + 2);
      const autoClicker = {
        id: Math.random(),
        speed: Math.random(), // Random speed between 2 and 5
      };
      setAutoClickers([...autoClickers, autoClicker]);
      setCookies((prevCookies) => prevCookies - 50);
    } else {
      alert('Du har inte tillräckligt med öl');
    }
  };

  return (
    <div>
      <div className="container">
        <Header />
        <p className="title">
          Antal öl: <span>{cookies}</span>
        </p>
        <p className="title">
          Öl per sekund: <span>{cookiesPerMinute}</span>
        </p>
        <Notification value={cookiesPerMinute} />
        <img
        draggable="false" // Set draggable attribute to true
          className="jocke"
          src={Image}
          alt="Cookie"
          onClick={clickCookie}
          style={{ 
            cursor: 'pointer',
            
          }}
        />
        {clicks.map((click) => (
          <img
            key={click.id}
            className="click-effect"
            src={Beer}
            alt="Click Effect"
            style={{
              position: 'absolute',
              zIndex: 999, // Adjust z-index as needed
              top: click.y,
              left: click.x,
              width: click.size,
              animation: `cookieClickAnimation ${click.speed}s ease-in-out`,
              pointerEvents: 'none', // This will allow clicks to pass through
            }}
          />
        ))}
        <br />
        <button className="buy-button" onClick={upgradeClickValue}>
          Öka mängden bulkköp (Kostnad: 10 öl)
        </button>
        <br />
        <button className="buy-button" onClick={purchaseAutoClicker}>
          Köp en robot som köper öl (Kostnad: 50 öl)
        </button>

        
      </div>
      <a className="give-up" target="_blank" href="https://www.aa.se/#:~:text=Om%20Anonyma%20Alkoholister,en%20%C3%B6nskan%20att%20sluta%20dricka.">
        Ge upp och håll kväll
        </a>
    </div>
  );
}

export default Fisk;