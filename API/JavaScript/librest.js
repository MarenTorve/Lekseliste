const auth = require('./libauth');


exports.post = async function(aWork, aReq, aRes, aNext){
  if(auth.isAuth(aReq.body.token) === false) {
    aRes.status(403).end();
    return;
  }

  const result = await aWork();

  if(result.err !== undefined){
    console.log(result.err.stack);
    aRes.status(500).end();
    return;
  }
  aRes.status(200).json(result.rows).end();
};