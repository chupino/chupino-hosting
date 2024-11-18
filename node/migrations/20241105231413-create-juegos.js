"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Juego", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: { type: Sequelize.STRING },
      descripcion: { type: Sequelize.TEXT },
      min_hardware: {
        type: Sequelize.INTEGER,
        references: { model: "ServerType", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      st_hardware: {
        type: Sequelize.INTEGER,
        references: { model: "ServerType", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      high_hardware: {
        type: Sequelize.INTEGER,
        references: { model: "ServerType", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      docker_image: { type: Sequelize.STRING },
      imageURL: {
        type: Sequelize.STRING,
      },
      activationKeyword: {
        type: Sequelize.STRING,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Juego");
  },
};
