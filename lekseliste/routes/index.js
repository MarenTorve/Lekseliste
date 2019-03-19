const express = require('express');
const router = express.Router();
const path = require('path');
const pg =require('../API/JavaScript/libpgdatabase');
const auth = require('../API/JavaScript/libauth');
const pathHTML = path.join(__dirname,"../API/HTML");


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.sendFile(pathHTML + "/welcome.html");
});

router.get('/index', async function(req, res, next) {
  res.redirect('/');
});

router.post('/login', async function (req,res,next) {
  /* Hente brukeren fra databasen! */
  const fdUserName = req.body.fdUserName;
  let sql = "SELECT * FROM \"tblUser\" WHERE(\"fdUserName\" = $1)";
  let parameters = [fdUserName];
  let result = await pg.select(sql,parameters);
  if(result.err !== undefined){
    res.status(400).send("Feil fra systemet:" + result.err);
  }else{
    //Liste over antall records
    if (result.rows.length !== 1) {
      res.status(401).send("Ukjent bruker eller passord");
    }else{
      if (result.rows[0].fdPassword !== req.body.fdPassword){
        res.status(401).send("Ukjent bruker eller passord");
      } else{
        const row = result.rows[0];
        let token = auth.doAuth(row.fdUserID, row.fdUserName);
        let jsonResponse = {token: token, fdUserID: row.fdUserID};
        res.status(200).json(jsonResponse).end();
      }
    }
  }
});

module.exports = router;