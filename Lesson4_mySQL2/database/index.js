const mysql2 = require("mysql2")

let connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shop"
})

module.exports = connection
