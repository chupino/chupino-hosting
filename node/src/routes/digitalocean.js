const express = require('express');
const router = express.Router();
const digitalOceanService = require('../services/doService');
const { validateParams, validateBody } = require('../../middlewares/validate');
const { createDropletSchema, deleteDropletSchema } = require('../validations/digitaloceanValidator');
const { authenticateJWT } = require('../utils/jwt');

router.delete('/delete-droplet/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await digitalOceanService.deleteDroplet(id);
        res.status(200).json({ message: 'Droplet borrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar el droplet', error: error.message });
    }
});

router.post('/create-droplet', authenticateJWT, validateBody(createDropletSchema), async (req, res) => {
    const { name, region, tipo_instancia } = req.body;

    try {
        const droplet = await digitalOceanService.createNewDroplet(name, region, tipo_instancia);
        res.status(201).json({ message: 'Droplet creado exitosamente', droplet });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el droplet', error: error.message });
    }
});

router.get('/list-droplets', authenticateJWT, async (req, res) => {
    try {
        const droplets = await digitalOceanService.listDroplets();
        res.status(200).json({ droplets });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de droplets', error: error.message });
    }
});


module.exports = router;