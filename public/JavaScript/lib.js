const RestAPIMethod = {GET: 'GET', POST: 'POST'};
//const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'};

async function restAPI(aMethod, aRoute, aData) {
  const body = JSON.stringify(aData);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const request = {
    method: aMethod, headers: headers, body: body
  };
  let error;

  const jsonResponse = await fetch(aRoute, request);
  if (jsonResponse.status !== 200) {
    error = "Server feil: " + jsonResponse.status.toString();
  } else {
    try {
      return await jsonResponse.json();
    } catch (e) {
      error = "JSON feil: " + e.message;
    }
  }
  showError(error);
  return error;
}

function getTemplateContent(aTemplateID) {
  const t = document.querySelector('#' + aTemplateID);
  return document.importNode(t.content, true);
}

function showContent(aContent, aDestID) {
  const dest = document.getElementById(aDestID);
  dest.appendChild(aContent);
}

// Konvertere fra dato til lesbar tekst
function formatDateToLocal(aDate) {
  return aDate.toLocaleDateString('nb-NO', dateOptions) + " kl. " + aDate.toTimeString().substr(0, 5);
}

function convertDateToUTC(aDate) {
  const date = new Date();
  date.setUTCFullYear(aDate.getFullYear());
  date.setUTCDate(aDate.getDate());
  date.setUTCHours(aDate.getHours());
  date.setUTCMinutes(aDate.getMinutes());
  return date;
}

// Konverterer Dato til HTML standard
function formatDateToHTML(aDate) {
  const dtLocal = new Date(aDate);
  dtLocal.setTime(aDate.getTime() - aDate.getTimezoneOffset() * 60 * 1000);
  let txtDate = dtLocal.toISOString();
  const length = txtDate.indexOf("T") + "00:00".length + 1;
  txtDate = txtDate.substr(0, length);
  return txtDate;
}

function formLoadPage(aAction, aParams) {
  const form = document.createElement("form");
  form.method = "GET";
  form.action = aAction;
  for (let key in aParams) {
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