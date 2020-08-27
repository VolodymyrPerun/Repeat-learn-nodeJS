const authRouter = require('express').Router();

const {checkAccessTokenMiddleware} = require("../../middleware");
const {AuthController: {loginUser, logoutUser}} = require('../../controllers')



authRouter.post('/',checkAccessTokenMiddleware,  loginUser);
authRouter.post('/logout',checkAccessTokenMiddleware, logoutUser);

module.exports = authRouter
