'use strict';

const authorModel = (sequelize, DataTypes) => {
  return sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
  });
};

module.exports = authorModel;