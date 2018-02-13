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

  return Player;
};