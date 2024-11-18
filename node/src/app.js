const express = require("express");
const config = require("../config/config_dotenv");
const routes = require("./routes");
const db = require("../models");
const cors = require("cors");
const {uploadMinecraftFiles} = require('./utils/gamefileSettings')

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*', // Permite todas las solicitudes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Manejo de solicitudes preflight
app.options('*', cors());

//Inicializando archivos de configuracion
uploadMinecraftFiles();


app.use("/api", routes);



db.sequelize.sync({}).then(() => {
  app.listen(config.appPort, () => {
    console.log(`Servidor escuchando en http://localhost:${config.appPort}`);
  });
});
