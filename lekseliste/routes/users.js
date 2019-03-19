let express = require('express');
let router = express.Router();
const path = require('path');
const pg = require('../API/JavaScript/libpgdatabase');
const auth = require('../API/JavaScript/libauth');
const libREST = require('../API/JavaScript/librest');
const pathHTML = path.join(__dirname,"../API/HTML");
const pathSQL =  path.join(__dirname,"../DATA/tblUser/");
const fs = require('fs');
const insertAll = fs.readFileSync(pathSQL + 'insertAll.sql', 'utf8');
const selectAll = fs.readFileSync(pathSQL + 'selectAll.sql', 'utf8');
const updateUserName = fs.readFileSync(pathSQL + 'updateUserName.sql', 'utf8');
const updatePassword = fs.readFileSync(pathSQL + 'updatePassword.sql', 'utf8');
const deleteAll = fs.readFileSync(pathSQL + 'deleteAll.sql', 'utf8');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(auth.isAuth(req.query.token)){
    res.sendFile(pathHTML + "/user.html");
  }else{
    res.redirect('/');
  }
});

//Lager nye sql-data
router.post('/create', async function(req, res, next) {
  libREST.post(async function () {
      let params = [
        req.body.fdUserName,
        req.body.fdPassword,
      ];
      return await pg.select(insertAll,params);
    },req, res, next
  ).then();
});

//Henter sql-data
router.post('/read', async function(req, res, next) {
  libREST.post(
    async function () {
      return await pg.select(selectAll);
    },req, res, next
  ).then();
});

//Oppdaterer sql-data
router.post('/updateusername', async function(req, res, next) {
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [
        req.body.fdUserID,
        req.body.fdUserName
      ];
      return await pg.select(updateUserName,params);
    },req, res, next
  ).then();
});

//Oppdaterer sql-data
router.post('/updatepassword', async function(req, res, next) {
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [
        req.body.fdUserID,
        req.body.fdPassword
      ];
      return await pg.select(updatePassword,params);
    },req, res, next
  ).then();
});

//Sletter sql-data
router.post('/delete', async function(req, res, next) {
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [
        req.body.fdUserID
      ];
      return await pg.select(deleteAll,params);
    },req, res, next
  ).then();
});
module.exports = router;
