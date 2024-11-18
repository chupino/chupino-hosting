const { where } = require('sequelize');
const db = require('../../models');
const service = require('../services/doService');

const getAllServers = async (id) => {
    try {
      const servers =  await db.Servidor.findAll({
        where: {
            id_usuario: id
        },
        include: [
            {
                model: db.Juego,
                as: 'juego',
            },
            {
                model: db.ServerType,
                as: 'hardwareType'
            },
            {
                model: db.ServidorConfiguracion,
                as: 'configuraciones',
                attributes: ['id', 'valor', 'editable', 'id_juego_configuracion'],
                include: [
                    {
                        model: db.JuegoConfiguracion,
                        as: 'juego_configuracion',
                        attributes: ['clave', 'descripcion', 'tipo_dato', 'obligatorio', 'valor_default']
                    }
                ]
            }
        ]
      });
      return servers.map(server => {
        const configuraciones = server.configuraciones.map(config => ({
            id: config.id,
            valor: config.valor,
            editable: config.editable,
            id_juego_configuracion: config.id_juego_configuracion,
            clave: config.juego_configuracion.clave,
            descripcion: config.juego_configuracion.descripcion,
            tipo_dato: config.juego_configuracion.tipo_dato,
            obligatorio: config.juego_configuracion.obligatorio,
            valor_default: config.juego_configuracion.valor_default
        }));

        return {
            ...server.toJSON(),
            configuraciones
        };
    });
    } catch (error) {
      throw error;
    }
  };

const getServerById = async (id) => {
    try{
        const server = await db.Servidor.findOne({
            where: {
                id
            },
            include: [
                {
                    model: db.Juego,
                    as: 'juego',
                    include: [
                        {
                            model: db.Puerto,
                            as: 'puertos',
                            attributes: ['puerto'] 
                        }
                    ]
                },
                {
                    model: db.ServerType,
                    as: 'hardwareType'
                },
                {
                    model: db.ServidorConfiguracion,
                    as: 'configuraciones',
                    attributes: ['id', 'valor', 'editable', 'id_juego_configuracion'],
                    include: [
                        {
                            model: db.JuegoConfiguracion,
                            as: 'juego_configuracion',
                            attributes: ['clave', 'descripcion', 'tipo_dato', 'obligatorio', 'valor_default']
                        }
                    ]
                }
            ]
        });

        const serverData = server.toJSON();

        const dropletID = server.do_droplet_id;
        const droplet = await service.getDropletById(dropletID);

        const configuraciones = server.configuraciones.map(config => ({
            id: config.id,
            valor: config.valor,
            editable: config.editable,
            id_juego_configuracion: config.id_juego_configuracion,
            clave: config.juego_configuracion.clave,
            descripcion: config.juego_configuracion.descripcion,
            tipo_dato: config.juego_configuracion.tipo_dato,
            obligatorio: config.juego_configuracion.obligatorio,
            valor_default: config.juego_configuracion.valor_default
        }));

        serverData.juego.puertos = serverData.juego.puertos.map(puerto => puerto.puerto);


        return {
            ...serverData ,
            configuraciones,
            droplet
        };
    }catch(error){
        throw error;
    }
}

const createServer = async (serverData, envConfig, configFiles) => {
    try {
        const server = await db.Servidor.create(serverData);


        const gameDataArray = envConfig.map(configuracion => ({
            id_servidor: server.id,
            id_juego_configuracion: configuracion.id_configuracion,
            valor: configuracion.valor,
            editable: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        const serverConfigFile = configFiles.map(file => ({
            id_servidor: server.id,
            id_archivo_configuracion: file.id_archivo_configuracion,
            file: file.location,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        const game = await db.ServidorConfiguracion.bulkCreate(gameDataArray);
        const serverConfig = await db.ServerArchivoConfiguracion.bulkCreate(serverConfigFile);
        return { server, game, serverConfig };
    } catch (error) {
        throw error;
    }
};

const deleteServer = async (id) => {
    try {
        const server = await db.Servidor.findOne({
            where: {
                id
            }
        });

        if (server) {
            await db.Servidor.destroy({
                where: {
                    id
                }
            });
            return server;
        }
        return null;
    } catch (error) {
        throw error;
    }
};
  
module.exports = {
    getAllServers,
    createServer,
    getServerById,
    deleteServer
};