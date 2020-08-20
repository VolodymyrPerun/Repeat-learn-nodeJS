// module.exports.userRouter=require('./auth/auth.router')
// module.exports.productRouter=require('./product/product.router')


const userRouter = require('./user/user.router')
const productRouter = require('./product/product.router')
const authRouter = require('./auth/auth.router')

module.exports = {
    userRouter,
    productRouter,
    authRouter
}
