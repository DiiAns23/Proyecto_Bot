const app = require('./app');
require('dotenv').config()

const { PORT } = process.env;
// Levantar el servidor
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})