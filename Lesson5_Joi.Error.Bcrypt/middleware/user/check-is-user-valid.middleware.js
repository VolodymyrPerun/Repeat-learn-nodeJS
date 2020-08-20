const Joi = require('joi');

const userValidationSchema = require('../../validators');
const {ErrorHandler} = require('../../error');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, userValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.status(400).json(e.message)
    }
}
