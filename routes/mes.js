const express = require("express");
const router = express.Router();
const mesController = require('../controllers/mesController');
const { check }  = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check("nombre","El nombre del mes es requerido").not().isEmpty(),
        check("imagen","La imagen del mes es obligatoria").not().isEmpty()
    ],
    mesController.nuevoMes
);

router.get('/',
    mesController.todosMeses
)


module.exports = router;