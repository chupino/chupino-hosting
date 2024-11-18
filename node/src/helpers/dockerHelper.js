const Docker = require('dockerode');
const db = require('../../models');

const resumeContainer = async (host, containerName, serverId) => {
    try {
        const docker = new Docker({
            protocol: 'http',
            host: host,
            port: 2375
        });

        const container = docker.getContainer(containerName);
        await container.start();
        await db.Servidor.update({ estado: 'Lanzando el servidor' }, {
            where: { id: serverId }
        });
        return { message: 'Contenedor reanudado exitosamente' };
    } catch (error) {
        throw new Error('Error al reanudar el contenedor: ' + error.message);
    }
}

const stopContainer = async (host, containerName, serverId) => {
    try {
        const docker = new Docker({
            protocol: 'http',
            host: host,
            port: 2375
        });

        const container = docker.getContainer(containerName);
        await container.stop();
        await db.Servidor.update({ estado: 'Detenido' }, {
            where: { id: serverId }
        });
        return { message: 'Contenedor detenido exitosamente' };
    } catch (error) {
        throw new Error('Error al detener el contenedor: ' + error.message);
    }
};

const checkServerStatus = async (host, containerName, keyword, serverId) => {
    try {
      const docker = new Docker({
        protocol: 'http',
        host: host,
        port: 2375
      });
  
      const container = docker.getContainer(containerName);
      const data = await container.inspect();

      let estado;
  
      // Comprobamos si el contenedor está corriendo
      if (data.State.Running) {

        estado = "Lanzando el servidor"
        console.log(`El contenedor ${containerName} está activo y en ejecución.`);
  
        // Ahora obtenemos los logs en tiempo real
        const logData = await container.logs({
          follow: false,  // Para obtener los logs en tiempo real
          stdout: true,  // Para salida estándar
          stderr: true   // Para errores
        });
  
        const logs = logData.toString();
        if (logs.includes(keyword)) {
          console.log(`Palabra clave encontrada en los logs: ${keyword}`);
          estado = "Listo para jugar"
        } else {
          console.log(`La palabra clave no fue encontrada en los logs.`);
        }
      } else {
        estado = "Detenido"
        console.log(`El contenedor ${containerName} está detenido.`);
      }
      await db.Servidor.update({ estado }, {
        where: { id: serverId }
    });
    return estado === "Listo para jugar";
    } catch (error) {
      console.error('Error al obtener el estado del contenedor:', error);
      await db.Servidor.update({ estado: 'Preparando' }, {
        where: { id: serverId }
    });
      return false;  // Si el contenedor no existe o hay otro error
    }
  };

const resetContainer = async (host, containerName, imageName, envArgs, portArgs) => {
    try {
        const docker = new Docker({
            protocol: 'http',
            host: host,
            port: 2375
        });

        const container = docker.getContainer(containerName);
        await container.stop();
        await container.remove();

        const env = envArgs.map(arg => {
            const [key, value] = arg.split('=');
            return { [key]: value };
        });

        const portBindings = {};
        const exposedPorts = {};
        portArgs.forEach(arg => {
            let containerPort, protocol;
            if (arg.includes('/')) {
                [containerPort, protocol] = arg.split('/');
            } else {
                containerPort = arg;
                protocol = 'tcp';
            }
            portBindings[`${containerPort}/${protocol}`] = [{ HostPort: containerPort }];
            exposedPorts[`${containerPort}/${protocol}`] = {};
        });

        console.log(portBindings);
        console.log(exposedPorts);

        const newContainer = await docker.createContainer({
            Image: imageName,
            name: containerName,
            Env: env,
            ExposedPorts: exposedPorts,
            HostConfig: {
                PortBindings: portBindings
            }
        });

        await newContainer.start();
        return { message: 'Contenedor reiniciado exitosamente' };
    } catch (error) {
        throw new Error('Error al reiniciar el contenedor: ' + error.message);
    }
};

module.exports = {
    resetContainer,
    checkServerStatus,
    resumeContainer,
    stopContainer
}