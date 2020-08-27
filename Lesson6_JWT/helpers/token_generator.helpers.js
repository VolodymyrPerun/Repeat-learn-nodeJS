const jwt = require('jsonwebtoken')

const {tokensEnum: {JWT_SECRET, JWT_REFRESH_SECRET, JWT_SECRET_TIME, JWT_REFRESH_SECRET_TIME}} = require('../constants')

module.exports = () => {
    const access_token = jwt.sign(
        {},
        process.env.JWT_SECRET || JWT_SECRET,
        {expiresIn: process.env.JWT_SECRET_TIME || JWT_SECRET_TIME})

    const refresh_token = jwt.sign(
        {},
        process.env.JWT_REFRESH_SECRET || JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_SECRET_TIME || JWT_REFRESH_SECRET_TIME})

    return {
        access_token,
        refresh_token
    }

}
