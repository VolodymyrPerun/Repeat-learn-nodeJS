const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('logon', {
        title: 'Log In',
        isLogIn: true
    })
})
router.post('/reg', async (req, res) => {
    const users = new Users(req.body.first_name, req.body.last_name, req.body.password, req.body.email)

    const mailExist = await users.find()
    if (mailExist) {
        res.redirect('/signin')
    }else res.send()



});

module.exports =router
