const Joi = require('joi');

const {updateUserValidatorSchema} = require('../../validators');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const {name, age} = req.body;

        const {error} = Joi.validate({name, age}, updateUserValidatorSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }
}
