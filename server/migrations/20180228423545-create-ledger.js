'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ledgers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Transaction: {
        type: Sequelize.DOUBLE,
        allowNull: false,  
      },
      Balance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      PlayerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id',
          as: 'PlayerId',
        },
      },
      GameId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Games',
          key: 'id',
          as: 'GameId',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ledgers');
  }
};