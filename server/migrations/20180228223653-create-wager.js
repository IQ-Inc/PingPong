'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wagers', {
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
        Amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,      
        },
        Odds: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        BettorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
            model: 'Players',
            key: 'id',
            as: 'BettorId',
            },
        },
        WinnerId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
            model: 'Players',
            key: 'id',
            as: 'WinnerId',
            },
        },
        LoserId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
            model: 'Players',
            key: 'id',
            as: 'WinnerId',
            },
        },        
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ledgers');
  }
};