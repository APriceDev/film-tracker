const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// handlebars middleware
// register handlebars as default templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// index route
app.get('/', (req, res) => {
  const title = 'Film Tracker';
  res.render('index', { title });
});

// add film route
app.get('/films/add', (req, res) => {
  res.render('films/add');
});

app.post('/films', (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
