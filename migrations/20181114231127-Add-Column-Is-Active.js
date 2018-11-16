'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'audits',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'enviroments',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'enviroment_types',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'evaluations',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'questions',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'units',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    ),
    queryInterface.addColumn(
      'users',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    )
  },
  down: (queryInterface, Sequelize) =>{

  }
};
