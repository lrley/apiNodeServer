const { response, request } = require('express');
const Role = require('../models/rolDB');

const esRolValido= async(rol='')=>{
  
    const existeRol =  await Role.findOne({ rol }); 
      if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
      }
}



module.exports = {
esRolValido,


}