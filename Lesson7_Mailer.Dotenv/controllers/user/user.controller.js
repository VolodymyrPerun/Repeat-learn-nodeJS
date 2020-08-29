const {emailService, userService} = require("../../service");
const {hashPasswordHelpers, checkHashPasswordHelpers} = require('../../helpers')
const ErrorHandler = require("../../error/ErrorHandler")


module.exports = {

    getUsers: async (req, res) => {

        try {
            const users = await userService.getUsers()

            console.log('*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*');
            console.log(' you have ' + users.length + ' users in database');
            console.log('*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*');

            res.json(users)

        } catch (e) {
            res.json(e)
        }

    },

    getUserById: async (req, res) => {

        try {
            const user = req.user
            res.json(user)

        } catch (e) {
            res.json(e)
        }

    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            user.password = await hashPasswordHelpers(user.password);

            await userService.createUser(user);
            await emailService.sendMail(user.email)

        } catch (e) {
            res.json(e)
        }

        res.end('user created')
    },

    loginUser: async (req, res, next) => {

        try {
            const {email, password} = req.body;

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('User is not found', 404, 4041));
            }

            await checkHashPasswordHelpers(user.password, password);

            res.json(user);

        } catch (e) {
            next(e)
        }


    },


    updateUser: async (req, res, next) => {

        try {
            const {userId} = req.params
            const user = req.body
            user.password = await hashPasswordHelpers(user.password);
            const {isUpdate} = await userService.updateUser(userId, user)

            isUpdate ? res.sendStatus(200) : res.json({update: false})
        } catch (e) {
            next(e)
        }
    },

    deleteUserByParams: async (req, res, next) => {
        try {
            const {userId} = req.params

            const isDeleted = await userService.deleteUserByParams({userId})

            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            next(e)
        }
        res.end('user deleted')
    }
}
