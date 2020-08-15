const uuid = require('uuid').v4;
const {getProductsFile, writeToProductsFile} = require('../utils/product')


module.exports = class Product {
    constructor(title, price) {
        this.id = uuid();
        this.title = title;
        this.price = price;
    }

    async create() {
       const products = await getProductsFile()
        products.push(this)
        await writeToProductsFile(products)
    }

    static async fetchAll() {
        return await getProductsFile()
    }

}
