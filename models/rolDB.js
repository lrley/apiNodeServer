
const {Schema, model} = require('mongoose');

const SchemaRol = Schema({

    rol:{
        type: String,
        required: true,
    },
    
    
    estado:{
        type: Boolean,
        default: true
    },

    
    fechacreacion:{
        type: Date,
        required: true,
    },


});

SchemaRol.methods.toJSON= function(){

    const {_id, __v,...roles}= this.toObject();
    
    return roles;
}

module.exports= model('Role',SchemaRol);