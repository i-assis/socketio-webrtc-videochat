export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("Getting incoming call dialog!");

  // creating dialog box
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");
  // creating dialog box content
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  // add content to dialog box
  dialog.appendChild(dialogContent);
  // add dialog box title
  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Incoming ${callTypeInfo} Call`;
  // adding call image container - creation
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");
  // adding call image
  const image = document.createElement("img");
  const avatarImagePath = "./utils/images/dialogAvatar.png";
  image.src = avatarImagePath;
  // adding call image container - appending child to image container
  imageContainer.appendChild(image);

  // dialog box buttons - creation and CSS configuration
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  // dialog box buttons - accept call
  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");
  const acceptCallImg = document.createElement("img");
  acceptCallImg.classList.add("dialog_button_image");
  const acceptCallImgPath = "./utils/images/acceptCall.png";
  acceptCallImg.src = acceptCallImgPath;
  acceptCallButton.append(acceptCallImg);
  buttonContainer.appendChild(acceptCallButton);

  // dialog box buttons - reject call
  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utils/images/rejectCall.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.append(rejectCallImg);
  buttonContainer.appendChild(rejectCallButton);

  // appending child to dialog box
  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  // controlling HTML - just needed when specifically testing this dialog box
  // const dialogHTML = document.getElementById("dialog");
  // dialogHTML.appendChild(dialog);

  acceptCallButton.addEventListener("click", () => {
    acceptCallHandler();
  });

  rejectCallButton.addEventListener("click", () => {
    rejectCallHandler();
  });

  return dialog;
};

export const getCallingDialog = (rejectCallHandler) => {
  // creating dialog box
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_wrapper");
  // creating dialog box content
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  // add content to dialog box
  dialog.appendChild(dialogContent);
  // add dialog box title
  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Calling`;
  // adding call image container - creation
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("dialog_image_container");
  // adding call image
  const image = document.createElement("img");
  const avatarImagePath = "./utils/images/dialogAvatar.png";
  image.src = avatarImagePath;
  // adding call image container - appending child to image container
  imageContainer.appendChild(image);

  // dialog box buttons - creation and CSS configuration
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_button_container");

  // HANG UP SPECIFICS
  // dialog box buttons - hang up call
  const hangUpCallButton = document.createElement("button");
  hangUpCallButton.classList.add("dialog_reject_call_button");
  const hangUpCallImg = document.createElement("img");
  hangUpCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utils/images/rejectCall.png";
  hangUpCallImg.src = rejectCallImgPath;
  hangUpCallButton.append(hangUpCallImg);
  buttonContainer.appendChild(hangUpCallButton);

  // appending child to dialog box
  dialogContent.appendChild(title);
  dialogContent.appendChild(imageContainer);
  dialogContent.appendChild(buttonContainer);

  //

  return dialog;
};
