const mysql = require('mysql2');

const conn = mysql.createPool({
    connectionLimit: 20,
    host: '127.0.0.1',
    port: '3306',
    database: 'EJEMPLO1',
    user: 'root',
    password: 'password',
    multipleStatements: true
});

conn.getConnection((err, connection) => {
    if (err){
        console.log(`Base de datos no conectada, error: ${err}`);
        return;
    }
    console.log(`Base de datos conectada`);
    connection.release(); // Liberar la conexión
});

module.exports = conn;