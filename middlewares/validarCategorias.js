const {response,request} =  require('express');
const {Categoria} = require('../models')

const existeCategoriaPorId =async (id='')=>{
        const categoria= await Categoria.findById(id)
        if(!categoria){
            throw new Error(`El id ${id} no existe en la base de datos`)
        }
}

const categoriaDelete=async (id='')=>{

    const categoria= await Categoria.findById(id)

    if(!categoria.estado){
        throw new Error(`El id ${id} ya ha sido Eliminado de la base de datos hable con el Administrador`)
    }

}


module.exports= {
    existeCategoriaPorId,
    categoriaDelete,

}