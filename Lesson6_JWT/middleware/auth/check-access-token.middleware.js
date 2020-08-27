const jwt = require('jsonwebtoken');

const {
    tokensEnum: {JWT_SECRET},
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomError: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');
const {authService} = require('../../service');
const {ErrorHandler} = require('../../error');


module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
        }

        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                return next(new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    UNAUTHORIZED,
                    NOT_VALID_TOKEN.code
                ));
            }
        });

        const tokensFromDB = await authService.getTokensByParams({access_token: token})

        if (!tokensFromDB) {
            return next(new ErrorHandler(
                NOT_VALID_TOKEN.message,
                UNAUTHORIZED,
                NOT_VALID_TOKEN.code
            ));
        }

        req.userId = tokensFromDB.userId
        next()
    } catch (e) {
        next(e)
    }
}
