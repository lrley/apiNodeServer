
const {Schema, model} = require('mongoose');

const SchemaProducto = Schema({

    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true,
    },
    
    
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    
    fechacreacion:{
        type: Date,
        required: true,
    },

    precio:{
        type: Number,
        default: 0,
    },

    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },

    descripcion: {
        type: String,
    },

    disponible:{
        type: Boolean, 
        default: true,
    }


});

SchemaProducto.methods.toJSON= function(){

    const {_id, __v,estado,...data}= this.toObject();
    
    return data;
}

module.exports= model('Producto',SchemaProducto);