const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('film tracker');
});

app.get('/edit', (req, res) => {
  res.send('edit film');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
