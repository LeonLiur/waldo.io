import {Request, Response} from 'express'
import { Socket } from 'socket.io';
import { Found, Not_Found, Playing, gameStatus } from './util';

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({"message" : "hello world", "roulette" : Math.floor(Math.random() * 6)})
});

app.get('/leaderboard', (req: Request, res: Response) => {
  
})

io.on('connection', (socket: Socket) => {
  console.log(`connected: ${socket.id}`);
  socket.on('gameStatuschange', (status: gameStatus) => {
    switch (status) {
      case Playing:
        break;
      case Found:
        break;
      case Not_Found:
        break;
    }
  })
});

server.listen(8000, () => {
  console.log('server running at http://localhost:8000');
});