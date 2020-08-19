module.exports = (req, res, next) => {
    try {
        const {name, age, email, password} = req.body

        // console.log('*****************')
        // console.log(name, age, email, password)
        // console.log('*****************')

        if (!name || !age || !email || !password) {
            throw new Error('user is not valid')
        }
        if (age > 150 || age < 1) {
            throw new Error('Age is out of range')
        }
        if (password.length < 4) {
            throw new Error('Password is too short')
        }
        if (password.length > 8) {
            throw new Error('Password is too long')
        }

        next();

    } catch (e) {
        res.json('error', {message: e.message})
    }

}
