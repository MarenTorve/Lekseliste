const express = require('express');
const router = express.Router();
const path = require('path');
const pg =require('../API/JavaScript/pgdatabase');
const auth = require('../API/JavaScript/auth');
const pathPublic = path.join(__dirname,"../public");

/* GET Todolist-page */
router.get('/', async function(req, res, next) {
  req.query.fdUserID;
  if(auth.isAuth(req.query.token)){
    res.sendFile(pathPublic + "/todolistitem.html");
  }else{
    res.redirect('/');
  }
});

//CRUD --> RESTLess API bruker post

//Lager nye sql-data
router.post('/create', async function(req, res, next) {
  if(auth.isAuth(req.body.token) === false) {
    res.status(403).end();
    return;
  }
  req.body.fdUserID = parseInt(req.body.fdUserID);

  const sqlNewID = "SELECT COALESCE(MAX(\"fdListItemID\"),0) + 1 AS \"newID\" FROM \"tblListItem\"\n" +
    "WHERE \"fdToDoListID\" = $1 AND \"fdUserID\" = $2;";

  const sqlInsert = "insert into \"tblListItem\" (\n" +
    "    \"fdListItemID\",\n" +
    "    \"fdToDoListID\",\n" +
    "    \"fdUserID\",\n" +
    "    \"fdCaption\",\n" +
    "    \"fdDateCreate\",\n" +
    "    \"fdDateDone\",\n" +
    "    \"fdDateDue\")\n" +
    "values (\n" +
    "    $1,\n" +
    "    $2,\n" +
    "    $3,\n" +
    "    $4,\n" +
    "    $5,\n" +
    "    $6,\n" +
    "    $7);";

  let params = [req.body.fdToDoListID, req.body.fdUserID];
  let result = await pg.select(sqlNewID, params);
  if(result.err !== undefined){
    console.log(sqlNewID);
    console.log(result.err.message);
    res.status(500).end();
    return;
  }
  const fdListItemID = result.rows[0].newID;
  req.body.fdDateDone = null;
  params = [
    fdListItemID,
    req.body.fdToDoListID,
    req.body.fdUserID,
    req.body.fdCaption,
    req.body.fdDateCreate,
    req.body.fdDateDone,
    req.body.fdDateDue
  ];
  result = await pg.insert(sqlInsert,params);
  if(result.err !== undefined){
    console.log(params);
    console.log(result.err.message);
    res.status(500).end();
    return;
  }
  res.status(200).json(result.rows).end();
});

//Henter sql-data
router.post('/read', async function(req, res, next) {
  if(auth.isAuth(req.body.token) === false) {
    res.status(403).end();
    return;
  }
  req.body.fdToDoListID = parseInt(req.body.fdToDoListID);
  req.body.fdUserID = parseInt(req.body.fdUserID);
  const sqlSelect = "SELECT * FROM \"tblListItem\"\n" +
    "WHERE \"fdToDoListID\" = $1 AND \"fdUserID\" = $2;";
  const params = [req.body.fdToDoListID, req.body.fdUserID];
  const result = await pg.select(sqlSelect,params);
  if(result.err !== undefined){
    console.log(sqlSelect);
    console.log(result.err.message);
    res.status(500).end();
    return;
  }
  res.status(200).json(result.rows).end();
});

//Oppdaterer sql-data
router.post('/update', async function(req, res, next) {
  if(auth.isAuth(req.body.token) === false) {
    res.status(403).end();
    return;
  }
  req.body.fdToDoListID = parseInt(req.body.fdToDoListID);
  req.body.fdUserID = parseInt(req.body.fdUserID);
  const sqlUpdate = "";
  const params = [req.body.fdToDoListID,req.body.fdUserID,req.body.fdCaption];
  const result = await pg.update(sqlUpdate,params);
  if(result.err !== undefined){
    console.log(params);
    console.log(result.err.message);
    res.status(500).end();
    return;
  }
  res.status(200).json(result.rows).end();
});

//Sletter sql-data
router.post('/delete', async function(req, res, next) {
  if(auth.isAuth(req.body.token) === false) {
    res.status(403).end();
    return;
  }
  req.body.fdToDoListID = parseInt(req.body.fdToDoListID);
  req.body.fdUserID = parseInt(req.body.fdUserID);
  const sqlDelete = "";
  const params = [req.body.fdToDoListID,req.body.fdUserID];
  const result = await pg.delete(sqlDelete,params);
  if(result.err !== undefined){
    console.log(params);
    console.log(result.err.message);
    res.status(500).end();
    return;
  }
  res.status(200).json(result.rows).end();
});


module.exports = router;