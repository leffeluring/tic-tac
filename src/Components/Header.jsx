import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';


const Header = ({ pageTitle }) => {
    const location = useLocation();

      // Function to dynamically set the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Tic Tac Jocke';
      case '/about':
        return 'About';
      case '/contact':
        return 'Contact';
      default:
        return 'Your App Name';
    }
  };
  
  return (
    <header>
      <h1  className='title'>{pageTitle || getTitle()}</h1>
      <nav>
      <ul className="header-nav">
          <li><Link to="/">Tic Tac Toe</Link></li>
          <li><Link to="/fisk">Jocke fisk</Link></li>
          <li><Link to="/test">Rullebör</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;