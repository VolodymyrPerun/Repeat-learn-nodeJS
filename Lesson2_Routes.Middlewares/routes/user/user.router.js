const {Router} = require('express')

const userRouter = Router()

const {userController} = require('../../controllers')

userRouter.post('/', userController.createUser)

userRouter.get('/', userController.getAllUsers)

userRouter.put('/', userController.updateUser)

userRouter.delete('/:name', userController.deleteUser)


module.exports = userRouter
