'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = { 
  up: async (queryInterface, Sequelize) => { 
    await queryInterface.createTable('Puerto', { 
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
      puerto: { 
        type: Sequelize.STRING, 
        allowNull: false 
      }, 
      createdAt: { 
        allowNull: false, 
        type: Sequelize.DATE 
      }, 
      updatedAt: { 
        allowNull: false, 
        type: Sequelize.DATE 
      } 
    }); 
  }, 
  down: async (queryInterface, Sequelize) => { 
    await queryInterface.dropTable('Puerto');
  }
};