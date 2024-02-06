import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/jocke.png';
import cross_icon from '../Assets/cross.png';

export const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [boardData, setBoardData] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [playerXWins, setPlayerXWins] = useState(0);
    const [playerOWins, setPlayerOWins] = useState(0);

    useEffect(() => {
        checkWinner();
        if (currentPlayer === 'O') {
            // If it's AI's turn, let the AI make a move
            makeAIMove();
        }
    }, [boardData, currentPlayer]); // Trigger when the board data or current player changes

    const toggle = (index) => {
        if (lock) {
            return;
        }
        if (boardData[index] === "" && !winner && currentPlayer === "X") {
            const newData = [...boardData];
            newData[index] = currentPlayer;
            setBoardData(newData);
            setCount(count + 1);
            setCurrentPlayer("O"); // Change to human player's turn
        }
    };


    const resetGame = () => {
        setBoardData(Array(9).fill(""));
        setCount(0);
        setCurrentPlayer("X");
        setWinner(null);
        setLock(false);
    };

    const playerImages = {
        "X": cross_icon,
        "O": circle_icon
    };

    const makeAIMove = () => {
        // Implement AI move logic here
        const bestMoveIndex = findBestMove(boardData, currentPlayer);
        const newData = [...boardData];
        newData[bestMoveIndex] = currentPlayer;
        setBoardData(newData);
        setCount(count + 1);
        setCurrentPlayer("X"); // Change back to AI's turn
    };

    const findBestMove = (board, player) => {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                // Make a move
                board[i] = player;

                // Calculate the score for this move
                const score = minimax(board, 0, false, -Infinity, Infinity, player === "X" ? "O" : "X");

                // Undo the move
                board[i] = "";

                // Update the best move if this move gives a better score
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    };

    const minimax = (board, depth, isMaximizing, alpha, beta, player) => {
        const result = checkWinner(board);
        if (result !== null) {
            if (result === "X") {
                return 10 - depth;
            } else if (result === "O") {
                return depth - 10;
            }
            return 0;
        }

        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = player;
                    const score = minimax(board, depth + 1, false, alpha, beta, player === "X" ? "O" : "X");
                    board[i] = "";
                    maxScore = Math.max(maxScore, score);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = player;
                    const score = minimax(board, depth + 1, true, alpha, beta, player === "X" ? "O" : "X");
                    board[i] = "";
                    minScore = Math.min(minScore, score);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return minScore;
        }
    };

    const checkWinner = () => {
        // Define winning combinations
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardData[a] && boardData[a] === boardData[b] && boardData[a] === boardData[c]) {
                return boardData[a];
            }
        }
        
        if (!boardData.includes("")) {
            return "Draw";
        }
    
        return null;
    };

    let headingText;
    if (winner) {
        headingText = winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`;
    } else {
        headingText = `Player ${currentPlayer}'s Turn`;
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac <span>Jocke</span></h1>
            <h1 className='title'>{headingText}</h1>
            <div className='board'>
                {[0, 1, 2].map((row) => (
                    <div key={row} className={`row${row + 1}`}>
                        {[0, 1, 2].map((col) => (
                            <div key={col} className="boxes" onClick={() => toggle(row * 3 + col)}>
                                {boardData[row * 3 + col] === "X" && <img src={cross_icon} alt="cross" className="animate" />}
                                {boardData[row * 3 + col] === "O" && <img src={circle_icon} alt="circle" className="animate" />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='stats'>
                <p>Player X Wins: {playerXWins}</p>
                <p>Player O Wins: {playerOWins}</p>
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
            
       </div>
    );
};