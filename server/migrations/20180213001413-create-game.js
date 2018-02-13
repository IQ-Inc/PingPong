module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      IsTournament: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      LoserScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      WinnerScore: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      WinnerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Players',
          key: 'id',
          as: 'WinnerId',
        },
      },
      LoserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Players',
          key: 'id',
          as: 'LoserId',
        },
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Games'),
};