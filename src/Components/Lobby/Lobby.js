import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Lobby = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('updatePlayers', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleStartGame = (otherPlayerId) => {
    // Send start game event to server
    // In this example, we assume the other player's ID is passed to this function
    // You may implement a way to select a player from the lobby
    socket.emit('startGame', otherPlayerId);
  };

  return (
    <div>
      <h2>Multiplayer Lobby</h2>
      <ul>
        {players.map((playerId) => (
          <li key={playerId}>
            Player {playerId}
            <button onClick={() => handleStartGame(playerId)}>Start Game</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;