const conexion = require('../middlewares/query');
//const tensorflow = require('@tensorflow/tfjs-node')

const cargar_modelo = async () => {
    const modelo = await tensorflow.loadLayersModel();
    return modelo
}

const procesar_pregunta = async (pregunta) => {
    // Desestructurar la pregunta por palabras clave eje. 'Asignacion' , 'Fecha', 'DPI', 'Graduacion'
    // Obtener esa cadena de tokens esenciales
}

const similitud_preguntas = async (pregunta, modelo) => {
    const similitud = tensorflow.dot(pregunta, modelo);

    const magnitud_1 = tensorflow.norm(pregunta);
    const magnitud_2 = tensorflow.norm(modelo);

    return similitud.div(magnitud_1.mul(magnitud_2));
}

const nueva_pregunta = async (req, res) => {
    const { nombre, apellido, correo, edad, pregunta } = req.body;
    
    const query = `
    INSERT INTO Dudas (nombre, apellido, correo, edad, pregunta) 
        VALUES ('${nombre}', '${apellido}', '${correo}', '${edad}', '${pregunta}');`
    
    const result = await conexion.execute(query);

    if (result.error) {
        res.json({ error: result.error });
    }else{
        

        res.json({ message: 'Pregunta creada' });
    }
}

module.exports = {
    nueva_pregunta
}