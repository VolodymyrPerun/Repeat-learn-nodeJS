const userRouter = require('express').Router();
const {
    checkIsUserExistMiddleware,
    checkUserValidityMiddleware,
    checkUserValidityIfUpdateMiddleware
}
    = require('../../middleware')

const {
    UserController: {
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUserByParams
    }

} = require('../../controllers');


userRouter.post('/register', checkUserValidityMiddleware, createUser);
userRouter.get('/', getUsers)
userRouter.get('/:userId', checkIsUserExistMiddleware, getUserById)
userRouter.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser)
userRouter.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams)

module.exports = userRouter
