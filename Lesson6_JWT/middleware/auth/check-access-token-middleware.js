const jwt = require('jsonwebtoken')

const {
    wordsEnum: {JWT_SECRET},
    headersEnum: {AUTHORIZATION},
    responseStatusCodes: {UNAUTHORIZED}
} = require('../../constants')
const {authService} = require('../../service')
const {ErrorHandler, error} = require('../../error')

module.exports = async (req, res, next) => {

    try {

        const token = req.get(AUTHORIZATION)

        if (!token) {
            return next(new ErrorHandler('No token', 400, 4002))
        }

        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                return next(new ErrorHandler(
                    error.NOT_VALID_TOKEN.message,
                    UNAUTHORIZED,
                    error.NOT_VALID_TOKEN.code))
            }
        })

        const isTokensFromDB = await authService.getTokenByParams({access_token: token})

        if (!isTokensFromDB) {
            return next(new ErrorHandler(
                error.NOT_VALID_TOKEN.message,
                UNAUTHORIZED,
                error.NOT_VALID_TOKEN.code))
        }

        req.userId = isTokensFromDB.userId
        next()

    } catch (e) {
        next(e)
    }


}


