const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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

GerenciaSchema.plugin(mongoosePaginate)

GerenciaSchema.methods.toJSON = function() {
    const { __v, ...gerencia  } = this.toObject();
    return gerencia;
}


module.exports = model( 'GerenciaSchema', GerenciaSchema );
