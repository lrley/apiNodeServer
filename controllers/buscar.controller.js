const { response }= require('express');
const {  Categoria, Producto, usuarioDB, rolDB } = require('../models');
const {ObjectId} =  require ('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'roles',
    'categorias',
    'clientes'
];

const buscarUsuarios = async (termino='', res=response)=>{
   
    //BUSCADOR POR NOMBRE, CORREO , CEDULA MUESTRA CONTADOR DE USUARIOS BUSCADOS
    if(termino.toUpperCase() !== 'INACTIVO'){


        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const usuario = await usuarioDB.findById(termino);
            return res.json({
            results: (usuario) ? [usuario] : [],
            })
        }


        const regex = new RegExp (termino, 'i');
        const contUsuarios = await usuarioDB.countDocuments({
            $or:[{nombre:regex}, {correo:regex},{cedula:regex}],
            $and: [{estado:true}]
    
        })
        const usuarios = await usuarioDB.find({
            $or:[{nombre:regex}, {correo:regex},{cedula:regex}],
            $and: [{estado:true}]
        });

        
        res.json({
            results: contUsuarios, usuarios

        })

    }

    //BUSCADOR DE USUARIOS INACTIVOS
    if( termino.toUpperCase() === 'INACTIVO'){
       console.log('entre aqui')
        const contUsuarios = await usuarioDB.countDocuments({estado:false})
        const usuarios = await usuarioDB.find({estado:false});
        res.json({
            results: contUsuarios, usuarios
        })
        
    }

}

const buscarCategorias = async(termino='', res=response)=>{
    
    //BUSCADOR POR NOMBRE, CORREO , CEDULA MUESTRA CONTADOR DE USUARIOS BUSCADOS
    if(termino.toUpperCase() !== 'INACTIVO'){


        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const categoria = await Categoria.findById(termino);
            return res.json({
            results: (categoria) ? [categoria] : [],
            })
        }


        const regex = new RegExp (termino, 'i');
        const contCategoria = await Categoria.countDocuments({
            $or:[{categoria:regex}],
            $and: [{estado:true}]
    
        })
        const categorias = await Categoria.find({
            $or:[{categoria:regex} ],
            $and: [{estado:true}]
        });

        
        res.json({
            results: contCategoria, categorias

        })

    }
        
    //BUSCADOR DE CATEGORIAS INACTIVAS
        if( termino.toUpperCase() === 'INACTIVO'){
        
            const contCategorias = await Categoria.countDocuments({estado:false})
            const categorias = await Categoria.find({estado:false});
            res.json({
                results: contCategorias, categorias
            })
            
        }

}


const buscarProductos = async(termino='', res=response)=>{

       
    //BUSCADOR POR NOMBRE, CORREO , CEDULA MUESTRA CONTADOR DE USUARIOS BUSCADOS
    if(termino.toUpperCase() !== 'INACTIVO'){


        const esMongoId = ObjectId.isValid(termino)

        if(esMongoId){
            const producto = await Producto.findById(termino);
            return res.json({
            results: (producto) ? [producto] : [],
            })
        }


        const regex = new RegExp (termino, 'i');
        const contProductos = await Producto.countDocuments({
            $or:[{nombre:regex}],
            $and: [{estado:true}]
    
        })
        const productos = await Producto.find({
            $or:[{nombre:regex} ],
            $and: [{estado:true}]
        });

        
        res.json({
            results: contProductos, productos

        })

    }
       
//BUSCADOR DE CATEGORIAS INACTIVAS
if( termino.toUpperCase() === 'INACTIVO'){
        
    const contProductos = await Producto.countDocuments({estado:false})
    const productos = await Producto.find({estado:false});
    res.json({
        results: contProductos, productos
    })
    
}
    
}


const buscarRoles = async(termino='', res=response)=>{

 //BUSCADOR POR NOMBRE, CORREO , CEDULA MUESTRA CONTADOR DE USUARIOS BUSCADOS
 if(termino.toUpperCase() !== 'INACTIVO'){


    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId){
        const roles = await rolDB.findById(termino);
        return res.json({
        results: (roles) ? [roles] : [],
        })
    }


    const regex = new RegExp (termino, 'i');
    const contRoles = await rolDB.countDocuments({
        $or:[{rol:regex}],
        $and: [{estado:true}]

    })
    const roles = await rolDB.find({
        $or:[{rol:regex} ],
        $and: [{estado:true}]
    });

    
    res.json({
        results: contRoles, roles

    })

}

//BUSCADOR DE CATEGORIAS INACTIVAS
if( termino.toUpperCase() === 'INACTIVO'){
        
    const contRoles = await rolDB.countDocuments({estado:false})
    const roles = await rolDB.find({estado:false});
    res.json({
        results: contRoles, roles
    })
    
}


}

const buscar = (req, res = response) =>{

const {coleccion, termino} = req.params;


if(!coleccionesPermitidas.includes(coleccion)){
    return res.status(400).json({
        msg: `Las Colecciones permitidas son ${coleccionesPermitidas}`

    })
}

switch (coleccion) {
    case 'usuarios':
        buscarUsuarios(termino,res);    
        break;

    case 'categorias':
        buscarCategorias(termino,res);        
        break;

    case 'productos':
        buscarProductos(termino, res);
        break;   

    case 'roles':
        buscarRoles(termino,res);
        break;

    default:
        res.status(500).json({
            msg: 'Se me olvido realizar esta busqueda hable con el programador backend'
        });
}




}


const buscarSinTermino = (req, res = response)=>{

    res.status(500).json({
        msg: 'debe ingresar informacion a buscar'
    });
}

module.exports={

    buscar,
    buscarSinTermino
}