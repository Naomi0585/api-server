'use strict';

const Food = (sequelize, DataTypes) =>
  sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    calories: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Food;