var express = require('express');
var router = express.Router();
const path = require('path');
const pathHTML = path.join(__dirname, "../API/HTML");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("Hei på deg");
});

module.exports = router;
