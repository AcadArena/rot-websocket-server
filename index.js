const express = require("express");
const socketIO = require("socket.io");
const INDEXFILE = "/index.html";

const port = process.env.PORT || 3200;
const server = express()
  .use((req, res) => res.sendFile(INDEXFILE, { root: __dirname }))
  .listen(port, () => {
    console.log(`[server] Listening to port: ${port}`);
  });

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("User joined => ", socket.id);
  socket.emit("message", "Welcome my gamer");
});

// setInterval(() => io.emit("time", new Date().toTimeString()), 1000 * 60);
