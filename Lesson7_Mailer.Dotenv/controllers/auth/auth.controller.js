const Joi = require('joi');

const {updateUserValidatorSchema} = require("../../validators");
const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {BAD_REQUEST, NOT_FOUND: NOT_FOUND_CODE, OK},
    responseCustomError: {NOT_VALID, NOT_FOUND}
} = require('../../constants')
const {tokenGeneratorHelpers, checkHashPasswordHelpers} = require('../../helpers')
const {ErrorHandler} = require('../../error')
const {authService, userService} = require('../../service')


module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const {error} = Joi.validate({email, password}, updateUserValidatorSchema);

            if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)));
            }

            await checkHashPasswordHelpers(password, user.password);

            const tokens = tokenGeneratorHelpers();

            await authService.createTokenPair({...tokens, userId: user.userId});

            res.json(tokens);
        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION)
            await authService.deleteTokenByParams({access_token})

            res.sendStatus(OK)
        } catch (e) {
            next(e)
        }
    },


    getTokensByParams: async (req, res) => {

        try {
            const user = req.user
            res.json(user)

        } catch (e) {
            res.json(e)
        }

    },

    createTokenPair: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = await checkHashPasswordHelpers(user.password);

            await authService.createTokenPair(user);
        } catch (e) {
            next(e)
        }

        res.end()
    },


    deleteTokenByParams: async (req, res, next) => {
        try {
            const {userId} = req.params

            const isDeleted = await authService.deleteTokenByParams({userId})

            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            next(e)
        }

    },


    refreshToken: async (req, res, next) => {
        try {

            const refresh_token = req.get(AUTHORIZATION)
            const userId = req.userId

            const user = await userService.getUserById(userId)

            if (!user) {
                return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)))
            }

            const tokens = tokenGeneratorHelpers()

            await authService.deleteTokenByParams({refresh_token})
            await authService.createTokenPair({...tokens, userId: user.userId})

            res.json(tokens)
        } catch (e) {
            next(e)
        }

    }
}
