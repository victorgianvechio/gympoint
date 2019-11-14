module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('help_orders', 'answer', {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('help_orders', 'answer', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
