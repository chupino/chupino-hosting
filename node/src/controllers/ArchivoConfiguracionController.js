const db = require('../../models');

const getAllArchivoConfiguracionByJuegoId = async (id) => {
    try {
        return await db.ArchivoConfiguracion.findAll({
            where: {
                id_juego: id
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { getAllArchivoConfiguracionByJuegoId };