const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const INDEXFILE = "/index.html";
const {
  userJoin,
  getCurrentUser,
  getUsersInRoom,
  removeUser,
  updateUsername,
} = require("./utils/users");
const { getLiveData, setLiveData } = require("./utils/live");

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
  socket.on("set_live_settings", ({ data, room }) => {
    setLiveData(data, room);
    io.to(room).emit("set_live_settings", data);
  });

  socket.on("join_room", ({ room, username }) => {
    if (!room) retrun;
    if (socket.lastRoom) {
      socket.leave(socket.lastRoom);
      socket.lastRoom = null;
    }
    const user = userJoin(socket.id, username, room);
    socket.join(room);
    socket.lastRoom = room;
    console.log(`[${user.room}]: ${user.username} joined`);
    io.sockets.in(user.room).emit("usersUpdate", getUsersInRoom(user.room));
    socket.emit("set_live_settings", getLiveData(user.room));
  });

  socket.on("update_user", ({ room, username }) => {
    updateUsername(socket.id, username);
    io.sockets.in(room).emit("usersUpdate", getUsersInRoom(room));
  });

  socket.on("time_command", ({ command, room }) => {
    io.sockets.in(room).emit("time_command", command);
  });

  socket.on("disconnect", (reason) => {
    removeUser(socket.id);
  });
});

// setInterval(() => io.emit("time", new Date().toTimeString()), 1000 * 60);
