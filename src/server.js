'use strict';

const express = require('express');

const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');

const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');

const app = express();

app.use(express.json());

app.use(authorRouter);
app.use(bookRouter);

app.use(notFound);
app.use(serverError);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  },
};