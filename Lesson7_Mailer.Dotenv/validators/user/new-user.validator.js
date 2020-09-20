const Joi = require('joi')


const {regexpEmailEnum, regexpPasswordEnum} = require('../../constants')

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).required().allow('X Æ A-12'),
    surname: Joi.string().trim().alphanum().min(2).max(60).required().allow('X Æ A-12'),
    email: Joi.string().regex(regexpEmailEnum.EMAIL).required(),
    password: Joi.string().regex(regexpPasswordEnum.PASSWORD).trim().min(8).required(),
    age: Joi.number().integer().min(18).max(120).required(),
    // description: Joi.string().optional().allow(null, ''),
    // cars: Joi.array().items(
    //     Joi.object().keys({
    //         name: Joi.string()
    //     })
    // ).optional()
})
