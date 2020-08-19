const {userService} = require("../../service");


module.exports = {

    getUsers: async (req, res) => {

        try {
            const users = await userService.getUsers()
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
            const {email, name, password} = req.body;
            await userService.createUser(email, name, password);
            res.sendStatus(201)

        } catch (e) {
            res.json(e)
        }

        res.end()
    },


    updateUser: async (req, res) => {

        try {
            const {userId} = req.params
            const user = req.body

            const {isUpdate} = await userService.updateUser(userId, user)

            isUpdate ? res.sendStatus(200) : res.json({update: false})
        } catch (e) {
            res.json(e)
        }
    },

    deleteUserByParams: async (req, res) => {
        try {
            const {userId} = req.params

            const isDeleted = await userService.deleteUserByParams({userId})

            isDeleted ? res.sendStatus(204) : res.json({deleted: false})
        } catch (e) {
            res.json(e)
        }

    }
}
