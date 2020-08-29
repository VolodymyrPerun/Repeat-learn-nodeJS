const jwt = require('jsonwebtoken');

const {
    tokensEnum: {JWT_REFRESH_SECRET},
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {UNAUTHORIZED, BAD_REQUEST},
    responseCustomError: {NOT_VALID, NOT_VALID_TOKEN}

} = require('../../constants');
const {authService} = require('../../service');
const {ErrorHandler} = require('../../error');


module.exports = async (req, res, next) => {
    try {
        const refreshedToken = req.get(AUTHORIZATION);

        if (!refreshedToken) {
            return next(new ErrorHandler(NOT_VALID.message, BAD_REQUEST, NOT_VALID.customCode));
        }

        jwt.verify(refreshedToken, JWT_REFRESH_SECRET, err => {
            if (err) {
                return next(new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    UNAUTHORIZED,
                    NOT_VALID_TOKEN.code
                ));
            }
        });

        const tokensFromDB = await authService.getTokensByParams({refresh_token: refreshedToken})

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
