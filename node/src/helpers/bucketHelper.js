const axios = require('axios');
const { parseConfigFile } = require('./formatHelper');

const getJsonConfigTemplateGame = async (configFileURL) => {
    const response = await axios.get(configFileURL);
    const configRequirements = parseConfigFile(response.data);
    return configRequirements;
}

const generateFileContentByFields = (fields, separator) => {
    return fields.map(field => `${field.key}${separator}${field.value}`).join('\n');
};

module.exports = {
    getJsonConfigTemplateGame,
    generateFileContentByFields
}