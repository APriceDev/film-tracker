const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

// load routes
const films = require('./routes/films');

// map global promise
mongoose.Promise = global.Promise;

// connect to mongoose
mongoose
  .connect(
    'mongodb://localhost/theatreEsoterika',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

// ======================= MIDDLEWARE

// handlebars
// register handlebars as default templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// method-override
app.use(methodOverride('_method'));

// ======================= ROUTING

// index route
app.get('/', (req, res) => {
  const title = 'Theatre Esoterika';
  res.render('index', { title });
});

// use routes
app.use('/films', films);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
