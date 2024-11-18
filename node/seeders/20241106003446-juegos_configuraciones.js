'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JuegoConfiguracion', [
      {
        id_juego: 2,
        clave: 'ADMIN_PASSWORD',
        descripcion: 'Contraseña para el usuario admin',
        tipo_dato: 'string',
        obligatorio: true,
        valor_default: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JuegoConfiguracion', null, {});
  }
};
