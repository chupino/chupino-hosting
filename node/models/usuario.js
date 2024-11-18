'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombres: DataTypes.STRING,
    correo: DataTypes.STRING,
    avatarURL : DataTypes.STRING,
  }, {
    tableName: 'Usuario',
    timestamps: true
  });
  Usuario.associate = function(models) {
    Usuario.hasMany(models.Servidor, { foreignKey: 'id_usuario' });
  };
  return Usuario;
};
