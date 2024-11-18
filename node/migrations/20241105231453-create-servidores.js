"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Servidor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.STRING,
        references: { model: "Usuario", key: "uuid" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_juego: {
        type: Sequelize.INTEGER,
        references: { model: "Juego", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hardware: {
        type: Sequelize.INTEGER,
        references: { model: "ServerType", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      do_droplet_id: { type: Sequelize.STRING },
      nombre: { type: Sequelize.STRING },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Empezando'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Servidor");
  },
};
