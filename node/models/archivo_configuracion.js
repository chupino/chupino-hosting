"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArchivoConfiguracion = sequelize.define(
    "ArchivoConfiguracion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_juego: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Juegos", key: "id" },
      },
      template_file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination_host: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination_container_tmp:{
        type: DataTypes.STRING,
        allowNull: false
      },
      destination_container_final:{
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: "ArchivoConfiguracion",
      timestamps: true,
    }
  );
  ArchivoConfiguracion.associate = function (models) {
    ArchivoConfiguracion.belongsTo(models.Juego, {
      foreignKey: "id_juego",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return ArchivoConfiguracion;
};
