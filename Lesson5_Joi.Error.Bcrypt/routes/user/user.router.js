const userRouter = require('express').Router();
const {checkIsUserExist, checkUserValidity} = require('../../middleware')

const {
    UserController: {
        createUser,
        loginUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUserByParams
    }
} = require('../../controllers');


userRouter.post('/', createUser);
userRouter.post('/auth', loginUser);
userRouter.get('/', getUsers)
userRouter.get('/:userId', checkIsUserExist, getUserById)
userRouter.put('/:userId', checkIsUserExist, checkUserValidity, updateUser)
userRouter.delete('/:userId', checkIsUserExist, deleteUserByParams)

module.exports = userRouter
