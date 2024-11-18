'use strict';

const { up } = require('../migrations/20241105231410-create-server_types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ArchivoConfiguracion', [
      {
        id_juego: 1,
        template_file: 'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/game_settings_files/1/server.properties',
        name_file: 'server.properties',
        destination_host: '/server/config',
        destination_container_tmp: '/tmp/config/server',
        destination_container_final: '/app/server',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ArchivoConfiguracion', null, {});
  }
};
