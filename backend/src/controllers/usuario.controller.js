const conexion = require('../middlewares/query');
const enviarCorreo = require('../middlewares/mailer')
const similitud = require('string-similarity');


const nueva_pregunta = async (req, res) => {
    const { nombre, apellido, correo, edad, pregunta } = req.body;
    
    const query = `
    INSERT INTO Dudas (nombre, apellido, correo, edad, pregunta) 
        VALUES ('${nombre}', '${apellido}', '${correo}', '${edad}', '${pregunta}');`
        
    const result = await conexion.execute(query);
    if (result.error) {
        res.json({ error: result.error });
    }else{
        const query2 = `SELECT * FROM Respuestas;`
        const result2 = await conexion.execute(query2);
        const preguntas = result2.rows.map(respuesta => respuesta.pregunta);

        const mejorSimilitud = similitud.findBestMatch(pregunta, preguntas);
        if(mejorSimilitud.bestMatch.rating > 0.6){
            const mejorPregunta = result2.rows[mejorSimilitud.bestMatchIndex];
            const respuesta = mejorPregunta.respuesta;
            console.log('Esta es la respuesta sugerida:')
            console.log(respuesta)
        }

        // const mensaje = `
        // <h1>DEPARTAMENTO DE MATEMATICA USAC</h1>

        // <p>Hola ${nombre}, agradecemos que te comuniques con nosotros, tu pregunta
        // estará siendo procesada y se dará solución lo más rápido posible.
        // </p>

        // <br>

        // <p>Pregunta creada: ${pregunta}</p>

        // PAP - 2024
        // ADIOS
        // `
        //await enviarCorreo(correo, 'Duda del PAP', mensaje);

        res.json({ message: 'Pregunta creada' });
    }
}

module.exports = {
    nueva_pregunta
}