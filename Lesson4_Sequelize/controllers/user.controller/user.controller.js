const {getUsers, userService} = require("../../service");
// const {userService} = require('../../service')


module.exports = {

    getUsers: async (req, res) => {
        const users = await getUsers()
        res.json(users)
    },

    createUser: async (req, res) => {
        try {
            const {email, name, password} = req.body;
            await userService.createUser(email, name, password);
        } catch (e) {
            res.json(e)
        }

        res.end()
    },


    updateUser: async (req, res) => {
        res.end('Put users')
    },

    deleteUser: async (req, res) => {
        const params = req.params
        const query = req.query
        res.json({params, query})
    }
}
