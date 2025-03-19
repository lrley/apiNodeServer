const {response, request} =  require('express')


const {Categoria}=  require('../models');

const { fechaEcuador } =  require('../helpers/fechaActual')

const GetCategoria = async (req= request, res= response)=> {


  const {desde='0',limit='5'} = req.query;
  const query = {estado : true}
  

  const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
      .populate('usuario','nombre')
      .skip(Number( desde ))
      .limit(Number( limit ))
     
  ]) 
  
  res.json({
    msg:'GET-CATEGORIA',
    total,
    categorias
  })
  
  
}

const obtenerCategorias = async (req=  request, res= response)=>{
  const id= req.params.id;

    const categoria= await Categoria.findById(id).populate('usuario','nombre')
     const codigoCat=(categoria._id)

    if(!categoria){
      return res.status(400).json({
        msg: `La categoria no existe`
      })
    }

  res.json({
    codigoCat,
    categoria,
    

  })

}

const PutCategoria = async (req= request, res= response)=> {
  
  const id= req.params.id;
  const {estado, usuario, ...data} = req.body;
  data.categoria = data.categoria.toUpperCase();
  let categoria = data.categoria;
  const controlCateg= await Categoria.findById(id)
  const busquedaCateg = await Categoria.findOne({categoria})

  if(busquedaCateg){
    
  
    if((controlCateg._id.toString() !== busquedaCateg._id.toString()) && busquedaCateg )
    {
      return res.status(400).json({
        msg: `La categoria ${categoria}, ya existe`
      })
    }
  }



  data.usuario = req.persona._id;
  data.fechacreacion = fechaEcuador();
  const categ= await Categoria.findByIdAndUpdate(id, data, {new: true})

//console.log(categoria)

  res.json({
    msg:'PUT-CATEGORIA',
    categ
  })
}
 
const PostCategoria = async(req= request, res= response)=> {
  

try {
  
  const categoria= req.body.categoria.toUpperCase();
  
  const categoriaDB =  await Categoria.findOne({categoria})
  
  console.log(categoriaDB)
    if(categoriaDB){
      return res.status(400).json({
        msg: `La categoria ${categoriaDB.categoria}, ya existe`
      })
    }
  /*console.log(req.persona.rol)
    if(req.persona.rol !== 'ADMIN_ROL'){
      console.log('entro aqui')
      return res.status(400).json({
        msg: `No se puede crear la categoria porque el usuario ${req.persona.nombre} no es Administrador tiene un rol ${req.persona.rol}`
      })
    }*/

    //GENERAR LA DATA A GUARDAR
    const data ={
      categoria,
      usuario: req.persona._id,
      fechacreacion: fechaEcuador(),
    }
  
    const categ= new Categoria(data);
  
    //GUARDA EN BD
    await categ.save();
  
    res.status(201).json({
        msg:'CATEGORIA CREADA CON EXITO' ,
        categ
      })
} catch (error) {
  console.log(error)
  return res.status(500).json({
    msg:'Hable con el Administrador problemas al crear Categoria'
})
}


}

const DeleteCategoria = async (req= request, res= response)=> {

    const id= req.params.id;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new: true})


    res.json({
        msg:'DELETE-CATEGORIA',
        id,
        categoriaBorrada

      })
}



module.exports={

  GetCategoria,
  obtenerCategorias,
    PutCategoria,
    PostCategoria,
    DeleteCategoria,

}