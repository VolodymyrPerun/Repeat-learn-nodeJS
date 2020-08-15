const Product = require('../../services/Product')

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
        
    }

}
