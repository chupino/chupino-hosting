const Joi = require('joi');

const loginSchema = Joi.object({
    token: Joi.string().required().messages({
        'string.empty': 'El token es requerido.',
    }),
})

module.exports = { loginSchema };