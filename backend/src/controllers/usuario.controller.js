const conexion = require('../middlewares/query');
//const enviarCorreo = require('../middlewares/mailer')
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
            result.respuesta = respuesta;
        }else{
            result.respuesta = 'No se encontró una respuesta similar a tu pregunta, se te responderá lo más pronto posible por correo electrónico.';

            // Actualizar la duda ingresada con parametro correcto = 0
            const query3 = `UPDATE Dudas SET correcta = 0 WHERE id = ${result.rows.insertId};`
            const result3 = await conexion.execute(query3);
            if (result3.error) {
                res.json({ error: result3.error });
            }
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

        res.json({ respuesta: result.respuesta, id_duda: result.rows.insertId });
    }
}

const respuesta_correcta = async (req, res) => {
    const { id_duda, respuesta, satisfactoria } = req.body;
    const query = `
    UPDATE Dudas SET respuesta = '${respuesta}', correcta = ${satisfactoria}
        WHERE id = ${id_duda};`
    const result = await conexion.execute(query);
    if (result.error) {
        res.json({ error: result.error });
    }else{
        if(satisfactoria == 1){
            const query2 = `
            INSERT INTO Respuestas (pregunta, respuesta)
                SELECT pregunta, '${respuesta}' FROM Dudas WHERE id = ${id_duda};`
            const result2 = await conexion.execute(query2);
            if (result2.error) {
                res.json({ error: result2.error });
            }else{
                res.json({ message: 'Respuesta finalizada' });
            }
        }else{
            res.json({ message: 'Respuesta finalizada' });
        }
    }
}

const dudas = async (req, res) => {
    const query = `SELECT * FROM Dudas WHERE correcta = 0;`
    const result = await conexion.execute(query);
    if (result.error) {
        res.json({ error: result.error });
    }else{
        res.json({ dudas: result.rows });
    }
}

module.exports = {
    nueva_pregunta,
    respuesta_correcta,
    dudas
}