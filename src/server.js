'use strict';

const express = require('express');
const cors = require('cors');

const foodRouter = require('./routes/food');
const bookRouter = require('./routes/book');

const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API Server is running');
});

app.use(foodRouter);
app.use(bookRouter);

app.use(notFound);
app.use(serverError);

function start(port) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = {
  app,
  start,
};