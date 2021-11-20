import express from 'express';
import config from './config.js';

const app = express();

app.get('/', function (req, res) {
  res.send('It works');
});

const port = 3000;
console.log(`Server listening on port ${port}`);
app.listen(port);
