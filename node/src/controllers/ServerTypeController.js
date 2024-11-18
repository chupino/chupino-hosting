const db = require('../../models');

const getAllServerType = async () => {
    try {
      return await db.ServerType.findAll();
    } catch (error) {
      throw error;
    }
  };

const getServerTypeByGameId = async (gameId) => {
  try{
    const juego = await db.Juego.findOne({
      where: { id: gameId },
      attributes: ['min_hardware', 'st_hardware', 'high_hardware']
  });

  if (!juego) {
      throw new Error('Juego no encontrado');
  }

  const serverTypes = await db.ServerType.findAll({
      where: {
          id: [juego.min_hardware, juego.st_hardware, juego.high_hardware]
      }
  });

  return serverTypes;
  }catch(error){
    throw error;
  }
}
  
module.exports = {
    getAllServerType,
    getServerTypeByGameId
};