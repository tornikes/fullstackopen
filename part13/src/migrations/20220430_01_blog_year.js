const { DataTypes } = require('sequelize');

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
