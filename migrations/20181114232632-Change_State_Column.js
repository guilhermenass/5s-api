'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'units',
      'state',
      {
        type: Sequelize.CHAR(2)
      }
    )
  }
};
