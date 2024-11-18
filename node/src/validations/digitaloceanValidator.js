const Joi = require('joi');

const createDropletSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'El nombre del droplet es requerido.',
    }),
    region: Joi.string().required().messages({
        'string.empty': 'La región es requerida.',
    }),
    tipo_instancia: Joi.string().valid('v1', 'v2', 'v3').required().messages({
        'any.only': 'El tipo de instancia debe ser v1, v2 o v3.',
        'string.empty': 'El tipo de instancia es requerido.',
    }),
});

const deleteDropletSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.empty': 'El id del droplet es requerido.',
    }),
});

module.exports = { createDropletSchema, deleteDropletSchema };