import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRtcHandler from "./webRtcHandler.js";

// creating variable where socketIO configs are stored
let socketIO = null;

// HERE GO EVENT LISTENERS
export const registerSocketEvents = (socket) => {
  // storing 'socket' event at 'socketIO'
  socketIO = socket;

  // listening to event of connection to socket server (done at 'main')
  // this is a unique socket from client-side
  socket.on("connect", () => {
    // show at console
    console.log("Successfully connected to Socket.IO server!");
    console.log(socket.id);

    // new block
    // block requires: store
    store.setSocketId(socket.id);

    // new block
    // use socket.id to replace current 'personalCode'
    ui.updatePersonalCode(socket.id);
  });

  // on the callee side, event listener: pre offer emission by socket server
  socket.on("pre-offer", (data) => {
    console.log("Pre-offer has just arrived!"); // not the best place to log
    webRtcHandler.handlePreOffer(data);
  });

  //
  socket.on("pre-offer-answer", (data) => {
    webRtcHandler.handlePreOfferAnswer(data);
  });
};

// HERE GO EVENTS BEING EMITTED FROM THE SERVER
export const sendPreOffer = (data) => {
  console.log("Emmitting pre-offer event to Socket.IO server!");
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};
