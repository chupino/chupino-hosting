"use strict";
module.exports = (sequelize, DataTypes) => {
  const ServerArchivoConfiguracion = sequelize.define(
    "ServerArchivoConfiguracion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_servidor: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Servidor',
          key: 'id'
        }
      },
      id_archivo_configuracion: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ArchivoConfiguracion',
          key: 'id'
        }
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "ServerArchivoConfiguracion",
      timestamps: true,
    }
  );
  ServerArchivoConfiguracion.associate = function(models) {
    ServerArchivoConfiguracion.belongsTo(models.Servidor, { foreignKey: 'id_servidor' });
    ServerArchivoConfiguracion.belongsTo(models.ArchivoConfiguracion, { foreignKey: 'id_archivo_configuracion', as: 'juego_configuracion' });
  };
  return ServerArchivoConfiguracion;
};
