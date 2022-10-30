const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const EstadoResultadoSchema = Schema({
   
    nombre_resultado: {
        type: String,
        default: true
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'estado_resultado' 
});

EstadoResultadoSchema.plugin(mongoosePaginate)

EstadoResultadoSchema.methods.toJSON = function() {
    const { __v, ...estadoResultado  } = this.toObject();
    return estadoResultado;
}


module.exports = model( 'EstadoResultado', EstadoResultadoSchema );
