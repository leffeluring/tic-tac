import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/jocke.png';
import cross_icon from '../Assets/cross.png';


function Square({ value, onClick }) {
  let squareClass = "square";
  let squareContent = null;
  if (value === 'X') {
      squareClass += " x-square animate";
      squareContent = <img src={cross_icon} alt="X" />;
  } else if (value === 'O') {
      squareClass += " o-square animate";
      squareContent = <img src={circle_icon} width="80px" alt="O" />;
  }
  return (
      <button className={squareClass} onClick={onClick}>
          {squareContent}
      </button>
  );
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAITurn, setIsAITurn] = useState(false); // Track AI's turn


  const handleClick = (index) => {
    if (winner || squares[index] || isAITurn) return; // Do not allow clicks during AI's turn
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
    setIsAITurn(true); // Set AI's turn after user's turn
};



  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };


  useEffect(() => {
    if (!xIsNext && !winner && isAITurn) {
        setTimeout(() => {
            const bestMove = findBestMove(squares);
            const newSquares = [...squares];
            newSquares[bestMove] = 'O'; // Make AI move
            setSquares(newSquares);
            setXIsNext(true); // Set next turn to player's turn
            setWinner(calculateWinner(newSquares));
            setIsAITurn(false); // Set user's turn after AI's turn
        }, 250); // Delay AI move for better user experience
    }
}, [xIsNext, winner, isAITurn, squares]); // Run effect whenever relevant state changes


  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='container'>
    <h1 className='title'>Tic Tac <span>Jocke</span></h1>
    <div className="tictactoe">
    <div className="title">{status}</div>
    <div className="board">
        {[0, 1, 2].map(row => (
            <div key={row} className="board-row">
                {[0, 1, 2].map(col => {
                    const index = row * 3 + col;
                    return (
                        <Square
                            key={index}
                            value={squares[index]}
                            onClick={() => handleClick(index)}
                            disabled={isAITurn} // Disable square during AI's turn
                        />
                    );
                })}
            </div>
        ))}
    </div>
    <button className="reset" onClick={handleRestart}>Reset</button>
</div>
</div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function findBestMove(squares) {
  let bestMove = null;
  let bestScore = -Infinity;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = 'O';
      let score = minimax(squares, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === 'X') {
    return -10 + depth;
  }
  if (winner === 'O') {
    return 10 - depth;
  }
  if (squares.every(square => square !== null)) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        let score = minimax(squares, depth + 1, false);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'X';
        let score = minimax(squares, depth + 1, true);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export default TicTacToe;