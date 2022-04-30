const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../util/db');

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        default: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        default: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      author: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        default: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        default: Sequelize.fn('NOW'),
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable('blogs');
    await queryInterface.dropTable('users');
  },
};
