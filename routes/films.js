const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Film model
require('../models/Film');
const Film = mongoose.model('films');

// film index route
router.get('/films', (req, res) => {
  Film.find({})
    .sort({ director: 1, year: -1 })
    .then(films => {
      res.render('films/index', { films });
    });
});

// add film route
router.get('/films/add', (req, res) => {
  res.render('films/add');
});

// add film form
router.post('/films', (req, res) => {
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
});

// edit film route
router.get('/films/edit/:id', (req, res) => {
  Film.findOne({ _id: req.params.id }).then(film => {
    res.render('films/edit', { film });
  });
});

// edit film form
router.put('/films/:id', (req, res) => {
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
router.delete('/films/:id', (req, res) => {
  Film.deleteOne({ _id: req.params.id }).then(_ => {
    res.redirect('/films');
  });
});

module.exports = router;
