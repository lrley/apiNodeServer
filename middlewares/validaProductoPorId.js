


const {response,request} =  require('express');
const {Producto} = require('../models')

const existeProductoPorId =async (id='')=>{

        const producto= await Producto.findById(id)

        if(!producto){
            throw new Error(`El Producto id ${id}  no existe en la base de datos`)
        }

}

const ProductoDelete=async (id='')=>{

    const producto= await Producto.findById(id)

    if(!producto.estado){
        throw new Error(`El id ${id} ya ha sido Eliminado de la base de datos hable con el Administrador`)
    }

}


module.exports={
    existeProductoPorId,
    ProductoDelete,
}