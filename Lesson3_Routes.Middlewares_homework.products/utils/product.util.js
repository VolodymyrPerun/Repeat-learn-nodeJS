const path = require('path');
const fsp = require('fs').promises;

const pathToProducts = path.join(process.cwd(), 'data', 'products.json');

async function getProductsFile() {
    const fileContent = await fsp.readFile(pathToProducts)
    return JSON.parse(fileContent)
}

async function writeToProductsFile(products) {
    await fsp.writeFile(pathToProducts, JSON.stringify(products))
}

module.exports = {
    getProductsFile,
    writeToProductsFile
}
