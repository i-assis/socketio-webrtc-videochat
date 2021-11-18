import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";

// variable definition block
let connectedUserDetails;

// when this function is executed on the caller's (EMITTER) side...
export const sendPreOffer = (callType, calleePersonalCode) => {
  console.log("Pre-offer function has been executed !");
  console.log("If everything is ok, you'll see 2 more logs...");
  console.log(`Call attributes are given by: ${callType}`);
  console.log(`Personal code of callee is given by: ${calleePersonalCode}`);

  // caller will be storing connected user details
  connectedUserDetails = {
    callType,
    socketId: calleePersonalCode,
  };

  // new block
  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    // preparing data to be sent to socket.IO server
    const data = {
      callType,
      calleePersonalCode,
    };
    // showing dialog box
    ui.showCallingDialog(callingDialogRejectCallHandler);
    // wss.js method
    wss.sendPreOffer(data);
  }
};

// ... this function is executed on the callee's (RECEIVER) side
export const handlePreOffer = (data) => {
  // Not the best place to log this stuff:
  console.log("Pre-offer from webRTC has been detected!");
  console.log(data);

  // new block
  const { callType, callerSocketId } = data;

  connectedUserDetails = {
    socketId: callerSocketId,
    callType,
  };

  // call settings
  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_PERSONAL_CODE
  ) {
    console.log("Showing call dialog box:");
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }
};

//
const acceptCallHandler = () => {
  console.log("Call accepted!");
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
};

//
const rejectCallHandler = () => {
  console.log("Call rejected!");
  sendPreOfferAnswer();
  sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};

//
const callingDialogRejectCallHandler = () => {
  console.log("Rejecting the call!");
};

const sendPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };
  wss.sendPreOfferAnswer(data);
};

//
export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};

//
export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;

  ui.removeAllDialogs();

  console.log("Pre-offer answer just arrived!");
  console.log(data);

  if (preOfferAnswer === constants.preOfferAnswer.CALEE_NOT_FOUND) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee has not been found
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee is not able to connect
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    ui.showInfoDialog(preOfferAnswer);
    // show dialog that callee is rejected by the callee
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
    ui.showCallElements(connectedUserDetails.callType);
    // send webRTC offer
  }
};
