function TMenuItem(aCaption, aNavTo) {
  const Caption = aCaption;
  const onClick = aNavTo;

  this.asHTMLElement = function () {
    const a = document.createElement("a");
    a.href = "#";
    a.innerText = Caption;
    a.onclick = function clicked() {
      onClick(this);
    };
    return a;
  };
}

function TMenu() {
  const menuItems = [];

  this.addMenuItem = function (aItem) {
    menuItems.push(aItem);
  };

  this.asHTMLElement = function () {
    const nav = document.createElement("nav");
    for (let i = 0; i < menuItems.length; i++) {
      if (i !== 0) {
        const span = document.createElement("span");
        span.innerText = " | ";
        nav.appendChild(span);
      }
      const menuItem = menuItems[i];
      const a = menuItem.asHTMLElement();
      nav.appendChild(a);
    }
    return nav;
  }
}
const menu = new TMenu();
let token = localStorage.getItem('token');
let fdListItemID = localStorage.getItem('fdListItemID');
let fdToDoListID = localStorage.getItem('fdToDoListID');
let fdUserID = localStorage.getItem('fdUserID');
let toDoListCaption = localStorage.getItem('toDoListCaption');
let searchListItemData = localStorage.getItem('jsonSearchListItem');
if(searchListItemData != null){
  searchListItemData = JSON.parse(searchListItemData);
}


function navHome() {
  window.location = "/";
}

function navUserPage() {
  localStorage.setItem('token', token);
  localStorage.setItem('fdUserID', fdUserID);
  formLoadPage("/users",
    {token: token, fdUserID: fdUserID}
  );
}

function navToDoList() {
  localStorage.setItem('token', token);
  localStorage.setItem('fdUserID', fdUserID);
  formLoadPage("/todolist",
    {token: token, fdUserID: fdUserID}
  );
}

function navListItem() {
  localStorage.setItem("fdToDoListID", fdToDoListID);
  localStorage.setItem("toDoListCaption",toDoListCaption);
  if(searchListItemData !== null){
    localStorage.setItem("jsonSearchListItem",JSON.stringify(searchListItemData));
  }else{
    localStorage.removeItem('jsonSearchListItem');
  }
  formLoadPage("/todolist/listitem",
    {token: token, fdToDoListID: fdToDoListID, fdUserID: fdUserID}
  );
}

function navListItemInfo() {
  localStorage.setItem("fdListItemID", fdListItemID);
  localStorage.setItem("fdToDoListID", fdToDoListID);
  formLoadPage("/todolist/listitem/iteminfo",
    {token: token, fdUserID: fdUserID}
  );
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('fdUserID');
  window.location = "/";
}


