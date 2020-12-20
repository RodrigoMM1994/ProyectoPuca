const express = require("express");
const router = express.Router();
const detalleController = require('../controllers/detalleController');
const { check }  = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check("descripcion","La descripción es requerida").not().isEmpty(),
        check("imagen","La imagen de la presentacion es requerida").not().isEmpty(),
        check("precios","Los precios son requeridos").not().isEmpty(),
        check("ubicacion","La ubicacion es requerida").not().isEmpty(),
        check("recomendaciones","Las recomendaciones son obligatorias").not().isEmpty(),
        check("horarios","Los horarios son obligatorias").not().isEmpty(),
        check("puntoSalida","El punto de salida es requerido").not().isEmpty(),
        check("incluye","Incluye es requerido").not().isEmpty(),
        check("fecha","La fecha del viaje es requerida").not().isEmpty(),
        check("viaje","El id del viaje es requerido").not().isEmpty(),
    ],
    auth,
    detalleController.nuevoDetalle
);

router.get('/',
    detalleController.todosDetalles
)

router.get('/:id',
    detalleController.detalleEspecifico
)

module.exports = router;