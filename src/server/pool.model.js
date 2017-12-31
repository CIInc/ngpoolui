const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poolSchema = new Schema(
  {
    //id: Number,
    apiUrl: { type: String, required: true, index: { unique: true, dropDups: true } },
    name: String,
    webUrl: String,
    hashRate: Number,
    miners: Number,
    totalHashes: Number,
    lastBlockFoundTime: Number,
    lastBlockFound: Number,
    totalBlocksFound: Number,
    totalMinersPaid: Number,
    totalPayments: Number,
    roundHashes: Number,
    poolList: String,
    createdAt: Date,
    /*
    id: { type: Number, required: true, unique: true },
    name: String,
    saying: String
    */
  },
  {
    collection: 'Pools'
  }
);

const Pool = mongoose.model('Pool', poolSchema);

module.exports = Pool;