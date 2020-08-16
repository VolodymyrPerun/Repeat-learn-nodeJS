const Product = require('../../services/Product.service')

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.getById(id)
        if (!product) throw new Error('Product not found')

        next()
    } catch (e) {
        res.json({error: true, message: 'Product not found'})
    }
}
