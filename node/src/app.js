const express = require("express");
const config = require("../config/config_dotenv");
const routes = require("./routes");
const db = require("../models");
const os = require('os');
const cors = require("cors");
const {uploadMinecraftFiles} = require('./utils/gamefileSettings')

const app = express();

app.use(express.json())
const getPublicIpAddress = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching public IP address:', error);
    return '127.0.0.1';
  }
};

const setupCors = async () => {
  const publicIp = await getPublicIpAddress();
  console.log(`Public IP Address: ${publicIp}`);

  const allowedOrigins = [
    `http://${publicIp}`,
    'http://localhost',
    'http://127.0.0.1'
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));

  // Middleware para manejar solicitudes preflight
  app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // Respuesta vacía para OPTIONS
  });
};


setupCors();


//Inicializando archivos de configuracion
uploadMinecraftFiles();


app.use("/api", routes);



db.sequelize.sync({}).then(() => {
  app.listen(config.appPort, () => {
    console.log(`Servidor escuchando en http://localhost:${config.appPort}`);
  });
});
