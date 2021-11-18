const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// adding middlewares
app.use(express.static("public"));

// http routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//
let connectedPeers = [];

// socket.io - listening to connection events
// 'io.on' is server side equivalent of 'socket.io' at client side
// we can listen to many events for any given socket
io.on("connection", (socket) => {
  connectedPeers.push(socket.id);
  console.log(connectedPeers);

  socket.on("disconnect", () => {
    console.log("user disconnected"); //! browser refresh = close and open connection

    const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
      peerSocketId !== socket.id; //remove disconnected peer from socket array
    });

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });
});

// socket.io - connecting from client side

// turn on the server
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
