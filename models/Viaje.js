const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viajeSchema = new Schema({
    titulo : {
        type :String,
        required : true
    },
    precio : {
        type: String,
        required : true
    },
    imagen : {
        type: String,
        required : true
    },
    fechaCreado : {
        type :Date,
        default : Date.now()
    },
    mes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Mes',
        default : null
    }
});

module.exports = mongoose.model("Viaje",viajeSchema);