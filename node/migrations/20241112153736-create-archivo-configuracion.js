'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ArchivoConfiguracion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_juego: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Juego',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      template_file: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name_file: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination_host: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination_container_tmp:{
        type: Sequelize.STRING,
        allowNull: false
      },
      destination_container_final:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('ArchivoConfiguracion');
     
  }
};
