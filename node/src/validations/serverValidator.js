const Joi = require("joi");

const containerPlayerSchema = Joi.object({
  droplet_ip_address: Joi.string().required().messages({
    "string.empty": "La dirección IP del droplet es requerida.",
  }),
  server_name: Joi.string().required().messages({
    "string.empty": "El nombre del servidor es requerido.",
  }),
});

const statusSchema = Joi.object({
  droplet_ip_address: Joi.string().required().messages({
    "string.empty": "La dirección IP del droplet es requerida.",
  }),
  server_name: Joi.string().required().messages({
    "string.empty": "El nombre del servidor es requerido.",
  }),
  keyword: Joi.string().required().messages({
    "string.empty": "La palabra clave es requerida.",
  }),
});

const fieldSchema = Joi.object({
  key: Joi.string().required().messages({
    "string.empty": "La clave es requerida.",
  }),
  value: Joi.string().allow("").required().messages({
    "string.empty": "El valor es requerido.",
  }),
});

const envSchema = Joi.object({
  clave: Joi.string().required().messages({
    "string.empty": "La clave es requerida.",
  }),
  valor: Joi.string().required().messages({
    "string.empty": "El valor es requerido.",
  }),
  id_configuracion: Joi.number().required().messages({
    "number.empty": "El id de la configuración es requerido.",
  }),
});

const fileSchema = Joi.object({
  name_file: Joi.string().required().messages({
    "string.empty": "El nombre del archivo es requerido.",
  }),
  destination_host: Joi.string().required().messages({
    "string.empty": "La ruta del destino es requerida.",
  }),
  destination_container_tmp: Joi.string().required().messages({
    "string.empty": "La ruta del destino es requerida.",
  }),
  destination_container_final: Joi.string().required().messages({
    "string.empty": "La ruta del destino es requerida.",
  }),
  id_archivo_configuracion: Joi.number().required().messages({
    "number.empty": "El id del archivo de configuración es requerido.",
  }),
  fields: Joi.array().items(fieldSchema).required().messages({
    "array.base": "Fields debe ser un array de objetos.",
    "any.required": "Fields es requerido.",
  }),
});

const configuracionesSchema = Joi.object({
  env: Joi.array().items(envSchema).required().messages({
    "array.base": "Env debe ser un array de objetos.",
    "any.required": "Env es requerido.",
  }),
  files: Joi.array().items(fileSchema).required().messages({
    "array.base": "Files debe ser un array de objetos.",
    "any.required": "Files es requerido.",
  }),
});

const createServerSchema = Joi.object({
  id_juego: Joi.number().required().messages({
    "number.empty": "El id del juego es requerido.",
  }),
  docker_image: Joi.string().required().messages({
    "string.empty": "La imagen de docker es requerida.",
  }),
  size: Joi.string().required().messages({
    "string.empty": "El tamaño de la instancia es requerida",
  }),
  storage: Joi.string().required().messages({
    "string.empty": "La cantidad de almacenamiento es requerida.",
  }),
  id_hardware: Joi.number().required().messages({
    "number.empty": "El id del hardware es requerido.",
  }),
  puertos: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Los puertos deben ser un array de strings.",
      "any.required": "Los puertos son requeridos.",
      "array.min": "Debe haber al menos un puerto.",
    }),
  configuraciones: configuracionesSchema.required().messages({
    "object.base": "Configuraciones debe ser un objeto con env y files.",
    "any.required": "Configuraciones es requerido.",
  }),
  nombre_servidor: Joi.string().required().messages({
    "string.empty": "El nombre del servidor es requerido.",
  }),
});

module.exports = { 
    containerPlayerSchema, 
    statusSchema, 
    createServerSchema 
};
