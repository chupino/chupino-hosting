'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServidorConfiguracion = sequelize.define('ServidorConfiguracion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_servidor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Servidor',
        key: 'id'
      }
    },
    id_juego_configuracion: {
      type: DataTypes.INTEGER,
      references: {
        model: 'JuegoConfiguracion',
        key: 'id'
      }
    },
    valor: DataTypes.STRING,
    editable: DataTypes.BOOLEAN
  }, {
    tableName: 'ServidorConfiguracion',
    timestamps: true
  });
  ServidorConfiguracion.associate = function(models) {
    ServidorConfiguracion.belongsTo(models.Servidor, { foreignKey: 'id_servidor' });
    ServidorConfiguracion.belongsTo(models.JuegoConfiguracion, { foreignKey: 'id_juego_configuracion', as: 'juego_configuracion' });
  };
  return ServidorConfiguracion;
};
