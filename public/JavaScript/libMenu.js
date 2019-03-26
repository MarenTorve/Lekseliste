function TMenuItem(aCaption, aNavTo){
  const Caption = aCaption;
  const onClick = aNavTo;

  this.asHTMLElement = function() {
    const a = document.createElement("a");
    a.href = "#";
    a.innerText = Caption;
    a.onclick = function clicked(){
      onClick(this);
    };
    return a;
  };
}

function TMenu() {
  const menuItems = [];

  this.addMenuItem = function(aItem){
    menuItems.push(aItem);
  };

  this.asHTMLElement = function(){
    const nav = document.createElement("nav");
    for(let i = 0; i < menuItems.length; i++){
      if(i !== 0){
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

function navHome(){
  window.location = "/";
}

function navUserPage(){
  formLoadPage("/users",
    {token: token, fdUserID: fdUserID}
  );
}

function navToDoList() {
  formLoadPage("/todolist",
    {token: token, fdUserID: fdUserID}
  );
}

function navListItem(aItem){
  localStorage.setItem("fdToDoListID", aItem.fdToDoListID);
  localStorage.setItem("toDoListCaption", aItem.fdCaption);
  formLoadPage("/todolist/listitem",
      {token: token, fdToDoListID: aItem.fdToDoListID, fdUserID: fdUserID}
  );
}

function navListItemInfo() {
  formLoadPage("/todolist/listitem/iteminfo",
      {
        token: token, fdUserID: fdUserID}
        );
}
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('fdUserID');
  window.location = "/";
}


const menu = new TMenu();


