let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  allowConnectionsFromStrangers: false, // false at first, can be changed at the website
  screenSharingActive: false,
};

// exporting setter functions
export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId, //key 'socketId' gets value from 'socketId' input
  };
  console.log(state)
};

export const setLocalStream = (stream) => {
  state = {
    ...state,
    LocalStream: stream,
  };
};

export const setAllowConnectionsFromStrangers = (allowConnection) => {
  state = {
    ...state,
    allowConnectionsFromStrangers: allowConnection,
  };
};

export const setScreenSharingActive = (screenSharingActive) => {
  state = {
    ...state,
    screenSharingActive,
  };
};

export const setScreenSharingStream = (stream) => {
  state = {
    ...state,
    screenSharingStream: stream,
  };
};

export const setRemoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  };
};

// exporting current state
export const getState = () => {
  return state;
};
