const socket = io("/");

// listening to event of connection to socket server
// this is a unique socket from client-side
socket.on("connect", () => {
  console.log("successfully connected to wss/socket.io server");
  console.log(socket.id);
