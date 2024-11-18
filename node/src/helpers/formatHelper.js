const parseConfigFile = (fileContent) => {
    const lines = fileContent.split('\n');
    const configRequirements = [];
    let currentDescription = '';
  
    lines.forEach((line) => {
      line = line.trim();
      
      if (line.startsWith('#')) {
        // Si la línea es un comentario, guarda la línea sin el carácter '#'
        currentDescription += line.slice(1).trim() + ' ';
      } else if (line && line.includes('=')) {
        // Si la línea contiene una clave=valor
        const [key, value] = line.split('=').map(part => part.trim());
        let type = 'string';
        let defaultValue = value;

        // Verificar si el valor está vacío
        if (value === '') {
          type = 'string';
          defaultValue = '';
        } else {
          // Infiriendo el tipo de dato según el valor
          if (value === 'true' || value === 'false') {
            type = 'boolean';
            defaultValue = value === 'true';
          } else if (!isNaN(value)) {
            type = 'number';
            defaultValue = Number(value);
          }
        }

        configRequirements.push({
          clave: key,
          type: type,
          default_value: defaultValue,
          descripcion: currentDescription.trim()
        });

        // Reiniciar la descripción actual
        currentDescription = '';
      }
    });

    return configRequirements;
};

module.exports = {
    parseConfigFile
};