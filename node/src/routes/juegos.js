const express = require("express");
const router = express.Router();
const juegoController = require("../controllers/JuegoController");
const juegoConfiguracionController = require("../controllers/JuegoConfiguracionController");
const archivoConfiguracionController = require("../controllers/ArchivoConfiguracionController");
const { authenticateJWT } = require("../utils/jwt");
const bucketHelper = require("../helpers/bucketHelper");

const responseFormatter = require("../../middlewares/responseFormatter");

router.use(responseFormatter);

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const juegos = await juegoController.getAllJuegos();
    res.status(200).json(juegos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la lista de juegos",
        error: error.message,
      });
  }
});

router.get("/configuraciones/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const env_configuraciones =
      await juegoConfiguracionController.getJuegoConfiguracionByJuegoId(id);
    
    const files_configuraciones = await archivoConfiguracionController.getAllArchivoConfiguracionByJuegoId(id);

    const filesWithFields = await Promise.all(files_configuraciones.map(async (file) => {
        const fields = await bucketHelper.getJsonConfigTemplateGame(file.template_file);
        return {
            ...file.toJSON(),
            fields
        };
    }));

    res.status(200).json({
        env: env_configuraciones,
        files: filesWithFields
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener la configuración del juego",
        error: error.message,
      });
  }
});

module.exports = router;
