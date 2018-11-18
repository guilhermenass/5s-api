'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'evaluations',
      'grade',
      {
        type: Sequelize.DOUBLE
      }
    )
  },

  down: (queryInterface, Sequelize) => {

  }
};
