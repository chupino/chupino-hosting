"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Puerto",
      [
        {
          id_juego: 1,
          puerto: "25565",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_juego: 2,
          puerto: "8766/udp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_juego: 2,
          puerto: "16261/udp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_juego: 2,
          puerto: "16262/udp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Puerto", null, {});
  },
};
