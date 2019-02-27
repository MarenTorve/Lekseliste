let jwt = require ('jsonwebtoken');
const TOKEN_KEY = "Jeg vil ha A på Eksamen!";

/*Denne lager en autoriseringsnøkkel basert på brukerinfo!*/
exports.doAuth = function (aUserID, aUserName) {
  const signData = {
      id: aUserID,
      username: aUserName
    };

  const authData = jwt.sign(signData,TOKEN_KEY);
  return authData;
};

exports.isAuth = function (aToken){
  return jwt.verify(aToken,TOKEN_KEY, function (error) {
    if(error !== null){
      return false;
    }else{
      return true;
    }
  });
};