/*
Variable ==> var, let
Estos valores pueden cambiar

var nombre = 'Luis';
nombre = 'Luisa';

Constante ==> const

const nombre = 'Luis';
nombre = 'Luisa'; // Error

*/
const express = require('express'); // Sirve para crear el servidor
const app = express(); // Crear el servidor

app.use(express.json()); // Entender los datos que vienen en formato JSON

// Configuraciones

app.get('/', (req,res) => {
    res.json({
        'msg': 'Hola, este es mi primer servidor', 
        'nombre': 'Diego Obin',
        'edad': '23 años'
    });
    
})

app.use('/', require('./routes/usuario.route'));

module.exports = app; // Exportar el servidor
