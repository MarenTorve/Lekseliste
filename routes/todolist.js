const express = require('express');
const router = express.Router();
const path = require('path');
const pg =require('../API/JavaScript/pgdatabase');
const auth = require('../API/JavaScript/auth');
const pathPublic = path.join(__dirname,"../public");

/* GET Todolist-page */
router.get('/', async function(req, res, next) {
  req.query.token;
  req.query.fdUserID;
  if(auth.isAuth(req.query.token)){
    res.sendFile(pathPublic + "/todolist.html");
  }else{
    res.redirect('/');
    res.status(401).send("Du må logge inn!").end();
  }
});

//CRUD --> RESTLess API bruker post

//Lager nye sql-data
router.post('/create', async function(req, res, next) {
  const sqlNewID = "SELECT COALESCE(MAX(\"fdToDoListID\"),0) + 1 AS \"newID\" FROM \"tblListItem\"\n" +
    "WHERE \"fdUserID\" = $1";
  const sqlInsert = "insert into \"tblToDoList\" (\"fdToDoListID\",\"fdUserID\",\"fdCaption\")\n" +
    "values ($1,$2,$3)";

  let params = [req.body.fdUserID];
  let result = await pg.select(sqlNewID,params);
  if(result.err !== undefined){
    res.status(500).end();
    return;
  }
  const fdToDoListID = result.rows[0].newID;
  params = [fdToDoListID,req.body.fdUserID,req.body.fdCaption];
  result = await pg.insert(sqlInsert,params);
  if(result.err !== undefined){
    res.status(500).end();
    return;
  }
  res.status(200).json(result.rows).end();
});

//Henter sql-data
router.post('/read', async function(req, res, next) {

});

//Oppdaterer sql-data
router.post('/update', async function(req, res, next) {

});
//Sletter sql-data
router.post('/delete', async function(req, res, next) {

});


module.exports = router;