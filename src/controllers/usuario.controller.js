const conexion = require('../middlewares/query');

const nuevo_usuario = async (req, res) => {
    const { nombre, apellido, correo, edad } = req.body;
    const query = `
    INSERT INTO Usuario (nombre, apellido, correo, edad) 
        VALUES ('${nombre}', '${apellido}', '${correo}', ${edad});
    `;

    const result = await conexion.execute(query);
    if (result.error) {
        res.json({ error: result.error });
    } else {
        console.log(result)
        res.json({ message: 'Usuario creado' });
    }
}

module.exports = {
    nuevo_usuario
}