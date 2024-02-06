import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

export const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [boardData, setBoardData] = useState(Array(9).fill(""));

    const toggle = (index) => {
        if (lock) {
            return;
        }
        if (boardData[index] === "") {
            const newData = [...boardData];
            newData[index] = count % 2 === 0 ? "X" : "O";
            setBoardData(newData);
            setCount(count + 1);
        }
    };

    const resetGame = () => {
        setBoardData(Array(9).fill(""));
        setCount(0);
        setLock(false); // Reset any locks
    };

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe Game in <span>React</span></h1>
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