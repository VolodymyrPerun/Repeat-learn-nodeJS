const Product = require('../../services/Product.service')

module.exports = {

    getProducts: async (req, res) => {
        const products = await Product.fetchAll()
        res.json(products)
    },

    createProduct: async (req, res) => {
        const {title, price} = req.body
        const product = new Product(title, price)
        await product.create()
        res.json({create: true})
    },

    getProduct: async (req, res) => {
        const {id} = req.params
        const product = await Product.getById(id)
        res.json(product)

    },

    deleteProduct: async (req, res) => {
        const {id} = req.params
        await Product.deleteById(id)
        res.json({deleted: true})
    },

    updateProduct: async (req, res) => {
        const {id} = req.params
        const {title, price} = req.body
        const product = new Product(title, price, id)
        await product.update()
        res.json({update: true})
    }

}
