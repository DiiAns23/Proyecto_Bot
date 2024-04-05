const { validationResult } = require('express-validator');

const validateAtributes = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
}

module.exports = validateAtributes;