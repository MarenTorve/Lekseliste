const EModalState = {
  Normal: "green",
  Warning: "yellow",
  Error: "red"
};

const EModalButtons = {
  Ok:         1,
  Cancel:     2,
  OkCancel:   3
};

function TModalWindow(aMessage, aState, aButtons) {
  let functionDone = null;
  const divWindow = document.createElement("div");
  const divContent = document.createElement("div");
  const btnOk = document.createElement("button");
  let btnCancel = null;
  const txtCaption = document.createElement("span");
  txtCaption.className = "modalWindowContentCaption";
  txtCaption.innerText = aMessage;
  divContent.appendChild(txtCaption);
  divContent.appendChild(document.createElement("br"));

  divWindow.className = "modalWindow";
  divContent.className = "modalWindowContent";
  btnOk.innerText = "Ok";
  btnOk.onclick = buttonOkClick;
  divContent.appendChild(btnOk);

  if(aButtons === EModalButtons.OkCancel){
    btnCancel = document.createElement("button");
    btnCancel.innerText = "Avbryt";
    btnCancel.onclick = buttonCancelClick;
    divContent.appendChild(btnCancel);
  }

  divContent.style.backgroundColor = aState;
  divWindow.appendChild(divContent);

  function buttonOkClick(){
    document.body.removeChild(divWindow);
    if(functionDone !== null){
      functionDone(EModalButtons.Ok);
    }
  }

  function buttonCancelClick(){
    document.body.removeChild(divWindow);
    if(functionDone !== null){
      functionDone(EModalButtons.Cancel);
    }
  }

  this.showModal = function(aDone){
    document.body.appendChild(divWindow);
    functionDone = aDone;
  }
}

function showError(aMessage){
  const modal = new TModalWindow(aMessage,EModalState.Error,EModalButtons.Ok);
  modal.showModal(null);
}

function showInfoMessage(aMessage){
  const modal = new TModalWindow(aMessage,EModalState.Normal, EModalButtons.Ok);
  modal.showModal(null);
}