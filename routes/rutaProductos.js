const { Router }= require('express');
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, actualizarProducto, crearProducto, borrarProducto } = require('../controllers/producto.control');
const { validarJWT, tieneRol, validar_Campos, existeCategoriaPorId, categoriaDelete } = require('../middlewares');
const { existeProductoPorId, ProductoDelete } = require('../middlewares/validaProductoPorId');



const router = Router();

router.get('/', obtenerProductos)


router.get('/:id',[
    check('id', 'no es un ID de MONGO').isMongoId(),
    validar_Campos,
    check('id').custom(existeProductoPorId),
    check('id').custom(ProductoDelete),
    validar_Campos
], obtenerProducto)


router.put('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
    check('id', 'EL id del producto ingresado no es un ID de MONGO').isMongoId(),
    validar_Campos,
    check('id').custom(existeProductoPorId),
    check('id').custom(ProductoDelete),
    
    validar_Campos

] ,actualizarProducto)

router.post('/',[
    validarJWT,
    tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
    check('nombre','El nombre de la Categoria es Obligatoria').not().isEmpty(),
    check('categoria','El id de la Categoria es Obligatoria').not().isEmpty(),
    check('categoria','El Id ingresado de categoria no es un ID de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('categoria').custom(categoriaDelete),
    validar_Campos

],crearProducto )

router.delete('/:id',[
    validarJWT,
    check('id', 'no es un ID de MONGO').isMongoId(),
    tieneRol('ADMIN_ROL','CLIENTE_ADMIN_ROL'),
    check('id').custom(existeProductoPorId),
    check('id').custom(ProductoDelete),
    validar_Campos
],borrarProducto )


  module.exports = router