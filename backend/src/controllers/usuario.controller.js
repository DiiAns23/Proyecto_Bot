const conexion = require('../middlewares/query');

const nuevo_usuario = async (req, res) => {
    const { nombre, apellido, correo, edad, pregunta } = req.body;
    const query = `SELECT * FROM Usuario WHERE correo = '${correo}'`;
    const result1 = await conexion.execute(query);
    if (result1['rows'].length > 0) {
        // Insertar la pregunta usando el id del usuario
        const id_usuario = result1['rows'][0]['identificador'];
        const query = `
        INSERT INTO Dudas (identificador_usuario, pregunta) 
            VALUES (${id_usuario}, '${pregunta}');`
        const result = await conexion.execute(query);
        if (result.error) {
            res.json({ error: result.error });
        } else {
            console.log(result)
            res.json({ message: 'Pregunta creada' });
        }
        return;
    }else{
        const query1 = `
        INSERT INTO Usuario (nombre, apellido, correo, edad) 
            VALUES ('${nombre}', '${apellido}', '${correo}', ${edad});
        `;
        const result = await conexion.execute(query1);
        console.log(result)
        if (result.error) {
            res.json({ error: result.error });
        } else {
            // Insertar la pregunta usando el id del usuario usando ResultSetHeader
            const id_usuario = result['rows']['insertId'];
            const query = `
            INSERT INTO Dudas (identificador_usuario, pregunta) 
                VALUES (${id_usuario}, '${pregunta}');`
            const result = await conexion.execute(query);
            if (result.error) {
                res.json({ error: result.error });
            } else {
                console.log(result)
                res.json({ message: 'Pregunta creada' });
            }
        
        }      

    }
}

module.exports = {
    nuevo_usuario
}