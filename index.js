const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const INDEXFILE = "/index.html";
const { userJoin, getCurrentUser } = require("./utils/users");
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
  console.log("User joined => ", socket.id);
  socket.emit("set_live_settings", getLiveData());

  socket.on("set_live_settings", (data) => {
    setLiveData(data);
    io.emit("set_live_settings", data);
  });
});

// setInterval(() => io.emit("time", new Date().toTimeString()), 1000 * 60);
