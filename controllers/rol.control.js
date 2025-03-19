const {response, request} =  require('express')


const Rol =  require('../models/rolDB');
const { fechaEcuador } =  require('../helpers/fechaActual')

const GetRol =  (req= request, res= response)=> {
  
  const {page,limit} = req.query;
  
  
  
  res.json({
    msg:'GET ROL',
    page,
    limit
  })
  
  
}

const PutRol =  (req= request, res= response)=> {
  
  const id= req.params.id;
  
  res.json({
    msg:'PUT ROL',
    id  
  })
}

const PostRol = async(req= request, res= response)=> {
  
 
  
    const { rol, estado, fechacreacion}= req.body
    const roles= new Rol({rol,estado, fechacreacion:fechaEcuador()});

    //Verificar si el correo existe
    const existeRol = await Rol.findOne({rol});
    if(existeRol){
      return res.status(400).json({
        msg: `Este Rol ${existeRol.rol} ya esta registrado `
      })
    }

    //Guardar en Base de datos
    await roles.save();



    res.json({
        msg:'POST' ,
        roles
      })
  }

  const DeleteRol =  (req= request, res= response)=> {

    const id= req.params.id;

    res.json({
        msg:'DELETE',
        id

      })
  }



module.exports={

    GetRol,
    PutRol,
    PostRol,
    DeleteRol

}