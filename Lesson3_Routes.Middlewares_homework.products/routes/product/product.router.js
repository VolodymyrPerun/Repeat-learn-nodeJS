const productRouter = require('express').Router();

const {
    productController: {
        createProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getProducts
    }

} = require('../../controllers')

productRouter.get('/', getProducts)
// productRouter.put('/', updateProduct)
// productRouter.delete('/', deleteProduct)
productRouter.post('/', createProduct)
productRouter.get('/:id', getProduct)

module.exports = productRouter
