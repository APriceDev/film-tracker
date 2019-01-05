const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

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

// Load Film model
require('./models/Film');
const Film = mongoose.model('films');

// ======================= MIDDLEWARE

// handlebars middleware
// register handlebars as default templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// method-override middleware
app.use(methodOverride('_method'));

// ======================= ROUTING

// index route
app.get('/', (req, res) => {
  const title = 'Film Tracker';
  res.render('index', { title });
});

// film index route
app.get('/films', (req, res) => {
  Film.find({})
    .sort({ director: 1, year: -1 })
    .then(films => {
      res.render('films/index', { films });
    });
});

// add film route
app.get('/films/add', (req, res) => {
  res.render('films/add');
});

// add film form
app.post('/films', (req, res) => {
  const newFilm = {
    director: req.body.director,
    title: req.body.title,
    year: req.body.year,
    link: req.body.link,
    refactor: req.body.refactor
  };
  new Film(newFilm).save().then(_ => {
    res.redirect('/films');
  });
  // res.send({
  //   director: req.body.director,
  //   title: req.body.title,
  //   year: req.body.year,
  //   link: req.body.link,
  //   refactor: req.body.refactor
  // });
});

// edit film route
app.get('/films/edit/:id', (req, res) => {
  Film.findOne({ _id: req.params.id }).then(film => {
    res.render('films/edit', { film });
  });
});

// edit film form
app.put('/films/:id', (req, res) => {
  Film.findOne({ _id: req.params.id }).then(film => {
    // update values
    film.director = req.body.director;
    film.title = req.body.title;
    film.year = req.body.year;
    film.link = req.body.link;
    // q&d ternary to convert str to boolean
    film.refactor = req.body.refactor === 'on' ? true : false;
    film.save().then(_ => {
      res.redirect('/films');
    });
  });
});

// delete film
app.delete('/films/:id', (req, res) => {
  Film.deleteOne({_id: req.params.id})
    .then(_ => {
      res.redirect('/films');
    })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
