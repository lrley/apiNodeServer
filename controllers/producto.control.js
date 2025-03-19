const {response, request} =  require('express')
const {ObjectId} =  require ('mongoose').Types;

const {Producto, Categoria}=  require('../models');

const { fechaEcuador } =  require('../helpers/fechaActual');
const { existeCategoriaPorId, categoriaDelete } = require('../middlewares');



const obtenerProductos = async (req= request, res= response)=> {
 
    const {desde='0',limit='5'} = req.query;
    const query = {estado : true}
    
  
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','categoria')
        .skip(Number( desde ))
        .limit(Number( limit ))
       
    ]) 
    
    res.json({
      msg:'GET-CATEGORIA',
      total,
      productos
    })
    


}

const obtenerProducto = async (req= request, res= response)=> {
 

    const id= req.params.id;

    const producto= await Producto.findById(id)
            .populate('usuario','nombre')  
            .populate('categoria','categoria')
     const codigoPro=(producto._id)

    if(!producto){
      return res.status(400).json({
        msg: `El producto no existe en la base de datos`
      })
    }

  res.json({
    codigoPro,
    producto,
    

  })

  
}


const actualizarProducto = async (req= request, res= response)=> {
  
    const id= req.params.id;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.descripcion = data.descripcion.toUpperCase();
    let nombre = data.nombre;


    
    const esMongoIdCategoria = ObjectId.isValid(data.categoria)

    if(!esMongoIdCategoria){
      return res.status(400).json({
        msg:`El Id ${data.categoria} de Categoria no es un Id de Mongo`
      })
    }

    const controlProduct= await Producto.findById(id)
    const busquedaProduct = await Producto.findOne({nombre})
  
    if(req.body.categoria){
      const idCat= req.body.categoria;
    
      const categori= await Categoria.findById(idCat)
      if(!categori){
        return res.status(400).json({
          msg: `La categoria no existe`
        })
      }
         
      if(!categori.estado){
        return res.status(400).json({
          msg: `La categoria no existe esta eliminada hable con el administrador`
        })
      }

    
    }

    if(busquedaProduct){
    
      if((controlProduct._id.toString() !== busquedaProduct._id.toString()) && busquedaProduct )
      {
        return res.status(400).json({
          msg: `El Producto ${nombre}, ya existe`
        })
      }
    }

    data.usuario = req.persona._id;
    data.fechacreacion = fechaEcuador();
    const product= await Producto.findByIdAndUpdate(id, data, {new: true})
  
    res.json({
      msg:'PRODUCTO ACTUALIZADO',
      product
    })


}
 
const crearProducto = async(req= request, res= response)=> {
  
try {

    const {nombre, precio, descripcion, categoria} = req.body
    const producto =  await Producto.findOne({nombre})
    console.log(producto)
    
    if(producto){
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe en la base de datos`
        })
    }

    
    
    let _id= categoria;
    const categ =  await Categoria.findById({_id}); 

    if(!categ){
        return res.status(400).json({
            msg: `El ID: ${categoria} no existe en la base de datos`
        })
    }

    //GENERAR LA DATA A GUARDAR
    const data= {
        nombre: nombre.toUpperCase(),
        precio,
        categoria,
        descripcion: descripcion.toUpperCase(),
        usuario: req.persona._id,
        fechacreacion: fechaEcuador(),
    }
    
    const product= new Producto(data);

    
    //GUARDAR EN LA BASE DE DATOS
    await product.save();

    res.json({
        msg:'CREAR-PRODUCTO',
        product  
      })


    
} catch (error) {
    //console.log(error)
    return res.status(500).json({
      msg:'Hable con el Administrador problemas al crear Categoria'
  })
}

   


}

const borrarProducto = async (req= request, res= response)=> {

    const id= req.params.id;
            const product= await Producto.findById(id)
            if(!product){
                return res.status(400).json({
                    msg: `El producto no existe en la base de datos para eliminarlo`
                })
            }
    product.usuario = req.persona._id;
    product.fechacreacion = fechaEcuador();
    product.estado = false;
    const productoBorrado = await Producto.findByIdAndUpdate(id, product, {new: true})


    res.json({
        msg:'DELETE-PRODUCTO',
        id,
        productoBorrado

      })
}



module.exports={
    obtenerProductos,
    actualizarProducto,
    crearProducto,
    borrarProducto,
    obtenerProducto
}