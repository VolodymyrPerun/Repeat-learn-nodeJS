const {
    emailActionEnum: {
        USER_REGISTER, USER_DELETE, USER_UPDATE,
        PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE
    }
} = require('../constants');

module.exports = {
    [USER_REGISTER]: {
        subject: '[PIZZACHU] ВІТАЄМО!',
        templateFileName: 'createUser'
    },
    [USER_DELETE]: {
        subject: '[PIZZACHU] АКАУНТ БУВ ВИДАЛЕНИЙ!',
        templateFileName: 'deleteUser'
    },
    [USER_UPDATE]: {
        subject: '[PIZZACHU] АКАУНТ ОНОВЛЕНО!',
        templateFileName: 'updateUser'
    },
    [PRODUCT_CREATE]: {
        subject: '[PIZZACHU] СТВОРЕНО ПРОДУКТ!',
        templateFileName: 'createProduct'
    },
    [PRODUCT_DELETE]: {
        subject: '[PIZZACHU] ВИДАЛЕНО ПРОДУКТ!',
        templateFileName: 'deleteProduct'
    },
    [PRODUCT_UPDATE]: {
        subject: '[PIZZACHU] ПРОДУКТ ОНОВЛЕНО!',
        templateFileName: 'updateProduct'
    }
};
