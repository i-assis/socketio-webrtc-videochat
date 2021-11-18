// no imports at this file !

const express = require("express");
const http = require("http");
const { type } = require("os");

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

// commiting an empty array to memory
let connectedPeers = [];

// socket.io - listening to connection events
// 'io.on' is server side equivalent of 'socket.io' at client side
// we can listen to many events for any given socket
io.on("connection", (socket) => {
  // adding socket.id to 'connectedPeers' Array
  connectedPeers.push(socket.id);

  // adding listener to pre-offer events
  socket.on("pre-offer", (data) => {
    console.log("Pre-offer has just arrived!");
    console.log("Pre-offer data is:");
    console.log(data);

    // new block
    const { calleePersonalCode, callType } = data;

    // handling when incoming ID is an empty string
    if (data.calleePersonalCode === "") {
      console.log(
        "Connected peer has an empty string, that's no propper socketID. Connection event stopped. Try again!"
      );
      return;
    }

    // now, if incoming ID is valid, we proceed:
    console.log(" The type of 'calleePersonalCode' is:");
    console.log(typeof calleePersonalCode);
    console.log(" The value of 'calleePersonalCode' is:");
    console.log(calleePersonalCode);

    // insert callee 'socket.id' in 'connectedPeers' ????
    connectedPeers.push(data.calleePersonalCode);

    // new block
    console.log("Is'connectedPeers' an Array?");
    console.log(connectedPeers instanceof Array);
    console.log("The value of 'connectedPeers' is:");
    console.log(connectedPeers); // log here, inside event listener
    // after another user asks to connect, array should have 2 IDs

    // filter out the connected peer
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    // incoming event must be reported to connected peer
    console.log("Peer that just connected has 'socket.id':");
    console.log(connectedPeer);

    // new block
    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };

      console.log("The pre-offer data has been updated:");
      // insert caller 'socket.id' in 'connectedPeers' ????
      connectedPeers.push(data.callerSocketId);
      console.log(data);

      // block removes duplicate elements from 'connectedPeers'
      Array.prototype.removeDuplicates = function () {
        return this.filter(function (item, index, self) {
          return self.indexOf(item) == index;
        });
      };

      // 'connectedPeers' Array Updates
      const newConnectedPeers = connectedPeers.removeDuplicates();
      // connectedPeers may be updated - check for differences
      console.log(" 'connectedPeers' may be updated - check for differences !");
      connectedPeers = newConnectedPeers.filter((e) => e); // remove empty elements
      console.log(connectedPeers);
    }

    // socket server emits pre-offer event
    io.to(calleePersonalCode).emit("pre-offer", data);
  });

  //

  socket.on("pre-offer-answer", (data) => {
    console.log("Pre-offer answer just arrived!");
    console.log("The data arriving alongside the pre-offer is given by:");
    console.log(data);

    //
    const { callerSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  //

  socket.on("disconnect", () => {
    console.log(
      "Either one or all users got disconnected from socket.io server!"
    ); //! browser refresh = close and open connection

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id //remove disconnected peer from socket array
    );

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });
});

// socket.io - connecting from client side

// turn on the server
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
