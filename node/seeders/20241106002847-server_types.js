'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ServerType', [
      {
        id:1,
        cpu: '1 CPU Basic',
        ram: '2 RAM',
        storage: '30gb',
        size:'s-1vcpu-2gb',
        imageURL: 'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/one-star.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        cpu: '2 CPU Basic',
        ram: '4 RAM',
        storage: '30gb',
        size:'s-2vcpu-4gb',
        imageURL: 'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/two-star.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        cpu: '4 CPU Basic',
        ram: '8 RAM',
        storage: '30gb',
        size:'s-4vcpu-8gb',
        imageURL: 'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/tri-star.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        cpu: '4 CPU AMD',
        ram: '8 RAM',
        storage: '30gb',
        size:'s-2vcpu-8gb-amd',
        imageURL: 'https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/static/images/tri-star.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ServerType', null, {});
  }
};
