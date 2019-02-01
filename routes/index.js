let express = require('express');
let router = express.Router();
let path = require('path');
let pathPublic = path.join(__dirname,"../public");

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.sendFile(pathPublic + "/welcome.html");
});

module.exports = router;