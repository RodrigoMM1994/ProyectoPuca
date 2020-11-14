const express = require("express");
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const { check }  = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check("titulo","El titulo es requerido").not().isEmpty(),
        check("imagen","La imagen de la presentacion es requerida").not().isEmpty(),
        check("mes","El id del viaje es requerido").not().isEmpty(),
        check("precio","El precio viaje es requerido").not().isEmpty(),
    ],
    auth,
    viajeController.nuevoViaje
);

router.get('/',
    viajeController.todosViajes
);

router.get('/:id',
    viajeController.viajesPorMes
);


module.exports = router;