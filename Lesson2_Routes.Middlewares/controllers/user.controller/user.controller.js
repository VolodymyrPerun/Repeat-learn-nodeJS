const {userService} = require('../../service')

module.exports = {

    getAllUsers: async (req, res) => {
        let users = await userService.getUsers()
        res.render('users', {users})
    },

    createUser: async (req, res) => {
        console.log(req.body);
        await userService.createUser(req.body)
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
