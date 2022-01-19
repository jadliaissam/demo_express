const host = "152.70.152.165"
const username = "user"
const password = "root123@@"
const database = "exercices"
const mysql = require('mysql')

const getAllProducts = (cb) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    })
    connection.connect()
    connection.query('SELECT * from products', (err, rows) => {
        cb(err, rows)
    })
    connection.end()
}

const getProductByID = (product_id, cb) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    })
    connection.connect()
    connection.query('SELECT * from products where id=' + product_id, (err, rows) => {
        cb(err, rows)
    })
    connection.end()
}

const insertProduct = (name, price, description, cb) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    })
    connection.connect()
    connection.query("INSERT INTO products(name, price, description) values('" + name + "'," + price + ", '" + description + "')", (err, rows) => {
        cb(err)
    })
    connection.end()
}

const updateProduct = (product_id, name, price, description, cb) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    })
    connection.connect()
    connection.query("UPDATE products set name='" + name + "', price=" + price + ", description='" + description + "' where id=" + product_id, (err, rows) => {
        cb(err, rows)
    })
    connection.end()
}

const deleteProduct = (product_id, cb) => {
    var connection = mysql.createConnection({
        host: host,
        user: username,
        password: password,
        database: database
    })
    connection.connect()
    connection.query("DELETE FROM products where id=" + product_id, (err, rows) => {
        cb(err)
    })
    connection.end()
}
module.exports = {
    getAllProducts,
    getProductByID,
    insertProduct,
    updateProduct,
    deleteProduct
}