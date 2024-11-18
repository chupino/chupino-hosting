const express = require("express");
const config = require("../config/config_dotenv");
const routes = require("./routes");
const db = require("../models");
const cors = require("cors");
const {uploadMinecraftFiles} = require('./utils/gamefileSettings')

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Middleware para manejar solicitudes preflight
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204); // Respuesta vacía para OPTIONS
});

//Inicializando archivos de configuracion
uploadMinecraftFiles();


app.use("/api", routes);



db.sequelize.sync({}).then(() => {
  app.listen(config.appPort, () => {
    console.log(`Servidor escuchando en http://localhost:${config.appPort}`);
  });
});
