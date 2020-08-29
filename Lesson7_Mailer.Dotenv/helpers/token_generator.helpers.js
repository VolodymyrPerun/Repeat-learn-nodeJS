const jwt = require('jsonwebtoken')


 const {JWT_SECRET, JWT_SECRET_TIME, JWT_REFRESH_SECRET, JWT_REFRESH_SECRET_TIME} = require('../config')


module.exports = () => {
    const access_token = jwt.sign(
        {},
        JWT_SECRET,
        {expiresIn: JWT_SECRET_TIME})

    const refresh_token = jwt.sign(
        {},
        JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_SECRET_TIME || JWT_REFRESH_SECRET_TIME})

    return {
        access_token,
        refresh_token
    }

}
