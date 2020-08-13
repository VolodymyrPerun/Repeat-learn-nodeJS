const userRouter = require('express').Router();

const {
    UserController: {
        registerUser,
        getAllUsers,
        updateUser,
        deleteUser
    }
} = require('../../controllers');

const checkUserValidity = require('../../middleware/user/check-is-user-valid.middleware')

userRouter.post('/', checkUserValidity, registerUser);
userRouter.get('/', checkUserValidity, getAllUsers)
userRouter.put('/', checkUserValidity, updateUser)
userRouter.delete('/:name', checkUserValidity, deleteUser)

module.exports = userRouter
