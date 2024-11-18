const db = require('../../models');

const getAllJuegos = async () => {
    try {
      const juegos =  await db.Juego.findAll({
        include: [
            {
                model: db.Puerto,
                as: 'puertos',
                attributes: ['puerto']
            }
        ]
      });
      return juegos.map(juego => {
        const puertos = juego.puertos ? juego.puertos.map(puerto => puerto.puerto) : [];
        return {
            ...juego.toJSON(),
            puertos
        };
    });
    } catch (error) {
      throw error;
    }
  };
  
module.exports = {
    getAllJuegos,
};