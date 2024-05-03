const mysql = require('mysql2');
require('dotenv').config()

const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const conn = mysql.createPool({
    connectionLimit: 20,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true
});

conn.getConnection((err, connection) => {
    if (err){
        console.log(`Base de datos no conectada, error: ${err}`);
        return;
    }
    console.log(`Base de datos conectada desde el puerto ${DB_PORT}`);
    connection.release(); // Liberar la conexión
});

module.exports = conn;