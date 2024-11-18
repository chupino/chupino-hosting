'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Juego', [
      {
        id: 1,
        nombre: 'Minecraft',
        descripcion: 'Juego de cubitos',
        min_hardware: 1,
        st_hardware: 2,
        high_hardware: 3,
        docker_image: 'chupin0/minecraft-server:1.5',
        imageURL:'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/minecraft-logo.png',
        activationKeyword: 'Done',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Project Zomboid',
        descripcion: 'Juego de supervivencia zombies',
        docker_image: 'chupin0/project-zomboid-server:1.0',
        min_hardware: 2,
        st_hardware: 3,
        high_hardware: 4,
        imageURL:'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/pz-logo.png',
        activationKeyword: 'SERVER STARTED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Juego', null, {});
  }
};
