module.exports = (sequelize, DataTypes) => {
    const Wager = sequelize.define('Wager', {
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,      
        },
        Odds: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },      
    });
  
  
    Wager.associate = (models) => {
        Wager.belongsTo(models.Player, {foreignKey : 'BettorId'});
        Wager.belongsTo(models.Player, {foreignKey : 'WinnerId'});
        Wager.belongsTo(models.Player, {foreignKey : 'LoserId'});
    };
    return Wager;
  };
  
  
  