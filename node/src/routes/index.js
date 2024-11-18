const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;

    const routeName = file.split('.').slice(0, -1).join('.');
    
    const route = require(path.join(__dirname, file));
    
    router.use(`/${routeName}`, route);

    console.log(`Endpoint cargado: /${routeName}`);
});

module.exports = router;