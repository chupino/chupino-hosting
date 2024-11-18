const fs = require('fs').promises;
const {uploadFile} = require('../services/bucketService')
const uploadMinecraftFiles = async () => {
    try{
        const serverproperties = '../../config/gamefiles/server.properties';
        const serverpropertiesContent = await fs.readFile(serverproperties, 'utf8');
        
        const fileUploaded = await uploadFile("server.properties",serverpropertiesContent,"game_settings_files/1")
        console.log("Archivos de minecraft subidos")
    }catch(err){
        throw err;
    }
}

module.exports ={
    uploadMinecraftFiles
}