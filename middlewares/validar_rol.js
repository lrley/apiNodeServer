
const { response, request } = require('express');


const validarUserAdminRol = async(req=request, res=response, next)=>{

    if(!req.persona){
       return res.status(500).json({
        msg: 'Se quiere Verificar el role sin valida el token primero '
       })
    }

    const {rol, nombre} = req.persona;
    if(rol!=='ADMIN_ROL'){
      return res.status(401).json({
        msg:`El usuario ${nombre} no es Administrador - no puede hacer esto`
      })
    }

    

next();
}


const tieneRol = (...roles)=>{

    return (req, res=response, next)=>{
       // console.log('Persona de Tiene Rol'+ req.persona)

        if(!req.persona){
            return res.status(500).json({
             msg: 'Se quiere Verificar el role sin validar el token no hay token'
            })
         }

        if(!roles.includes(req.persona.rol)){
                return res.status(401).json({
                    msg:`El usuario ${req.persona.nombre} no tiene permitido esta operacion porque no es administrador - no puede hacer esto`
                })
        }



        next();


    }

}


module.exports = {
    
    validarUserAdminRol,
    tieneRol
    
    }

    