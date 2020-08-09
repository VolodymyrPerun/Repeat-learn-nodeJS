module.exports = {

    getAllUsers: async (req, res) => {
        res.end('Get users')
    },

    createUser: async (req, res) => {
        console.log(req.body);
        res.end('Post users')
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
