const Products = require('../../services/Product.service')

module.exports = async (req, res, next) => {
    try {
        const {title, price} = req.body
        if (!(price > 0 && price < 1000)) throw new Error('Invalid price')
        if (!(title.length > 4 && title.length < 20)) throw new Error('Title length is invalid')

        next();

    } catch (e) {
        res.json({error: true})
    }
}
