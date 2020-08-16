const productRouter = require('express').Router();

const {
    productController: {
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }

} = require('../../controllers')

const {isProductExist, isProductValid} = require('../../middlewares')

productRouter.get('/', getProducts)
productRouter.get('/:id', isProductExist, getProduct)
productRouter.post('/', isProductValid, createProduct)
productRouter.put('/:id', isProductExist, isProductValid, updateProduct)
productRouter.delete('/:id', isProductExist, deleteProduct)

module.exports = productRouter
