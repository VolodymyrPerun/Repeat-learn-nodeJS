// const path = require('path');
// const uuid = require('uuid').v1();
// const fsep = require('fs-extra').promises;


const {
    responseStatusCodesEnum: {CREATED, NO_CONTENT, OK, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED, NOT_GET, NOT_UPDATE, NOT_DELETE},
    emailActionEnum: {USER_REGISTER, USER_DELETE, USER_UPDATE}
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler")
const {hashPasswordHelpers} = require('../../helpers')
const {emailService, userService} = require("../../service");


module.exports = {

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers();

            if (!users) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {

        try {
            res.json(req.user)
            res.sendStatus(OK)
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            // const [profileImage] = req.photos;
            const password = user.password;

            user.password = await hashPasswordHelpers(user.password);

            const isUserCreated = await userService.createUser(user);

            if (!isUserCreated) return next(new ErrorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.customCode));

            // if (profileImage) {
            //     const photoDir = `users/${isUserCreated.id}/photos/`;
            //     const fileExtension = path.extname(profileImage.name);
            //     const photoName = uuid + fileExtension;
            //
            //     await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            //     await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            //     await userService.update(isUserCreated.id, {photo: photoDir + photoName})
            // }

            await emailService.sendMail(user.email, USER_REGISTER, {user, password});

            res.sendStatus(CREATED);
        } catch (e) {
            next(e);
        }
    },


    updateUser: async (req, res, next) => {
        // ! Sequalize method
        // const user = req.body;
        // user.password = await hashUserPassword(user.password);
        // const isUpdated = await userService.update(req.user, user);
        // if (!isUpdated) return next(new ErrorHandler('Cannot update user', 400, 4001));
        // res.sendStatus(200);

        try {
            const {userId} = req.params
            const user = req.body
            const userFromDB = await userService.getUserById(userId);
            user.password = await hashPasswordHelpers(user.password);
            const [isUpdated] = await userService.updateUser(userId, user)

            if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.customCode));

            await emailService.sendMail(userFromDB.email, USER_UPDATE, {user})

            res.sendStatus(OK);
        } catch (e) {
            next(e)
        }
    },

    deleteUserByParams: async (req, res, next) => {
        // ! Sequalize method
        // const isDeleted = await req.user.destroy();
        // if (!isDeleted) return next(new ErrorHandler('Cannot delete user', 400, 4001));
        // res.sendStatus(204);

        try {
            const {userId} = req.params;
            const user = await userService.getUserById(userId);
            const isDeleted = await userService.deleteUserByParams({userId})

            if (!isDeleted) return next(new ErrorHandler(NOT_DELETE.message, NOT_FOUND_CODE, NOT_DELETE.customCode));

            await emailService.sendMail(user.email, USER_DELETE, {
                userName: user.name,
                userSurname: user.surname
            });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
