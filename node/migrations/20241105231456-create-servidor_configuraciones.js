"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ServidorConfiguracion", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_servidor: {
        type: Sequelize.INTEGER,
        references: { model: "Servidor", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_juego_configuracion: {
        type: Sequelize.INTEGER,
        references: { model: "JuegoConfiguracion", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      valor: { type: Sequelize.STRING },
      editable: { type: Sequelize.BOOLEAN },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ServidorConfiguracion");
  },
};
