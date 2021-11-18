// imports  must absolutely be made in the order at which they are required
import * as store from "./store.js"; //access to all store.js exported functions
import * as wss from "./wss.js";
import * as webRtcHandler from "./webRtcHandler.js";
import * as constants from "./constants.js";

// initializing socket server connection & configuration
const socket = io("/");
wss.registerSocketEvents(socket);

// manage event: click personal code copy button
// 1. grabbing from page
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
//2. copying grabbed content to clipboard
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// manage event: click any connection button
// 1. grabbing from page
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);
// 2. actions on grabbed content
personalCodeChatButton.addEventListener("click", () => {
  console.log('A click on the "chat" button has been detected !');
  // grabbing "Personal Code" from form
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  // how this button affects call atributes
  const callType = constants.callType.CHAT_PERSONAL_CODE;
  // sending "callType"+"Personal Code" to pre-offer
  webRtcHandler.sendPreOffer(callType, calleePersonalCode);
});
personalCodeVideoButton.addEventListener("click", () => {
  console.log('A click on the "Video Call" button has been detected !');
  // grabbing "Personal Code" from form
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  // how this button affects call atributes
  const callType = constants.callType.VIDEO_PERSONAL_CODE;
  // sending "callType"+"Personal Code" to pre-offer
  webRtcHandler.sendPreOffer(callType, calleePersonalCode);
});

