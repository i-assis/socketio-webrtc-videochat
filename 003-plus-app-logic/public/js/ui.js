import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
  //grab 'personalCode' from '.html'
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );
  personalCodeParagraph.innerHTML = personalCode;
};

// block requires: constants.js
export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  // is incoming offer for video chat or text chatt ?
  const callTypeInfo =
    // shortcut syntax for if/else
    callType === constants.callType.CHAT_PERSONAL_CODE ? ">Chat<" : ">Video<"; // return is implicit

  // block requires: elements.js
  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // coordinating appearance of dialog boxes
  // removing all dialogs inside HTML 'dialog' element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove);
  // appending
  dialog.appendChild(incomingCallDialog);
};

// reject call dialog box
export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);
  // coordinating appearance of dialog boxes
  // removing all dialogs inside HTML 'dialog' element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove);
  // appending
  dialog.appendChild(callingDialog);
};
