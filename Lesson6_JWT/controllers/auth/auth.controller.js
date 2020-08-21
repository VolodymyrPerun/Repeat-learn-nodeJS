const {authService, userService} = require("../../service");
const {hashPassword, checkHashPassword, token_generator} = require('../../helpers')
const ErrorHandler = require("../../error/ErrorHandler")
const {headersEnum: {AUTHORIZATION}} = require("../../constants")


module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('Unable to find user', 404, 4041));
            }

            await checkHashPassword(user.password, password);

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

    },


    getTokenByParams: async (req, res) => {

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
            user.password = await hashPassword(user.password);

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
