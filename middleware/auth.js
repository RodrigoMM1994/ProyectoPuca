const jwt = require('jsonwebtoken');
require('dotenv').config({ path : 'variables.env'});

module.exports = (req, res ,next ) => {
    const header = req.get("Authorization");

    if(header){

        try {         
            const token = header.split(" ")[1];
            const usuario = jwt.verify(token,process.env.SECRETA);
            res.json({usuario}); 
            req.usuario = usuario;
        } catch (error) {
            console.log("JWT no valido");
            console.log(error);
        }
    }
    return next();
}