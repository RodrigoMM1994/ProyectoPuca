const Detalle = require("../models/Detalle");
const Viaje = require("../models/Viaje");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req,res,next) => {

    // mostar mensajes de error de express validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() });
    }
    // Datos del front
    const { correos , idViaje , persona , total } = req.body;

    // Datos del detalle del viaje
    const detalle = await Detalle.find({ viaje : idViaje});
    const { puntoSalida, incluye , fecha } = detalle[0];

    // Datos del viaje
    const viaje = await Viaje.find({ _id : idViaje});
    const { titulo , precio } = viaje[0];

    //Logica para otros datos
    const arrayIncluye = incluye.split(",");
    let listaIncluye = "<ul>";
    arrayIncluye.forEach(element => {
        listaIncluye+="<li>" +  element +"</li>";
    });
    listaIncluye+="</ul>";

    const totalGeneral = total * parseInt(precio);
    const totalParcial = (total * parseInt(precio)) / 2;
    const restante = totalGeneral - totalParcial;

    // Use Smtp Protocol to send Email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'of.magictoursmx@gmail.com',
               pass: 'PELUCHINtkm1234'
           }
    });

    const mailOptions = {
        from: 'Magic Tours México <of.magictoursmx@gmail.com>', // sender address
        to: correos, // list of receivers
        subject: 'Confirmación de Reservación Magic Tours México.',
        html: `<p>Hola ${ persona }</p>
               <p>Agradecemos tu preferencia para #Viajar con nosotros y con este correo confirmamos la reservación de tu(s) lugar(es) a nombre de:</p>
               
               <p><strong> ${ persona } </strong></p>
               <p>El viaje reservado es : ${ titulo } </p>

               <p><strong>FECHA DEL VIAJE:</strong></p>
               <p> ${ fecha } </p>

               <p><strong>Salidas:</strong></p>
               <p>${ puntoSalida }</p>

               <p><strong>EL PAQUETE INCLUYE:</strong></p>
                ${listaIncluye}

               <p><strong>Desglose de la cuenta:</strong></p>
               <p> Total parcial : ${ totalParcial } pesos</p>
               <p> Total general : ${ totalGeneral } pesos</p>
               <p> Por pagar : ${ restante } pesos</p>

               <img width="250px" src="cid:image@johnson.com">
        `,
        attachments:[{
            filename : 'logo.png',
            path: __dirname + '/../static/img/logo.png',
            cid : 'image@johnson.com'
        }]
      };
    
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            return res.json({ msg : "Hay errores: " + err });
        }else{
            return res.json({ msg : "Correo enviado correctamente"});
        }    
     });

}