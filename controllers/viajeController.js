const Viaje = require("../models/Viaje");
const { validationResult } = require("express-validator");


exports.nuevoViaje = async (req,res,next) => {
    // mostar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() });
    }

    const { titulo , mes ,precio , imagen} = req.body;

    const viaje = new Viaje();
    viaje.titulo = titulo;
    viaje.mes = mes;
    viaje.precio = precio;
    viaje.imagen = imagen;

    try {
        await viaje.save();
        return res.json({ msg : `El viaje ->  ${ viaje.titulo } se agregó correctamete`});
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.todosViajes = async (req , res) => {
    try {
        const viajes = await Viaje.find({}).select({});
        res.json(viajes)
    } catch (error) {
        
    }
}

exports.viajesPorMes = async (req , res) => {
    const id = req.params.id;
    try {
        const viajes = await Viaje.find({ mes : id});
        res.json(viajes)
    } catch (error) {
        console.log(error);
    }
}