const {Router} = require('express')
const router = Router()
const Users = require('../models/users')

router.get('/', (req, res) => {
    res.render('signin', {
        title: 'Sign In',
        isSignIn: true
    })
})
router.post('/', async (req, res) => {
    const users = new Users(req.body.first_name, req.body.last_name, req.body.password, req.body.email)

    await users.save()

    res.redirect('/users')
})
module.exports =router
