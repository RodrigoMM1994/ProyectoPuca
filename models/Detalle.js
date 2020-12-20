
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detalleSchema = new Schema({
    descripcion : {
        type :String,
        required : true
    },
    imagen : {
        type :String,
        required : true
    },
    precios : {
        type : Number,
        required : true
    },
    ubicacion : {
        type : String,
        required : true
    },
    recomendaciones : {
        type : String,
        required : true
    },
    horarios : {
        type : String,
        required: true,
    },
    puntoSalida : {
        type : String,
        required : true,
    },
    incluye : {
        type : String,
        required : true,
    },
    fecha : {
        type : String,
        required : true,
    },
    viaje : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Viaje',
        default : null
    },
    fechaCreado : {
        type :Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Detalle",detalleSchema);