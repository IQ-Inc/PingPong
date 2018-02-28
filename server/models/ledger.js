module.exports = (sequelize, DataTypes) => {
  const Ledger = sequelize.define('Ledger', {
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Transaction: {
      type: DataTypes.DOUBLE,
      allowNull: false,      
    },
    Balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });


  Ledger.associate = (models) => {
    Ledger.belongsTo(models.Player, {foreignKey : 'PlayerId'});
    Ledger.belongsTo(models.Game, {foreignKey : 'GameId'});
  };
  return Ledger;
};


