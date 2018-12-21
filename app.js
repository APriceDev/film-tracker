const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('film tracker');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
