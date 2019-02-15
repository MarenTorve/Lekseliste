let express = require('express');
let router = express.Router();
let path = require('path');
let pg =require('./pgdatabase.js');
let pathPublic = path.join(__dirname,"../public");
let jwt = require ('jsonwebtoken');
const TOKEN_KEY = "Jeg vil ha A på Eksamen!";

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.sendFile(pathPublic + "/welcome.html");
});

router.post('/login', async function (req,res,next) {
   /* Hente brukeren fra databasen! */
    const fdUserName = req.body.fdUserName;
    let sql = "SELECT * FROM \"tblUser\" WHERE(\"fdUserName\" = $1)";
    let parameters = [fdUserName];
    let result = await pg.select(sql,parameters);
    if(result.err !== undefined){
        res.send("Feil fra systemet:" + result.err);
    }else{
        //Liste over antall records
        if (result.rows.length !== 1) {
          res.send("Ukjent bruker eller passord");
        }else{
          if (result.rows[0].fdPassword !== req.body.fdPassword){
              res.send("Ukjent bruker eller passord");
          } else{
            let token = jwt.sign({
                id: result.rows[0].fdUserID,
                username: result.rows[0].fdUserName
            }, TOKEN_KEY);
            let jsonResponse = {token: token,fdUserID: result.rows[0].fdUserID};
            res.status(200).json(jsonResponse).end;
          }
        }
    }
});

module.exports = router;