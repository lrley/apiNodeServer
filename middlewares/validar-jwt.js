const { response } = require("express")
const jwt = require ('jsonwebtoken');
const Usuario =  require('../models/usuarioDB');

const  validarJWT = async(req, res=response, next) =>{

    const token = req.header('token-pass');
  //  console.log('TOKEN: '+token)

        if( !token ){
            return res.status(401).json({
                msg: 'No hay token en la peticion'
            })   
        }

try {
 const {uid} =   jwt.verify(token,process.env.SECRETORPRIVATEKEY)

    const persona =  await Usuario.findById(uid);
    
        if(!persona){
            return res.status(401).json({
                msg:'El usuario no existe en la base de datos - Token no valido'
            })
        }


        if(!persona.estado){
            return res.status(401).json({
                msg:'El usuario se encuentra inactivo - Token no valido'
            })
        }


    req.persona = persona;
    
    next();
    
} catch (error) {
  // console.log(error);
    res.status(401).json({
        msg: 'Token no valido'
    })
}




}


module.exports={
    validarJWT
}