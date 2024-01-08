import { Request, Response } from 'express'
import { Socket } from 'socket.io';
import { Found, Not_Found, Playing, gameStatus } from './util';

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require('cors')

const corsOptions = {
  origin: '*',
}

const app = express(corsOptions);
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ "message": "hello world", "roulette": Math.floor(Math.random() * 6) })
});

app.get('/leaderboard', (req: Request, res: Response) => {

})

io.on('connection', (socket: Socket) => {
  console.log(`[*] connected: ${socket.id}`);
  socket.on('joinRoom', (room: string) => {
    console.log(`[+] received: /joinRoom/ on room=${room}`)
    socket.join(room)
  })
  socket.on('gameStatusChange', ({ status, player, roomNumber }: { status: gameStatus, player: string, roomNumber: string }) => {
    console.log("[+] received: /gameStatusChange/")
    switch (status) {
      case Playing:
        break;
      case Found:
        console.log("[+] Sent: scoreBoardChange")
        socket.to(roomNumber).emit('scoreBoardChange', { player: player, score: 100 })
        break;
      case Not_Found:
        console.log("[+] Sent: scoreBoardChange")
        socket.to(roomNumber).emit('scoreBoardChange', { player: player, score: -100 })
        break;
    }
  })
  socket.on('mousePos', (roomNumber: string, mousePos: { x: number, y: number }) => {
    console.log(`[+] received: /mousePos/ room=${roomNumber} mousePos=${mousePos.x}, ${mousePos.y}`)
    socket.to(roomNumber).emit('mousePos', mousePos)
  })
  socket.on('disconnect', () => {
    console.log(`[*] disconnected: ${socket.id}`);
  });
});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});