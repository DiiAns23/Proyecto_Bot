const conn = require('./conexion');

const execute = async function consultar(query){
    try{
        const connection = await conn.promise().getConnection();
        const [rows] = await connection.execute(query);
        connection.release(); // Liberar la conexión
        return { query, rows };
    }catch(err){
        console.log(`Error en la consulta: ${query}`);
        return { query, err };
    }
}

module.exports = {
    execute
};