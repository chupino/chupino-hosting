"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario", {
      uuid: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      nombres: { type: Sequelize.STRING },
      correo: { type: Sequelize.STRING },
      avatarURL: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Usuario");
  },
};
