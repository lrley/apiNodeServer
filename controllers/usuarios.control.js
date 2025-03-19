const {response, request} =  require('express')
const Usuario =  require('../models/usuarioDB');

 const {fechaEcuador,encriptacion,BuscaCedula, CedulaExiste, comparacionUpdate} = require('../helpers/index.js');

//const { fechaEcuador } =  require('../helpers/fechaActual');
//const { encriptacion } = require('../helpers/encriptacionPassword');
//const { BuscaCedula, CedulaExiste, comparacionUpdate } = require('../helpers/db_validatorUsuario');

const GetUser = async (req= request, res= response)=> {
  
  /*const usuario = await Usuario.find(query)
  .skip(Number( desde ))
  .limit(Number( limit ));
  const total = await Usuario.countDocuments(query);*/
  const {desde='0',limit='5'} = req.query;
  const query = {estado : true}
  


  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number( desde ))
      .limit(Number( limit ))

  ]) 
  
  res.json({
   total,
   usuarios
  })
  
  
}

const PutUser =  async(req= request, res= response)=> {
  
  const cedula= req.params.id;
  const {password,google,correo, ...resto}= req.body;

  //TODO VALIDAR CONTRA BASE DE DATOS
  if(password){
    resto.password=encriptacion(password);
  }
  
  const id = await BuscaCedula(cedula)
  const idUdate= await CedulaExiste(resto.cedula)
  
  const result = comparacionUpdate(id, idUdate);

  if(result){
          const usuario = await Usuario.findByIdAndUpdate(id, resto)
          res.json({
                usuario
          })
  } 
  else{
      res.json({
        msg:`La cedula ${resto.cedula} ya existe en la base de datos`,
        respuesta: false
      })
 }
      

}

const PostUser = async(req= request, res= response)=> {
  const {nombre, cedula, correo, password, rol, img='Sin Imagen', fechacreacion}= req.body
  const usuario= new Usuario({nombre, cedula, correo, password, rol, img, fechacreacion:fechaEcuador()});
  
  usuario.password=  encriptacion(password);

  
  //Guardar en Base de datos
  await usuario.save();
  
    res.json({
        msg:'POST' ,
        usuario
      })
}

const DeleteUser = async (req= request, res= response)=> {

    const ced= req.params.cedula;

    const id = await BuscaCedula(ced);

    //const usuarioAutenticado= req.persona;
   
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}) 
    const user = req.persona;
    
    res.json({
      usuario,
      user,
    //  usuarioAutenticado
    })

    


}



module.exports={
    GetUser,
    PutUser,
    PostUser,
    DeleteUser,
}