module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    WinnerScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LoserScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IsTournamentGame: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });


  Game.associate = (models) => {
    Game.belongsTo(models.Player, {foreignKey : 'WinnerId'});
    Game.belongsTo(models.Player, {foreignKey : 'LoserId'});
  };
  return Game;
};