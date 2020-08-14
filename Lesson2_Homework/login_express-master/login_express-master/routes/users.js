const {Router} = require('express')
const Users = require('../models/users')
const router = Router()

router.get('/', async (req, res) => {
    const users = await Users.getAll()
    res.render('users', {
        title: 'Users',
        isUsers: true,
        users
    })
})
module.exports =router
