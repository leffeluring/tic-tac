import React from 'react';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import Header from './Components/Header';

function Home() {
  return (
    <div>
        <Header/>
     <TicTacToe/>
    </div>
  );
}

export default Home;