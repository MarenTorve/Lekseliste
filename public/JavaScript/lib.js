const RestAPIMethod = {GET: 'GET', POST: 'POST'};
//const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' };

async function RestAPI (aMethod, aRoute, aData){
  const htmlBody = document.querySelector("body");
  htmlBody.style.cursor = "wait";
  let body = JSON.stringify(aData);
  let headers  = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  };
  let request = {
    method: aMethod, headers: headers, body: body
  };
  let jsonResponse = await fetch(aRoute,request);
  if(jsonResponse.status !== 200){
    htmlBody.style.cursor = "default";
    return null;
  }
  try{
    htmlBody.style.cursor = "default";
    return await jsonResponse.json();
  }catch (e) {
    htmlBody.style.cursor = "default";
    return null;
  }
}

function getTemplateContent(aTemplateID){
  const t = document.querySelector('#' + aTemplateID);
  return document.importNode(t.content, true);
}

function showContent(aContent, aDestID) {
  const dest = document.getElementById(aDestID);
  dest.appendChild(aContent);
}
// Konvertere fra dato til lesbar tekst
function formatDateToLocal(aDate){
  return aDate.toLocaleDateString('nb-NO', dateOptions) + " kl. " + aDate.toTimeString().substr(0,5);
}

// Konverterer Dato til HTML standard
function formatDateToHTML(aDate){
  const tzo = aDate.getTimezoneOffset();
  const dtLocal = new Date(aDate);
  dtLocal.setTime(aDate.getTime() - aDate.getTimezoneOffset()*60*1000);
  let txtDate = dtLocal.toISOString();
  let length = txtDate.indexOf("T") + "00:00".length + 1;
  txtDate = txtDate.substr(0,length);
  return txtDate;
}

function formLoadPage(aAction,aParams) {
  const form = document.createElement("form");
  form.method = "GET";
  form.action = aAction;
  for(let key in aParams){
    const element = document.createElement("input");
    element.type = "hidden";
    element.name = key;
    if (aParams.hasOwnProperty(key)) {
      element.value = aParams[key];
    }
    form.appendChild(element);
  }
  document.body.appendChild(form);
  form.submit();
}