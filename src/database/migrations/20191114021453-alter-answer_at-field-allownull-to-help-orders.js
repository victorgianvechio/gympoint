module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('help_orders', 'answer_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('help_orders', 'answer_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
