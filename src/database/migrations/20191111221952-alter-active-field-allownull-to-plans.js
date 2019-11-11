module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('plans', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('plans', 'active', {
      type: Sequelize.BOOLEAN,
      default: true,
      allowNull: true,
    });
  },
};
