import React, { useState, useEffect } from 'react';
import Square from './Square';
import { Chess } from 'chess.js';

function Chessboard() {
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // Update board state when chess.js state changes
    setBoard(chess.board());
  }, [chess]);

  const handleSquareClick = (sourceSquare) => {
    // Try to move to the clicked square from the selected square
    const move = chess.move({
      from: sourceSquare,
      to: prompt("Enter the destination square (e.g., 'e4'):"), // Simple prompt for demo purposes
      // Additional options for promotion
      promotion: 'q' // NOTE: Always promotes to a queen for simplicity in this example
    });

    if (move === null) return; // If move is invalid, do nothing

    setBoard(chess.board()); // Update the board after a successful move
  };

  const renderSquare = (piece, i, square) => {
    const squareColor = (square.charCodeAt(0) - square.charCodeAt(1)) % 2 === 0 ? 'white' : 'black';
    const pieceSymbol = piece ? piece.color === 'b' ? `b${piece.type.toUpperCase()}` : `w${piece.type.toUpperCase()}` : '';
    return (
      <Square
        key={i}
        piece={pieceSymbol}
        color={squareColor}
        onClick={() => handleSquareClick(square)}
      />
    );
  };

  return (
    <div style={{ width: '320px', height: '320px', display: 'flex', flexWrap: 'wrap' }}>
      {board.flat().map((piece, i) => {
        const file = String.fromCharCode('a'.charCodeAt(0) + (i % 8));
        const rank = 8 - Math.floor(i / 8);
        const square = `${file}${rank}`;
        return renderSquare(piece, i, square);
      })}
    </div>
  );
}

export default Chessboard;