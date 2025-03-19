
const {Schema, model} = require('mongoose');

const SchemaCategoria = Schema({

    categoria:{
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


});

SchemaCategoria.methods.toJSON= function(){

    const {_id, __v,estado,...categ}= this.toObject();
    
    return categ;
}

module.exports= model('Categoria',SchemaCategoria);