const db = require('../dataBase').getInstance();
const {modelNamesEnum: {USER}} = require('../constants')

module.exports = {

    getUsers: () => {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({})
    },

    getUserById: (userId) => {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(userId)
    },

    createUser: (user) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user)
    },

    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        })
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel(USER);

        return UserModel.update(user, {
            where: {userId}
        })
    },

    deleteUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.destroy({
            where: params
        })

    }

};
