const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

const app = express();

// Conectar a la bd
conectarDB();



// Otras opciones
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://front-tours.vercel.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Habilitar leer los valores
app.use(express.json({limit: '100mb'}));

// Habilitar carpeta publica
app.use(express.static("static"));

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mes', require('./routes/mes'));
app.use('/api/viaje', require('./routes/viaje'));
app.use('/api/detalle', require('./routes/detalle'));

const port = process.env.PORT || 4000;
app.listen(port,"0.0.0.0", () => {
    console.log("Servidor funcionando");
});