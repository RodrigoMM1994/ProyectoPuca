const express = require("express");
const router = express.Router();
const mesController = require('../controllers/mesController');
const { check }  = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check("nombre","El nombre del mes es requerido").not().isEmpty(),
        check("imagen","La imagen de la presentacion es requerida").not().isEmpty(),
    ],
    auth,
    mesController.nuevoMes
);

router.get('/',
    mesController.todosMeses
)


module.exports = router;