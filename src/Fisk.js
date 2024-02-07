import React, { useState, useEffect } from 'react';
import Header from './Components/Header';

function Fisk() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoClickValue, setAutoClickValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(cookies + autoClickValue);
    }, 1000);
    return () => clearInterval(interval);
  }, [cookies, autoClickValue]);

  const clickCookie = () => {
    setCookies(cookies + clickValue);
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
        <Header/>
      <h1 className='title'>Välkommen till Jockes kröghörna</h1>
      <p>Öl: {cookies}</p>
      <button onClick={clickCookie}>Ge jocke en öl</button>
      <br />
      <button onClick={upgradeClickValue}>Öka mängden bulkköp (Kostnad: 10 öl)</button>
      <br />
      <button onClick={purchaseAutoClicker}>Köp en robot som köper öl (Kostnad: 50 öl)</button>
    </div>
  );
}

export default Fisk;