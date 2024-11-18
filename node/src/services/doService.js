// src/services/digitalOceanService.js
const digitalOceanHelper = require('../helpers/doHelper');
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

const listBlockStorage = async () => {
    try {
        const response = await doAxiosInstance.get('/volumes');
        return response.data.volumes;
    } catch (error) {
        throw new Error('Error al obtener la lista de bloques de almacenamiento: ' + error.message);
    }
}

const deleteDroplet = async (id) => {
    return await digitalOceanHelper.deleteDroplet(id);
}

const createNewDroplet2 = async (dropletName, region,docker_image ,size, configEnv, puertos, configFiles) => {
    try{
        const envArgs = configEnv.map(item => `-e ${item.clave}=${item.valor}`).join(' ');
        const portArgs = puertos.map(port => {
            const [containerPort, protocol = 'tcp'] = port.split('/');
            return `-p ${containerPort}:${containerPort}/${protocol}`;
        }).join(' ');
        const mkdirCommands = configFiles.map(file => {
            const dir = file.destination_host;
            return `- mkdir -p ${dir}`;
        }).join('\n  ');

        const wgetCommands = configFiles.map(file => {
            const dir = file.destination_host;
            return `- wget -P ${dir} ${file.location}`;
        }).join('\n  ');

        const volumeSet = new Set();
        configFiles.forEach(file => {
            volumeSet.add(`${file.destination_host}:${file.destination_container_tmp}`);
        });

        const volumeArgs = Array.from(volumeSet).map(volume => `-v ${volume}`).join(' ');

        const user_data =`#cloud-config
        runcmd:
          - apt-get -y update
          - apt-get install -y docker.io
          - sudo sed -i 's|ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/|ExecStart=/usr/bin/dockerd -H fd:// --host=tcp://0.0.0.0:2375 --containerd=/run/containerd/|' /lib/systemd/system/docker.service
          - sudo systemctl daemon-reload
          - sudo systemctl restart docker
          ${mkdirCommands}
          ${wgetCommands}
          - docker pull ${docker_image}
          - docker run -d --name ${dropletName} ${portArgs} ${envArgs} ${volumeArgs} ${docker_image}`;
        console.log(user_data);
        const response = await doAxiosInstance.post('/droplets', {
            name: dropletName,
            region,
            size: size,
            image: config.doImage,
            user_data: user_data,
        });
        return response.data;
    }catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

const createNewDroplet = async (dropletName, region, tipoInstancia) => {
    const size = instanceTypes[tipoInstancia];

    if (!size) {
        throw new Error(`El tipo de instancia ${tipoInstancia} no es válido.`);
    }

    return await digitalOceanHelper.createDroplet(dropletName, region, size);
};

const listDroplets = async  () => {
    try {
        return await digitalOceanHelper.listDroplets();
    } catch (error) {
        throw new Error('Error al obtener la lista de droplets: ' + error.message);
    }
}

const getDropletById = async (id) => {
    try {
        const response = await doAxiosInstance.get(`/droplets/${id}`);
        const droplet = response.data.droplet;
        const dropletData = {
            id: droplet.id,
            name: droplet.name,
            memory: droplet.memory,
            vcpus: droplet.vcpus,
            disk: droplet.disk,
            status: droplet.status,
            created_at: droplet.created_at,
            ip_address: droplet.networks.v4.find(net => net.type === 'public')?.ip_address,
            region: droplet.region.name,
            image: droplet.image.name,
            size: droplet.size.slug
        };

        return dropletData;
    } catch (error) {
        throw new Error('Error al obtener el droplet: '+ id +', '+error.message);
    }
}

module.exports = {
    listBlockStorage,
    listDroplets,
    createNewDroplet,
    createNewDroplet2,
    deleteDroplet,
    getDropletById
};