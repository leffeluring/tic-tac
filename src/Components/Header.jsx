import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import CountdownTimer from './Countdown/countdown'; // Adjust the import path as necessary

const targetDate = '2024-03-13T22:20:00';


const Header = ({ pageTitle }) => {
    const location = useLocation();

      // Function to dynamically set the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tic Tac Jocke';
      case '/fisk':
        return 'Bartender till Jocke';
      case '/contact':
        return 'Contact';
      default:
        return 'Jockesnekula';
    }
  };
  
  return (
    <header>
        <CountdownTimer targetDate={targetDate} />
        <p className='version-number' style={{color: 'white', textAlign: 'center'}}>Version: 0.1</p>
      <h1  className='title'>{pageTitle || getTitle()}</h1>

      <nav>
      <ul className="header-nav">
          <li><Link to="/">Tic Tac</Link></li>
          <li><Link to="/fisk">Jocke vill ha öl</Link></li>
          <li><Link to="/test">Rullebör</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;



