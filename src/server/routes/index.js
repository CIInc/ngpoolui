const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('./dist/index.html', {root});
  });

router.get('*', function(req, res, next) {
    res.sendFile('./dist/index.html', {root});
  });

module.exports=router;