const bcryptjs = require('bcryptjs');

const encriptacion=(password='')=>{

    const salt =  bcryptjs.genSaltSync();
    const pass= bcryptjs.hashSync(password, salt);

    return pass;
}





const desEncriptacion = (password='', userPass='')=>{

  const validarPassword = bcryptjs.compareSync(password,userPass)
  return validarPassword;

}



module.exports={
    encriptacion,
    desEncriptacion,
}