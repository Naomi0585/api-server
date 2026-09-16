'use strict';

require('dotenv').config();

const { db } = require('./src/models');
const { start } = require('./src/server');

const PORT = process.env.PORT || 3001;

db.sync()
  .then(() => {
    console.log('Database connected');
    start(PORT);
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });