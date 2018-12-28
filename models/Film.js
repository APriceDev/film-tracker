const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const FilmSchema = new Schema({
  director: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  refactor: {
    type: Boolean,
    required: false
  }
});

mongoose.model('ideas', FilmSchema);
