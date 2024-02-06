import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/jocke.png';
import cross_icon from '../Assets/cross.png';


function Square({ value, onClick }) {
    let squareClass = "square";
    let squareContent = value;
    if (value === 'X') {
        squareClass += " x-square";
    } else if (value === 'O') {
        squareClass += " o-square";
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

  const handleClick = (index) => {
    if (winner || squares[index]) return;
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  // AI's turn
  if (!xIsNext && !winner) {
    const bestMove = findBestMove(squares);
    setTimeout(() => {
      handleClick(bestMove);
    }, 500); // Delay AI move for better user experience
  }

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