"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("JuegoConfiguracion", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_juego: {
        type: Sequelize.INTEGER,
        references: { model: "Juego", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clave: { type: Sequelize.STRING },
      descripcion: { type: Sequelize.TEXT },
      tipo_dato: { type: Sequelize.STRING },
      obligatorio: { type: Sequelize.BOOLEAN },
      valor_default: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("JuegoConfiguracion");
  },
};
