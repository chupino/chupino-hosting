'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ServerArchivoConfiguracion', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_servidor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Servidor',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_archivo_configuracion: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ArchivoConfiguracion',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ServerArchivoConfiguracion');
  }
};
