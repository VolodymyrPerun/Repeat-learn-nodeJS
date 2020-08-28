const authRouter = require('express').Router();

const {checkAccessTokenMiddleware} = require("../../middleware");
const {AuthController: {loginUser, logoutUser, refreshToken}} = require('../../controllers')



authRouter.post('/',checkAccessTokenMiddleware,  loginUser);
authRouter.post('/logout',checkAccessTokenMiddleware, logoutUser);
authRouter.post('/refresh', refreshToken);

module.exports = authRouter
