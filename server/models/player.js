const Game = require('./').Game;
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NickName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  Player.associate = (models) => {    
    Player.hasMany(models.Game, {as: 'GamesWon', foreignKey : 'WinnerId'});
    Player.hasMany(models.Game, {as: 'GamesLost', foreignKey : 'LoserId'});
  };

  return Player;
};