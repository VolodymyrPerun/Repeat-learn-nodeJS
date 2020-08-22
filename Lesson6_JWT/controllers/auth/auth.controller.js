const Joi = require('joi');

const {updateUserValidatorSchema} = require("../../validators");
const {requestHeadersEnum: {AUTHORIZATION}, responseStatusCodesEnum: {BAD_REQUEST}} = require('../../constants')
const {token_generator, checkHashPassword} = require('../../helpers')
const {ErrorHandler} = require('../../error')
const {authService, userService} = require('../../service')


module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const {error} = Joi.validate({email, password}, updateUserValidatorSchema);

            if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, 4041));

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(new ErrorHandler(BAD_REQUEST.message, 404, 4041)));
            }

            await checkHashPassword(password, user.password);

            const tokens = token_generator();

            await authService.createTokenPair({...tokens, userId: user.userId});

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res) => {

        const access_token = req.get(AUTHORIZATION)
        await authService.deleteTokenByParams({access_token})

        res.status(200)
    },


    getTokensByParams: async (req, res) => {

        try {
            const user = req.user
            res.json(user)

        } catch (e) {
            res.json(e)
        }

    },

    createTokenPair: async (req, res) => {
        try {
            const user = req.body;
            user.password = await checkHashPassword(user.password);

            await authService.createTokenPair(user);
        } catch (e) {
            res.json(e)
        }

        res.end()
    },


    deleteTokenByParams: async (req, res) => {
        try {
            const {userId} = req.params

            const isDeleted = await authService.deleteTokenByParams({userId})

            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            res.json(e)
        }

    }
}
