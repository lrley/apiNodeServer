

const fechaActual  =  require('../helpers/fechaActual');
const  encriptacionPassword = require('../helpers/encriptacionPassword');
const  db_validatorUsuario = require('../helpers/db_validatorUsuario');
const  esRolValido  = require('../helpers/db_validatorRol');


module.exports = {
    ...fechaActual,
    ...encriptacionPassword,
    ...db_validatorUsuario,
    ...esRolValido
}


