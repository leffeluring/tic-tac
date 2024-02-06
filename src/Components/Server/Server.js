const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = [];

io.on('connection', (socket) => {
  console.log('New player connected');

  // Add player to lobby
  players.push(socket.id);

  // Send lobby update to all players
  io.emit('updatePlayers', players);

  // Handle player disconnect
  socket.on('disconnect', () => {
    console.log('Player disconnected');
    const index = players.indexOf(socket.id);
    if (index !== -1) {
      players.splice(index, 1);
      io.emit('updatePlayers', players);
    }
  });
  // Handle starting game
  socket.on('startGame', (otherPlayerId) => {
    // Emit start game event to the selected player
    io.to(otherPlayerId).emit('gameStart', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});