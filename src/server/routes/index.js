const express = require('express');
const router = express.Router();

//const root = './';

router.get('/', function(req, res, next) {
  res.sendFile('./dist/index.html');//, {root}
});
/*
router.get('/home', function(req, res, next) {
  res.sendFile('./dist/index.html');//, {root}
});
router.get('/*', function(req, res, next) {
    res.sendFile('./dist/index.html');//, {root}
  });
*/
module.exports=router;