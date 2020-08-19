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

    createUser: (email, name, password) => {
        const UserModel = db.getModel(USER);

        return UserModel.create({email, name, password})
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
