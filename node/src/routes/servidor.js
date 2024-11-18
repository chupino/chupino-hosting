const express = require("express");
const router = express.Router();
const { authenticateJWT, verifyToken } = require("../utils/jwt");
const { validateBody } = require("../../middlewares/validate");
const juegoController = require("../controllers/JuegoController");
const serverTypeController = require("../controllers/ServerTypeController");
const serverController = require("../controllers/ServerController");
const juegoConfiguracionController = require("../controllers/JuegoConfiguracionController");
const { createServerSchema, statusSchema, containerPlayerSchema } = require("../validations/serverValidator");
const { resetContainer, checkServerStatus, resumeContainer, stopContainer } = require("../helpers/dockerHelper")

const digitalOceanService = require("../services/doService");
const bucketService = require("../services/bucketService");

const {generateFileContentByFields} = require("../helpers/bucketHelper")

const responseFormatter = require("../../middlewares/responseFormatter");


router.use(responseFormatter);


router.get("/", authenticateJWT, async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = verifyToken(token);
        const servers = await serverController.getAllServers(user.uuid);
        res.status(200).json(servers);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error al obtener la lista de servers", error: error.message });
    }
});

router.post("/resume/:id", authenticateJWT, validateBody(containerPlayerSchema),async (req, res) => {
  try {
      const { id } = req.params;
      const {
        droplet_ip_address,
        server_name,
      } = req.body;
      await resumeContainer(droplet_ip_address, server_name, id);
      res.status(200).json({ message: "Server reanudado exitosamente" });
  } catch (error) {
      res
      .status(500)
      .json({ message: "Error al detener el server", error: error.message });
  }
})

router.post("/stop/:id", authenticateJWT, validateBody(containerPlayerSchema),async (req, res) => {
    try {
        const { id } = req.params;
        const {
          droplet_ip_address,
          server_name,
        } = req.body;
        await stopContainer(droplet_ip_address, server_name, id);
        res.status(200).json({ message: "Server detenido exitosamente" });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error al detener el server", error: error.message });
    }
})

router.post("/status/:id", authenticateJWT,validateBody(statusSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      droplet_ip_address,
      server_name,
      keyword
    } = req.body;
    const status = await checkServerStatus(droplet_ip_address, server_name, keyword, id)
    res.status(200).json(status);
  } catch (error) {
    res
    .status(500)
    .json({ message: "Error al obtener el estado del server", error: error.message });
  }
})

router.post("/reset/:id", authenticateJWT, async (req, res) => {
  try{
    const { id } = req.params;
    const server = await serverController.getServerById(id);
    const droplet = await digitalOceanService.getDropletById(server.do_droplet_id);
    const container = await resetContainer(droplet.ip_address, server.nombre,server.juego.docker_image ,server.configuraciones, server.juego.puertos);
    res.status(200).json({message: "Server detenido exitosamente"});
  }catch(error){
    res
    .status(500)
    .json({ message: "Error al detener el server", error: error.message });
  }
})

router.delete("/:id", authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const server = await serverController.getServerById(id);
        await digitalOceanService.deleteDroplet(server.do_droplet_id);
        await serverController.deleteServer(id);
        res.status(200).json({ message: "Server eliminado exitosamente" });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error al eliminar el server", error: error.message });
    }
})

router.get("/types/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const serverTypes = await serverTypeController.getServerTypeByGameId(id);
    res.status(200).json(serverTypes);
  }
  catch (error) {
    res
    .status(500)
    .json({
      message: "Error al crear dar informacion de tipos de servidor",
      error: error.message,
    });
  }
});

router.get("/:id", authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const server = await serverController.getServerById(id);
        res.status(200).json(server);
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error al obtener el server", error: error.message });
    }
})


router.post(
  "/create",
  authenticateJWT,
  validateBody(createServerSchema),
  async (req, res) => {
    try {
      const {
        id_juego,
        docker_image,
        size,
        storage,
        id_hardware,
        configuraciones,
        nombre_servidor,
        puertos,
    } = req.body;
      const token = req.header('Authorization').replace('Bearer ', '');
      const user = verifyToken(token);
      const path = `server_settings_files/${user.uuid}/${nombre_servidor}`
      const uploadPromises = configuraciones.files.map(async (file) => {
        const contentFile = generateFileContentByFields(file.fields, "=");
        const uploadedFile = await bucketService.uploadFile(file.name_file, contentFile, path);
        return {
          destination_host: file.destination_host,
          destination_container_tmp: file.destination_container_tmp,
          destination_container_final: file.destination_container_final,
          id_archivo_configuracion: file.id_archivo_configuracion,
          location: uploadedFile
        }
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const droplet = await digitalOceanService.createNewDroplet2(
        nombre_servidor,
        "nyc1",
        docker_image,
        size,
        configuraciones.env,
        puertos,
        uploadedFiles
      );

      const serverCreateData = {
        id_usuario: user.uuid,
        id_juego: id_juego,
        hardware: id_hardware,
        do_droplet_id: droplet.droplet.id,
        nombre: nombre_servidor,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const serverCreated = await serverController.createServer(serverCreateData, configuraciones.env, uploadedFiles)

      res.status(201).json("Server creado exitosamente", droplet);

    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el server", error: error.message });
    }
  }
);

module.exports = router;
