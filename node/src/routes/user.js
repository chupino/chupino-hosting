const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const controller = require('../controllers/UserController');
const { validateBody } = require('../../middlewares/validate');
const { loginSchema } = require('../validations/userValidator');
const { authenticateJWT } = require('../utils/jwt');
const {jwtSecretKey} = require('../../config/config_dotenv')

const responseFormatter = require('../../middlewares/responseFormatter');

router.use(responseFormatter);

router.post('/login', validateBody(loginSchema),async (req, res) => {
    try {
        const { token } = req.body;
        const user = await controller.loginWithGoogle(token);
        res.status(200).json( user );
    } catch (error) {
        res.status(400).json({ message: 'Error al hacer login', error: error.message });
    }
})

router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = jwt.verify(token, jwtSecretKey);
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
    }
})

module.exports = router;