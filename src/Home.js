import React from 'react';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import Header from './Components/Header';
import CountdownTimer from './Components/Countdown/countdown'; // Adjust the import path as necessary




function Home() {
  return (
    <div>
        <Header/>
     <TicTacToe/>
    </div>
  );
}

export default Home;