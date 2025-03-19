const {response, request} =  require('express');
const { correoExiste } = require('../helpers/db_validatorUsuario');
const { desEncriptacion, encriptacion } = require('../helpers/encriptacionPassword');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const Usuario = require('../models/usuarioDB');
const { fechaEcuador } = require('../helpers');



const PostAuthLogin = async(req= request, res= response)=> {
  
    const {correo, password} = req.body;


    try {

        //VERIFICAR SI EL EMAIL EXISTE
       const user = await correoExiste(correo);
            if(!user){
                return res.status(400).json({
                    msg:'Este Correo no Existe en la base de datos'
                    })
            }
        
        //VERIFICAR SI EL USUARIO ESTA ACTIVO
            if(!user.estado){
                return res.status(400).json({
                    msg:'Este Usuario se encuentra Eliminado de la base de datos, hable con el Administrador'
                 })
            }
        //VERIFICAR LA CONTRASEÑA
        const verificaPassword=  desEncriptacion(password,user.password);
            if(!verificaPassword){
                return res.status(400).json({
                    msg:'El Password ingresado no es el Correcto, hable con el Administrador'
                 })
            }

        //GENERAR EL JWT
        const token = await generarJWT(user.id);




        res.json({
            user,
            token
        })

    } catch (error) {
      //  console.log(error)
        return res.status(500).json({
            msg:'Hable con el Administrador'
        })
    }

 
  }


const googleSignIn = async( req= request, res= response )=>{

    const {id_token} = req.body;
    
    try {
        const {nombre, correo, img, cedula} = await googleVerify(id_token);
        
        //console.log('token: '+id_token)

         let usuario =  await Usuario.findOne({correo});

         if(!usuario){
             console.log('Entro a crear nuevo usuario: ',nombre,correo,img, cedula)


            const dato = {
                nombre,
                correo,
                cedula,
                password: encriptacion('12345'),
                img,
                google: true,
                rol: 'USER_ROL',
                fechacreacion: fechaEcuador(),
                estado: true,

            }; 
            
            usuario = new Usuario(dato);
            console.log(usuario)
            await usuario.save();
          
         }

         if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario Bloqueado'
            })
         }

         const token = await generarJWT(usuario.id);
         console.log(token)
         
        res.json({
            msg:'Todo ok',
            usuario,
            token,
        })
         

    } catch (error) {
        res.status(400).json({
        ok:false,
        msg:'El token no se pudo verificar no es valido',
    
      })
    }




}

module.exports={

    PostAuthLogin,
    googleSignIn
   
}