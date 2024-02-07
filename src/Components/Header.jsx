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