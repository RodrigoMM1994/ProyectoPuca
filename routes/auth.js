const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const { check }  = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check("email","Agregar un email valido").isEmail(),
        check("password","El password es obligatorio").not().isEmpty(),
    ],
    authController.autenticarUsuario
);

router.get('/',
    authController.usuarioAutenticado
);


module.exports = router;