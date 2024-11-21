const express = require("express");
const config = require("../config/config_dotenv");
const routes = require("./routes");
const db = require("../models");
const cors = require("cors");
const {uploadMinecraftFiles} = require('./utils/gamefileSettings')

const app = express();

app.use(express.json())
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
};

const localIp = getLocalIpAddress();
console.log(`Local IP Address: ${localIp}`);

// Configura CORS para permitir solicitudes desde cualquier origen
const corsOptions = {
  origin: `http://${localIp}`, // Permite solicitudes desde la IP local
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
