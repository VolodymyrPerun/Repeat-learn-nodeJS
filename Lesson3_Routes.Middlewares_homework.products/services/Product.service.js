const uuid = require('uuid').v4;
const {getProductsFile, writeToProductsFile} = require('../utils/product.util')


module.exports = class Product {
    constructor(title, price, id) {
        this.id = id || uuid();
        this.title = title;
        this.price = price;
    }

    async create() {
        const products = await getProductsFile()
        products.push(this)
        await writeToProductsFile(products)
    }

    async update() {
        const products = await getProductsFile()
        const existingProductIndex = products.findIndex(product => product.id === this.id)
        products[existingProductIndex] = this
        await writeToProductsFile(products)
    }

    static async fetchAll() {
        return await getProductsFile()
    }

    static async getById(id) {
        const products = await getProductsFile()
        return products.find(product => product.id === id)
    }

    static async deleteById(id) {
        let products = await getProductsFile()
        products = products.filter(product => product.id !== id)
        await writeToProductsFile(products)
    }

}
