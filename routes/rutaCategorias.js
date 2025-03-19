const { Router }= require('express');
const { GetCategoria, PutCategoria, PostCategoria, DeleteCategoria, obtenerCategorias } = require('../controllers/categoria.controller');
const { check } = require('express-validator');
const { validar_Campos, validarJWT, tieneRol } = require('../middlewares');
const { existeCategoriaPorId, categoriaDelete } = require('../middlewares/validarCategorias');
//const { check } = require('express-validator');
//const { validar_Campos } = require('../middlewares/validarCampos');



const router = Router();

router.get('/', GetCategoria)

router.get('/:id',[
  check('id', 'no es un ID de MONGO').isMongoId(),
  validar_Campos,
  check('id').custom(existeCategoriaPorId),
  check('id').custom(categoriaDelete),
  validar_Campos
], obtenerCategorias)


router.put('/:id',[
  validarJWT,
  tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
  check('id', 'no es un ID de MONGO').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  check('id').custom(categoriaDelete),
  check('categoria','El nombre de la Categoria es Obligatoria').not().isEmpty(),


  validar_Campos

], PutCategoria)

router.post('/',[
  validarJWT,
  tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
   check('categoria','El nombre de la Categoria es Obligatoria').not().isEmpty(),
  validar_Campos
],PostCategoria  )

router.delete('/:id',[
  validarJWT,
  tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
  check('id', 'no es un ID de MONGO').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  check('id').custom(categoriaDelete),
  validar_Campos
] ,DeleteCategoria )


  module.exports = router