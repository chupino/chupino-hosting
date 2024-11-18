// src/helpers/digitalOceanHelper.js
const axios = require('axios');
const config = require('../../config/config_dotenv');

const digitalOceanApiUrl = 'https://api.digitalocean.com/v2';

const doAxiosInstance = axios.create({
    baseURL: digitalOceanApiUrl,
    headers: {
        Authorization: `Bearer ${config.doApiToken}`,
        'Content-Type': 'application/json',
    },
});

const createDroplet = async (name, region, size) => {
    try {
        const user_data =`#cloud-config
runcmd:
  - apt-get -y update
  - apt-get install -y docker.io
  - docker pull node`;
        const response = await doAxiosInstance.post('/droplets', {
            name,
            region,
            size,
            image: config.doImage,
            user_data: user_data,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

const deleteDroplet = async (id) => {
    try {
        const response = await doAxiosInstance.delete(`droplets/${id}`)
        return response.data
    }catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

const listDroplets = async () => {
    try {
        const response = await doAxiosInstance.get('/droplets');
        return response.data.droplets; 
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
}

module.exports = {
    listDroplets,
    createDroplet,
    deleteDroplet
};