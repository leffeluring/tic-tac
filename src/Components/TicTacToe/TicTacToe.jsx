import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

export const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [boardData, setBoardData] = useState(Array(9).fill(""));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        checkWinner();
    }, [boardData]);

    const toggle = (index) => {
        if (lock) {
            return;
        }
        if (boardData[index] === "" && !winner) {
            const newData = [...boardData];
            newData[index] = currentPlayer;
            setBoardData(newData);
            setCount(count + 1);
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
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
                setWinner(boardData[a]);
                return;
            }
        }

        if (count === 9) {
            setWinner("Draw");
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

    let headingText;
    if (winner) {
        headingText = winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`;
    } else {
        headingText = `Player ${currentPlayer}'s Turn`;
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe Game in <span>React</span></h1>
            <h1 className='title'>{headingText}</h1>

            <div className='board'>
                {[0, 1, 2].map((row) => (
                    <div key={row} className={`row${row + 1}`}>
                        {[0, 1, 2].map((col) => (
                            <div key={col} className="boxes" onClick={() => toggle(row * 3 + col)}>
                                {boardData[row * 3 + col] === "X" && <img src={cross_icon} alt="cross" />}
                                {boardData[row * 3 + col] === "O" && <img src={circle_icon} alt="circle" />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
       </div>
    );
};