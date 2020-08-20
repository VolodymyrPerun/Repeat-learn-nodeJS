const jwt = require('jsonwebtoken')

const {wordsEnum: {JWT_SECRET, JWT_REFRESH_SECRET}} = require('../constants')

module.exports = () => {
    const accessToken = jwt.sign({}, JWT_SECRET, {expiresIn: '10m'})
    const refreshToken = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '1d'})

    return {
        accessToken,
        refreshToken
    }

}
