
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mesSchema = new Schema({
    nombre : {
        type :String,
        required : true
    },
    imagen : {
        type :String,
        required : true
    },
    fechaCreado : {
        type :Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Mes",mesSchema);