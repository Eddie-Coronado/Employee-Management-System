const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc1234',
    database: 'employee-mngdb'
})

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;