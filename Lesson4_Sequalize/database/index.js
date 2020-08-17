const Sequalize = require("sequelize")
const fs = require("fs")
const path = require("path")

module.exports = (() => {
    let instance;

    function innitConnection() {
        const client = new Sequalize('shop', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        })

        let models = {}

        function getModel() {
            fs.readdir(path.join(process.cwd(), 'database', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.')
                })
            })
        }
    }


    return {
        getInstance: () => {
            if (!instance) {
                instance = innitConnection()
            }

            return instance
        }
    }

})()

