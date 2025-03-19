


const  validar_Campos  = require('../middlewares/validarCampos');
const  validarJWT      = require('../middlewares/validar-jwt');
const  validar_rol = require('../middlewares/validar_rol');
const  validar_Categorias = require('../middlewares/validarCategorias');



module.exports = {
    ...validar_Campos,
    ...validarJWT,
    ...validar_rol,
    ...validar_Categorias,
}