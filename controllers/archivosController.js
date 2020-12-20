
const multer = require("multer");
const shortid = require("shortid");
const fs = require("fs");
const Mes = require('../models/Mes');

exports.subirArchivo = async (req,res,next)=>{

    const  configuracionMulter = {
        storage : fileStorage = multer.diskStorage({
            destination : (req,file,cb) => {
                cb(null,__dirname+'/../static/img_mes/')
            },
            filename : (req,file,cb) => {
                const extension = file.originalname.substring(file.originalname.indexOf("."),file.originalname.length);
                cb(null,`${shortid.generate()}${extension}`)
            }
        })
    }
    
    const upload = multer(configuracionMulter).single("archivo");
        
    upload(req,res, (error) => {
        console.log(req.file);
        if(!error){
            res.json({archivo : req.file.filename});
        }else{
            console.log(error);
            return next();
        }
    });

}

exports.eliminarArchivo = async (req,res) => {

    try {
        fs.unlinkSync(__dirname + `/../static/img_mes/${req.archivo}`);
    } catch (error) {
        console.log(error);
    }
}

exports.descargarArchivo = async (req, res, next) => {

    const enlace = await Mes.findOne({ imagen : req.params.archivo });

    const archivo  = __dirname + '/../static/img_mes/'+req.params.archivo;
    res.download(archivo);
    const { imagen } = enlace;
    if(descargas === 1){
        req.archivo = imagen;
        next();
    }
}