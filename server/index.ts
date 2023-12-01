import http from 'http';
import express from 'express';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // 明确指定允许的源
    credentials: true, // 允许凭证
  }
});

// 存储全局白板数据
let boardData = '';

io.on('connection', (socket) => {
  console.log('a user connected');

  // 绘制白板
  socket.on('drawBoard', (x, y, style) => {
    socket.broadcast.emit('drawBoard', x, y, style);
  });

  // 存储白板数据
  socket.on('storeBoard', (newBoardData) => {
    boardData = newBoardData;
  });

  // 清除白板
  socket.on('clearBoard', () => {
    boardData = '';
    socket.broadcast.emit('clearBoard');
  });

  // 获取白板数据
  socket.on('getBoard', () => {
    if (boardData !== '') {
      socket.emit('getBoard', boardData);
    }
  });
});

app.use(cors({
  origin: "http://localhost:5173", // 明确指定允许的源
  credentials: true, // 允许凭证
}));
server.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
