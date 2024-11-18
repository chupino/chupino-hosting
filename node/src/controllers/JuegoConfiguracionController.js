const db = require('../../models');

const getAllJuegoConfiguracion = async () => {
    try {
      return await db.JuegoConfiguracion.findAll();
    } catch (error) {
      throw error;
    }
  };

const getJuegoConfiguracionByJuegoId = async (id) => {
  try {
    return await db.JuegoConfiguracion.findAll({
      where: {
        id_juego: id
      }
    });
  } catch (error) {
    throw error;
  }
};
  
module.exports = {
    getAllJuegoConfiguracion,
    getJuegoConfiguracionByJuegoId
};