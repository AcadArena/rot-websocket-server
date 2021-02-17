const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const INDEXFILE = "/index.html";
const { userJoin, getCurrentUser } = require("./utils/users");

const port = process.env.PORT || 3200;
const server = express()
  .use(cors())
  .use((req, res) => res.sendFile(INDEXFILE, { root: __dirname }))
  .listen(port, () => {
    console.log(`[server] Listening to port: ${port}`);
  });

const io = socketIO(server, {
  cors: {
    // origin: /.*\.acadarena\.com/g,
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User joined => ", socket.id);
  socket.emit("message", "Welcome my gamer");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    console.log(`${user.username} joined ${user.room}`);
    io.to(user.room).emit(
      "message",
      `What's gucci my gamer? @${user.username}`
    );
  });
});

// setInterval(() => io.emit("time", new Date().toTimeString()), 1000 * 60);
