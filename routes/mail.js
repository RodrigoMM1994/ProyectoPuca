
const express = require("express");
const router = express.Router();
const mailController = require('../controllers/mailController');
const { check }  = require('express-validator');

router.post('/', 
    [
        check('idViaje','El id viaje es obligatorio').not().isEmpty(),
        check('persona','El nombre de la persona es requerida').not().isEmpty(),
        check('correos','Los correos son obligatorio').not().isEmpty(),
        check('total','El total de personas es obligatorio').not().isEmpty()
    ],
    mailController.sendEmail
);

module.exports = router;
