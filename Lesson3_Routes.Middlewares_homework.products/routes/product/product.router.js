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

productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)
productRouter.post('/', createProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter
