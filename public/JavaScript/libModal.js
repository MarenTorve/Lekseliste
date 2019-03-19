const EModalState = { //entydig- enumvariabler - kan aldri endres
    Normal: "lightgreen",
    Warning: "yellow",
    Error: "red"
};

const EModalButtons = {
  OK: 1,
  OKCancel: 2
};

function TModalWindow(aMessage, aState, aButtons) { //Typedefinert
    let functonDone = null;
    const divWindow = document.createElement("div");
    const divContent = document.createElement("div");
    const btnOK  = document.createElement("button");
    let btnCancel = null;
    let txtCaption = document.createElement("span");
    txtCaption.className = "modalWindowContentCaption";
    txtCaption.innerText = aMessage;
    divContent.appendChild(txtCaption);
    divContent.appendChild(document.createElement("br"));

    divWindow.className = "modalWindow";
    divContent.className = "modalWindowContent";
    btnOK.innerText = "OK";
    btnOK.onclick = buttonOKClick;
    divContent.appendChild(btnOK);

    if(aButtons === EModalButtons.OKCancel){
        btnCancel = document.createElement("button");
        btnCancel.innerText = "Avbryt";
        btnCancel.onclick = buttonCancelClick;
        divContent.appendChild(btnCancel);
    }
    divContent.style.backgroundColor = aState;
    divWindow.appendChild(divContent);

    function buttonOKClick(){
        document.body.removeChild(divWindow);
        functonDone("OK");
    }

    function buttonCancelClick(){
        document.body.removeChild(divWindow);
        functonDone("Cancel");
    }

    this.showModal = function(aDone){
        document.body.appendChild(divWindow);
        functonDone = aDone;
    }

}