const jwt = require ('jsonwebtoken');
const TOKEN_KEY = "Jeg vil ha A på Eksamen!";

/*Denne lager en autoriseringsnøkkel basert på brukerinfo!*/
exports.doAuth = function (aUserID, aUserName) {
  const signData = {
      id: aUserID,
      username: aUserName
    };

  return jwt.sign(signData,TOKEN_KEY);
};

/* Denne sjekker om token er ekte */
exports.isAuth = function (aToken){
  return jwt.verify(aToken,TOKEN_KEY, function (error) {
    return error === null;
  });
};