import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("message", (body) => {
    socket.broadcast.emit("message", { body, from: socket.id.slice(4) });
  });
});

server.listen(3000, () => {
  console.log("El servidor está funcionando en el puerto 3000");
});
