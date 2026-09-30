'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const authorModel = require('./author');
const bookModel = require('./book');
const Collection = require('./collection-class');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : './database.sqlite',
  logging: false,
});

const Author = authorModel(sequelize, DataTypes);
const Book = bookModel(sequelize, DataTypes);

Author.hasMany(Book, {
  foreignKey: 'authorId',
  sourceKey: 'id',
});

Book.belongsTo(Author, {
  foreignKey: 'authorId',
  targetKey: 'id',
});

const authorCollection = new Collection(Author);
const bookCollection = new Collection(Book);

module.exports = {
  db: sequelize,
  Author,
  Book,
  authorCollection,
  bookCollection,
};