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

module.exports = router;