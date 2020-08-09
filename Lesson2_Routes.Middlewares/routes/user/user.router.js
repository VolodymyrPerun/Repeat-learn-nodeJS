const {Router} = require('express')

const userRouter = Router()

const {userController} = require('../../controllers')


userRouter.get('/', userController.getAllUsers)

userRouter.post('/', userController.createUser)

userRouter.put('/', userController.updateUser)

userRouter.delete('/:name', userController.deleteUser)


module.exports = userRouter
