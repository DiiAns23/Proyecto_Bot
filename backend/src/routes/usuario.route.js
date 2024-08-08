const { check } = require('express-validator');
const validateAtributes = require('../middlewares/validateAtributes');
const { Router } = require('express');
const router = Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/nueva_pregunta',[
    check('nombre','El nombre es obligatorio').notEmpty().isString(),
    check('apellido','El apellido es obligatorio').notEmpty().isString(),
    check('correo','El email es obligatorio').notEmpty().isEmail(),
    check('edad','La edad es obligatoria').notEmpty().isNumeric(),
    check('pregunta','La pregunta es obligatoria').notEmpty().isString(),
    validateAtributes
    ],
    usuarioController.nueva_pregunta
);

router.post('/respuesta_correcta',[
    check('id_duda', 'El id de la duda es obligatorio').notEmpty().isNumeric(),
    check('respuesta', 'La respuesta es obligatoria').notEmpty().isString(),
    check('satisfactoria', 'La satisfaccion es obligatoria').notEmpty(),
    validateAtributes],
    usuarioController.respuesta_correcta
)

router.get('/dudas', usuarioController.dudas);

module.exports = router;