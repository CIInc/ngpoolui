const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes_index = require('./routes/index');
const routes_api = require('./routes/api');

const root = './';
const port = process.env.PORT || '3000';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist')));
app.use('/api', routes_api);
//app.use('*', routes_index);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));//, {'./'}
});
/*
app.get('*', (req, res) => {
  res.sendFile('../index.html', {root});
});
*/
app.listen(port, () => console.log(`API running on localhost:${port}`));
