'use strict';

const bookModel = (sequelize, DataTypes) => {
  return sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = bookModel;