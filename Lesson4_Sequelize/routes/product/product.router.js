const {Router} = require('express')

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    res.end('Get products')
})

productRouter.post('/', async (req, res) => {
    console.log(req.body);
    res.end('Post products')
})

productRouter.put('/', async (req, res) => {
    res.end('Put products')
})

productRouter.delete('/:name', async (req, res) => {
    const params = req.params
    const query = req.query
    res.json({params, query})
})


module.exports = productRouter
