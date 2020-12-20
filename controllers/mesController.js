const Mes = require("../models/Mes");
const { validationResult } = require("express-validator");

exports.nuevoMes = async (req,res,next) => {
    // mostar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() });
    }
    const { nombre , imagen} = req.body;
    const mes = new Mes();
    mes.nombre = nombre;
    mes.imagen = imagen;    
    try {
        await mes.save();
        return res.json({ msg : `El mes ->  ${mes.nombre} se agregó correctamete`});
        next();
    } catch (error) {
        console.log(error);
    }
}

exports.todosMeses = async (req , res) => {
    try {
        const meses = await Mes.find({}).select({});
        res.json(meses)
    } catch (error) {
        
    }
}
