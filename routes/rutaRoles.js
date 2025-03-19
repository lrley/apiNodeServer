const { Router }= require('express');
const { GetRol, PutRol, PostRol, DeleteRol } = require('../controllers/rol.control');
//const { check } = require('express-validator');
//const { validar_Campos } = require('../middlewares/validarCampos');



const router = Router();

router.get('/', GetRol)

router.put('/:id', PutRol)

router.post('/',PostRol  )

router.delete('/:id', DeleteRol )


  module.exports = router