const Detalle = require("../models/Detalle");
const { validationResult } = require("express-validator");


exports.nuevoDetalle = async (req,res,next) => {
    // mostar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() });
    }

    const { horarios,puntoSalida,incluye, descripcion , imagen , precios, ubicacion, recomendaciones , viaje , fecha } = req.body;

    const detalle = new Detalle();
    detalle.descripcion = descripcion;
    detalle.imagen = imagen;
    detalle.precios = precios;
    detalle.ubicacion = ubicacion;
    detalle.recomendaciones = recomendaciones;
    detalle.horarios = horarios;
    detalle.puntoSalida = puntoSalida;
    detalle.incluye = incluye;
    detalle.viaje = viaje;
    detalle.fecha = fecha;

    try {
        await detalle.save();
        return res.json({ msg : `El detalle del viaje  se agregó correctamete`});
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.todosDetalles = async (req , res) => {
    try {
        const detalles = await Detalle.find({}).select({});
        res.json(detalles)
    } catch (error) {
        
    }
}

exports.detalleEspecifico = async (req , res) => {
    const id = req.params.id;
    try {
        const detalle = await Detalle.find({ viaje : id});
        res.json(detalle)
    } catch (error) {
        console.log(error);
    }
}
