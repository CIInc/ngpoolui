const Pool = require('./pool.model');

require('./mongo').connect();

function getPools(req, res) {
  const docquery = Pool.find({});
  docquery
    .exec()
    .then(pools => {
      res.status(200).json(pools);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postPool(req, res) {
  const originalPool = { 
    apiUrl: req.body.apiUrl, 
    name: req.body.name, 
    hashRate: req.body.hashRate, 
    miners: req.body.miners, 
    totalHashes: req.body.totalHashes, 
    lastBlockFoundTime: req.body.lastBlockFoundTime, 
    lastBlockFound: req.body.lastBlockFound, 
    totalBlocksFound: req.body.totalBlocksFound, 
    totalMinersPaid: req.body.totalMinersPaid, 
    totalPayments: req.body.totalPayments, 
    roundHashes: req.body.roundHashes, 
    poolList: req.body.poolList, 
    createdAt: req.body.createdAt, 
    };
  const pool = new Pool(originalPool);
  pool.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(pool);
    console.log('Pool created successfully!');
  });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getPools,
  postPool
};