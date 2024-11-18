'use strict';
module.exports = (sequelize, DataTypes) => {
  const Juego = sequelize.define('Juego', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    docker_image: DataTypes.STRING,
    min_hardware: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    st_hardware: DataTypes.INTEGER,
    high_hardware: DataTypes.INTEGER,
    activationKeyword: DataTypes.STRING,
  }, {
    tableName: 'Juego',
    timestamps: true
  });
  Juego.associate = function(models) {
    Juego.hasMany(models.JuegoConfiguracion, { foreignKey: 'id_juego' });
    Juego.hasMany(models.Servidor, { foreignKey: 'id_juego' });
    Juego.hasMany(models.Puerto, { foreignKey: 'id_juego', as: 'puertos'});
  };
  return Juego;
};
