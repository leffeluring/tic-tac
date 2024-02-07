import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Image from './Components/Assets/jocke.png';
import './Fisk.css'
import Notification from './Notification'

function Fisk() {
  const [cookies, setCookies] = useState(0);
  const [cookiesPerMinute, setCookiesPerMinute] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickValue, setAutoClickValue] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(cookies + autoClickValue);
      setCookiesPerMinute(autoClickValue);
    }, 1000);
    return () => clearInterval(interval);
  }, [cookies, autoClickValue]);

  const clickCookie = () => {
    setCookies(cookies + clickValue);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const upgradeClickValue = () => {
    if (cookies >= 10) {
      setClickValue(clickValue + 1);
      setCookies(cookies - 10);
    } else {
      alert('Inte tillräckligt med öl!');
    }
  };

  const purchaseAutoClicker = () => {
    if (cookies >= 50) {
      setAutoClickValue(autoClickValue + 2);
      setCookies(cookies - 50);
    } else {
      alert('Du har inte tillräckligt med öl');
    }
  };

  return (
    
    <div>
          <div className='container'>
        <Header/>
      <p className='title'>Antal öl: <span>{cookies}</span></p>
      <p className='title'>Öl per sekund: <span>{cookiesPerMinute}</span></p>
      <Notification/>
      <img 
        className='jocke'
        src={Image}
        alt="Cookie"
        onClick={clickCookie}
        style={{ cursor: 'pointer', transition: 'transform 0.1s ease', transform: isClicked ? 'scale(0.9)' : 'scale(1)' }}
      />
      <br />
      <button className="reset" onClick={upgradeClickValue}>Öka mängden bulkköp (Kostnad: 10 öl)</button>
      <br />
      <button className="reset"  onClick={purchaseAutoClicker}>Köp en robot som köper öl (Kostnad: 50 öl)</button>
    </div>
    </div>
  );
}

export default Fisk;