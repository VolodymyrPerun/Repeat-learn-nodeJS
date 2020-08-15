const notFoundRouter = require('express').Router();

const {notFoundController} = require('../../controllers')

notFoundRouter.use('/', notFoundController)

module.exports = notFoundRouter
