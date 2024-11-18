'use strict';
module.exports = (sequelize, DataTypes) => {
  const JuegoConfiguracion = sequelize.define('JuegoConfiguracion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_juego: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Juego',
        key: 'id'
      }
    },
    clave: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    tipo_dato: DataTypes.STRING,
    obligatorio: DataTypes.BOOLEAN,
    valor_default: DataTypes.STRING
  }, {
    tableName: 'JuegoConfiguracion',
    timestamps: true
  });
  JuegoConfiguracion.associate = function(models) {
    JuegoConfiguracion.belongsTo(models.Juego, { foreignKey: 'id_juego' });
    JuegoConfiguracion.hasMany(models.ServidorConfiguracion, { foreignKey: 'id_juego_configuracion' });
  };
  return JuegoConfiguracion;
};
