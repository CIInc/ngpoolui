const express = require('express');
const router = express.Router();
const poolService = require('./pool.service'); 

router.get('/heroes', (req, res) => {
 res.send(200, [
    {"id": 10, "name": "Starlord", "saying": "oh yeah"}
 ])
})
router.get('/pools', (req, res) => {
    poolService.getPools(req, res);
});
router.post('/pool', (req, res) => {
    poolService.postPool(req, res);
});
module.exports=router;