'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const foodModel = require('./food');
const bookModel = require('./book');

const DATABASE_URL =
  process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

const Food = foodModel(sequelize, DataTypes);
const Book = bookModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  Food,
  Book,
};