const conexion = require('../middlewares/query');
const enviarCorreo = require('../middlewares/mailer')
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
        const mensaje = `
        <h1>DEPARTAMENTO DE MATEMATICA USAC</h1>

        <p>Hola ${nombre}, agradecemos que te comuniques con nosotros, tu pregunta
        estara siendo procesada y se dara solucion lo mas rapido posible.
        </p>

        <br>

        <p>Pregunta creada: ${pregunta}</p>

        PAP - 2024
        ADIOS
        `
        await enviarCorreo(correo, 'Duda del PAP', mensaje);
        res.json({ message: 'Pregunta creada' });
    }
}

const respuesta = async (req, res) => {
    const { pregunta, respuesta, satisfactoria } = req.body;

    if(satisfactoria){
        const query = `
        INSERT INTO Respuestas (pregunta, respuesta) 
            VALUES ('${pregunta}', '${respuesta}');`
        
        const result = await conexion.execute(query);
        if (result.error) {
            res.json({ error: result.error });
        }else{
            res.json({ message: 'La respuesta fue satisfactoria' });
        }
        console.log('La respuesta fue satisfactoria');
    }else{
        console.log('La respuesta no fue satisfactoria');
        //Envio de los datos por correo
    }
}

module.exports = {
    nueva_pregunta
}