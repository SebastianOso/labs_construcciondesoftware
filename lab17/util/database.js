const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'chewy',
    password: 'SuperMan/123'
});

module.exports = pool.promise();