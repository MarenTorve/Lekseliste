const express = require('express');
const router = express.Router();
const path = require('path');
const pg = require('../API/JavaScript/libpgdatabase');
const auth = require('../API/JavaScript/libauth');
const pathHTML = path.join(__dirname, "../API/HTML");
const pathSQL = path.join(__dirname, "../DATA/tblUser/");
const fs = require('fs');
const selectAuthUser = fs.readFileSync(pathSQL + 'selectAuthUser.sql', 'utf8');


/* GET home page. */
router.get('/', async function (req, res, next) {
  //res.sendFile(pathHTML + "/welcome.html");
});

router.get('/index', async function (req, res, next) {
  res.redirect('/');
});

router.post('/login', async function (req, res, next) {
  /* Hente brukeren fra databasen! */
  const parameters = [req.body.fdUserName, req.body.fdPassword];
  const result = await pg.select(selectAuthUser, parameters);
  if (result.err !== undefined) {
    res.status(400).send().end();
  } else {
    //Liste over antall records
    if (result.rows.length !== 1) {
      res.status(200).json("Wrong user name or password").end();
    } else {
      result.rows[0].token = auth.doAuth(result.rows[0].fdUserID, result.rows[0].fdUserName);
      res.status(200).json(result.rows).end();
    }
  }
});

module.exports = router;