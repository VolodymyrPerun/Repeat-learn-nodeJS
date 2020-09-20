const jwt = require('jsonwebtoken');

const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');

const {JWT_SECRET} = require('../../config')
const {authService} = require('../../service');
const {ErrorHandler} = require('../../error');


module.exports = async (req, res, next) => {
    try {
        const authorizationToken = req.get(AUTHORIZATION);

        if (!authorizationToken) {
            return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
        }

        jwt.verify(authorizationToken, JWT_SECRET, err => {
            if (err) {
                return next(new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    UNAUTHORIZED,
                    NOT_VALID_TOKEN.code
                ));
            }
        });

        const tokensFromDB = await authService.getTokensByParams({access_token: authorizationToken})

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
