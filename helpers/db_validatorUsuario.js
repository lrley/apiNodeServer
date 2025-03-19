const Usuario =  require('../models/usuarioDB');


const emailExiste = async(correo = '' )=>{ 
    //Verificar si el correo existe
    const existeEmail= await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El Correo ${existeEmail.correo} existe en la BD`);
    }
}

//sirve para mostrar el id de una cedula existente
const BuscaCedula = async(cedula='')=>{
    const usuario = await Usuario.findOne({ cedula }); 
    if(!usuario){
        throw new Error(`El Usuario con Cedula ${cedula} no existe en la BD. busca cedula`);
    }
    return usuario._id;
}


const CedulaExiste = async(cedula='')=>{
 
    const usuario = await Usuario.findOne({ cedula }); 
    if(usuario){
        return usuario._id;
    }
}

const CedulaExisteEliminada = async(cedula='')=>{
 
    const usuario = await Usuario.findOne({ cedula }); 
    if(usuario.estado===false){
        throw new Error(`El Usuario con Cedula ${cedula} se encuentra eliminado o inactivo hable con el administrador `);
    }
}

const noExisteCedula = async(id='')=>{
    const cedula=id;
    const usuario = await Usuario.findOne({ cedula }); 
    if(!usuario){
        throw new Error(`El Usuario con Cedula ${cedula} no existe en la Base de Datos`);
    }
}

const comparacionUpdate = (id='', idUpdate='')=>{
    if(idUpdate){
        if(idUpdate.toString() === id.toString()){
                return true
          }
          else{
              return false
            
            }
      }else{
        return true;
     }

}

const correoExiste = async(correo='')=>{
    const existeEmail= await Usuario.findOne({ correo });
    if(!existeEmail){
        return false;
    }
    else{
        return existeEmail;
    }

}

module.exports={
   emailExiste,
   BuscaCedula,
   noExisteCedula,
   CedulaExiste,
   comparacionUpdate,
   CedulaExisteEliminada,
   correoExiste
}