const {getUsers, createUser} = require('../../service')

module.exports = {

    getAllUsers: async (req, res) => {
        const users = await getUsers()
        res.json(users)
    },

    registerUser: async (req, res) => {
        const user = req.body;
        await createUser(user)
        res.redirect('/users')
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
