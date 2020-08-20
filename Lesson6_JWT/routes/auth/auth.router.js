const authRouter = require('express').Router();
const {AuthController} = require('../../controllers')



authRouter.post('/', AuthController.loginUser);


module.exports = authRouter
