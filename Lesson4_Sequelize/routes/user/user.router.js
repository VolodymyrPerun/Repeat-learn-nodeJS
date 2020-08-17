const userRouter = require('express').Router();

const {
    UserController: {
        createUser,
        getUsers,
        updateUser,
        deleteUser
    }
} = require('../../controllers');

const checkUserValidity = require('../../middleware/user/check-is-user-valid.middleware')

userRouter.post('/',
    // checkUserValidity,
    createUser);
userRouter.get('/',
    // checkUserValidity,
    getUsers)
userRouter.put('/', checkUserValidity, updateUser)
userRouter.delete('/:name', checkUserValidity, deleteUser)

module.exports = userRouter
