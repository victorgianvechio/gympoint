module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'active', {
      type: Sequelize.BOOLEAN,
      default: true,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'active');
  },
};
