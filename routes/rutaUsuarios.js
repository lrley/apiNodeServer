const { Router }= require('express');
const { check } = require('express-validator');

const { GetUser, PutUser, PostUser, DeleteUser } = require('../controllers/usuarios.control');

/*const { validar_Campos } = require('../middlewares/validarCampos');
const { validarJWT }     = require('../middlewares/validar-jwt');*/

const { validarUserAdminRol, tieneRol,validar_Campos,validarJWT} = require('../middlewares');

const {esRolValido,emailExiste, noExisteCedula,CedulaExisteEliminada} = require('../helpers');

/*const { esRolValido } = require('../helpers/db_validatorRol');
const {  emailExiste, noExisteCedula,CedulaExisteEliminada } = require('../helpers/db_validatorUsuario');
*/



const router = Router();

router.get('/', GetUser)

router.put('/:id',[
  check('password','El pasword debe de ser mas de 6 letras').isLength({min:6}),
  check('cedula','La cedula debe de ser de 10 numeros, si es ruc 13 numeros').isLength({min:10, max:13}),
  check('rol').custom(esRolValido),
  check('id').custom(noExisteCedula),
  validar_Campos
] ,PutUser)

router.post('/',[
check('password','El pasword debe de ser mas de 6 letras').isLength({min:6}),
check('cedula','La cedula debe de ser de 10 numeros, si es ruc 13 numeros').isLength({min:10, max:13}),
check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
check('correo','El correo no es Valido').isEmail(),
check('correo').custom(emailExiste),
check('rol').custom(esRolValido),
validar_Campos
],PostUser)

router.delete('/:cedula',[
validarJWT,
//validarUserAdminRol,
tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
check('cedula').custom(noExisteCedula),
check('cedula').custom(CedulaExisteEliminada),
validar_Campos,

], DeleteUser )


  module.exports = router