const { Schema, model } = require('mongoose');

const GerenciaSchema = Schema({
   
    nombre_gerencia: {
        type: String,
        default: true
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'gerencia' 
});


   GerenciaSchema.methods.toJSON = function() {
    const { __v, ...gerencia  } = this.toObject();
    return gerencia;
}


module.exports = model( 'GerenciaSchema', GerenciaSchema );
