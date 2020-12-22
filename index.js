const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const path = require('path');
const app = express();

// Conectar a la bd
conectarDB();

// Opciones de cors
const opcionesCors = {
    origin : process.env.FRONTURL
}
app.use(cors(opcionesCors));

/// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// función middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'static/img_mes')));

// Habilitar leer los valores
app.use(express.json({limit: '100mb'}));


// Rutas de la app
app.use('/api/mes', require('./routes/mes'));
app.use('/api/viaje', require('./routes/viaje'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/detalle', require('./routes/detalle'));
app.use('/api/archivos', require('./routes/archivos'));
app.use('/api/email', require('./routes/mail'));

const port = process.env.PORT || 4000;
app.listen(port,"0.0.0.0", () => {
    console.log("Servidor funcionando");
});