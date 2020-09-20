const authRouter = require('express').Router();

const {
    authMiddleware:
        {
            checkAccessTokenMiddleware,
            checkRefreshTokenMiddleware
        }
} = require("../../middleware");
const {AuthController: {loginUser, logoutUser, refreshToken}} = require('../../controllers')


authRouter.post('/', loginUser);
authRouter.post('/logout', checkAccessTokenMiddleware, logoutUser);
authRouter.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

module.exports = authRouter
