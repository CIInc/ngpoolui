const express = require('express');
const router = express.Router();
const poolService = require('./pool.service'); 

router.get('/', function(req, res, next) {
    res.sendFile('./dist/index.html', {root});
  });

router.get('/heroes', (req, res) => {
 res.status(200).send([
    {"id": 10, "name": "Starlord", "saying": "oh yeah"}
 ])
})
router.get('/pools', (req, res) => {
    poolService.getPools(req, res);
});
router.post('/pool', (req, res) => {
    poolService.postPool(req, res);
});
/*
router.get('*', function(req, res, next) {
    res.sendFile('./dist/index.html', {root});
  });
  */
module.exports=router;