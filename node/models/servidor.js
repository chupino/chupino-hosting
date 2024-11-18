'use strict';
module.exports = (sequelize, DataTypes) => {
  const Servidor = sequelize.define('Servidor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.STRING,
      references: {
        model: 'Usuario',
        key: 'uuid'
      }
    },
    id_juego: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Juego',
        key: 'id'
      }
    },
    hardware: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ServerType',
        key: 'id'
      }
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Empezando'
    },
    do_droplet_id: DataTypes.STRING,
    nombre: DataTypes.STRING
  }, {
    tableName: 'Servidor',
    timestamps: true
  });
  Servidor.associate = function(models) {
    Servidor.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    Servidor.belongsTo(models.Juego, { foreignKey: 'id_juego', as: 'juego' });
    Servidor.belongsTo(models.ServerType, { foreignKey: 'hardware', as: 'hardwareType' });
    Servidor.hasMany(models.ServidorConfiguracion, { foreignKey: 'id_servidor', as: 'configuraciones', onDelete: 'CASCADE' });
    Servidor.hasMany(models.ServerArchivoConfiguracion, { foreignKey: 'id_servidor', as: 'files', onDelete: 'CASCADE' });
  };
  return Servidor;
};
