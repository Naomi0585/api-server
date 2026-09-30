'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const authorModel = require('./author');
const bookModel = require('./book');
const Collection = require('./collection-class');

let sequelize;

if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
} else {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

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