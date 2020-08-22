const authRouter = require('express').Router();

const {checkAccessToken} = require("../../middleware");
const {AuthController: {loginUser, logoutUser}} = require('../../controllers')



authRouter.post('/',checkAccessToken,  loginUser);
authRouter.post('/logout',checkAccessToken, logoutUser);

module.exports = authRouter
