const jwt = require('jsonwebtoken');

const {jwtSecretKey} = require('../../config/config_dotenv')

const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, jwtSecretKey);
    return user;
} catch (error) {
    throw new Error('Token inválido');
}
}

const generateToken = (user) => {
  return jwt.sign(
    { uuid: user.uuid, nombres: user.nombres, correo: user.correo, avatarURL: user.avatarURL },
    jwtSecretKey,
    { expiresIn: '24h' }
  );
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Acceso no autorizado: falta el encabezado Authorization' });
    }
  
    const token = authHeader.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso no autorizado: falta el token' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };

module.exports = {
  generateToken,
  authenticateJWT,
  verifyToken
};