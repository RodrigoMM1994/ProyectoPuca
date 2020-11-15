const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const conectarBD = require("./config/db");

const app = express();

// Conectar a la bd
conectarDB();

// Opciones de cors
const opcionesCors = {
    origin : process.env.FRONTURLPROD
}
app.use(cors(opcionesCors));

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