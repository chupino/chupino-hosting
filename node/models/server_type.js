'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerType = sequelize.define('ServerType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cpu: DataTypes.STRING,
    ram: DataTypes.STRING,
    storage: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    size: DataTypes.STRING
  }, {
    tableName: 'ServerType',
    timestamps: true
  });
  ServerType.associate = function(models) {
    ServerType.hasMany(models.Servidor, { foreignKey: 'hardware' });
  };
  return ServerType;
};
