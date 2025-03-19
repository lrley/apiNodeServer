const { Router }= require('express');
const { check } = require('express-validator');
const { PostAuthLogin, googleSignIn } = require('../controllers/auth.controller');
const { validar_Campos } = require('../middlewares/validarCampos');

const router = Router();


router.post('/login',[
check('correo','El correo es Obligatorio').isEmail(),
check('password','La contraseña es Obligatoria').not().isEmpty(),
validar_Campos,
],PostAuthLogin)


router.post('/google',[
  check('id_token','id_token es necesario..').not().isEmpty(),
  validar_Campos,
],googleSignIn)

  module.exports = router