const app = require('./app');

// Levantar el servidor
app.listen(3000, ()=> {
    console.log('Servidor escuchando en el puerto 3000');
})