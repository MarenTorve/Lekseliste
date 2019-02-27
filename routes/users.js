let express = require('express');
let router = express.Router();

/* Setter inn data i user-tabellen
INSERT INTO public."tblUser" ("fdUserName", "fdPassword")
VALUES ('Maren', '987654');
 */

let pg = require('../API/JavaScript/pgdatabase.js'); //en forekomst av biblioteket

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let sql = "SELECT * FROM \"tblUser\" WHERE(\"fdUserName\" = $1)";
  let parameters = ["Maren"];
  let result = await pg.select(sql,parameters);
  if(result.err !== undefined){
    res.send("Feil fra systemet:" + result.err);
  }else{
    res.send(result.rows);
  }
});

module.exports = router;
