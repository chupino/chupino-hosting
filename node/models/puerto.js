"use strict";
module.exports = (sequelize, DataTypes) => {
  const Puerto = sequelize.define(
    "Puerto",
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
      puerto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Puerto",
      timestamps: true,
    }
  );
  Puerto.associate = function (models) {
    Puerto.belongsTo(models.Juego, {
      foreignKey: "id_juego",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Puerto;
};
