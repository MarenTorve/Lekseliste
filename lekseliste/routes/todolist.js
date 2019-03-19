const express = require('express');
const router = express.Router();
const path = require('path');
const pg = require('../API/JavaScript/libpgdatabase');
const auth = require('../API/JavaScript/libauth');
const libREST = require('../API/JavaScript/librest');
const pathHTML = path.join(__dirname,"../API/HTML");
const pathSQL =  path.join(__dirname,"../DATA/tblUser/tblToDoList/");
const fs = require('fs');
const insertAll = fs.readFileSync(pathSQL + 'insertAll.sql', 'utf8');
const selectAll = fs.readFileSync(pathSQL + 'selectAll.sql', 'utf8');
const updateAll = fs.readFileSync(pathSQL + 'updateAll.sql', 'utf8');
const deleteAll = fs.readFileSync(pathSQL + 'deleteAll.sql', 'utf8');



/* GET Todolist-page */
router.get('/', async function(req, res, next) {
  req.query.fdUserID;
  if(auth.isAuth(req.query.token)){
    res.sendFile(pathHTML + "/todolist.html");
  }else{
    res.redirect('/');
  }
});

//CRUD --> RESTLess API bruker post

//Lager nye sql-data
router.post('/create', async function(req, res, next) {
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(async function () {
      let params = [
        req.body.fdUserID,
        req.body.fdUserID,
        req.body.fdCaption
      ];
      return await pg.select(insertAll,params);
    },req, res, next
  ).then();
});

//Henter sql-data
router.post('/read', async function(req, res, next) {
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [req.body.fdUserID];
      return await pg.select(selectAll,params);
    },req, res, next
  ).then();
});

//Oppdaterer sql-data
router.post('/update', async function(req, res, next) {
  req.body.fdToDoListID = parseInt(req.body.fdToDoListID);
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [
        req.body.fdToDoListID,
        req.body.fdUserID,
        req.body.fdCaption
      ];
      return await pg.select(updateAll,params);
    },req, res, next
  ).then();
});

//Sletter sql-data
router.post('/delete', async function(req, res, next) {
  req.body.fdToDoListID = parseInt(req.body.fdToDoListID);
  req.body.fdUserID = parseInt(req.body.fdUserID);
  libREST.post(
    async function () {
      const params = [
        req.body.fdToDoListID,
        req.body.fdUserID
      ];
      return await pg.select(deleteAll,params);
    },req, res, next
  ).then();
});
module.exports = router;