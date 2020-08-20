const db = require('../dataBase').getInstance();
const {modelNamesEnum: {AUTH_TOKEN}} = require('../constants');

module.exports = {

    createTokenPair: (token) => {
        const TokenModel = db.getModel(AUTH_TOKEN);

        return TokenModel.create(token)
    },


    getTokenByParams: (params) => {
        const TokenModel = db.getModel(AUTH_TOKEN);

        return TokenModel.findOne({
            where: params
        })
    },


    deleteTokenByParams: (params) => {
        const TokenModel = db.getModel(AUTH_TOKEN);

        return TokenModel.destroy({
            where: params
        })

    }

}
