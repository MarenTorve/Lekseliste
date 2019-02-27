const RestAPIMethod = {GET: 'GET', POST: 'POST'};

async function RestAPI (aMethod, aRoute, aData){
  let body = JSON.stringify(aData);
  let headers  = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  };
  let request = {
    method: 'aMethod', headers: headers, body: body
  };
  let jsonResponse = await fetch(aRoute,request);
  if(jsonResponse.status !== 200){
    return null;
  }
  try{
    return await jsonResponse.json();
  }catch (e) {
    return null;
  }
};