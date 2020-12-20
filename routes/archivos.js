const express = require("express");
const router = express.Router();
const archivosController = require('../controllers/archivosController');

router.post("/",
    archivosController.subirArchivo
);

router.get('/:archivo',
    archivosController.descargarArchivo,
    archivosController.eliminarArchivo
)


module.exports = router;