const db = require('../dataBase').getInstance();

module.exports = {

    getUsers: () => {
        const UserModel = db.getModel('User');

        return UserModel.findAll({})
    },

    getUserById: (userId) => {
        const UserModel = db.getModel('User');

        return UserModel.findByPk(userId)
    },

    createUser: (email, name, password) => {
        const UserModel = db.getModel('User');

        return UserModel.create({email, name, password})
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel('User');

        return UserModel.update(user, {
            where: {userId}
        })
    },

    deleteUserByParams: (params) => {
        const UserModel = db.getModel('User');

        return UserModel.destroy({
            where: params
        })

    }

};
