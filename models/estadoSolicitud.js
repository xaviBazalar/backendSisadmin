const { Schema, model } = require('mongoose');

const EstadoSolicitudSchema = Schema({
   
    nombre_estado: {
        type: String,
        default: true
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'estado_solicitud' 
});


EstadoSolicitudSchema.methods.toJSON = function() {
    const { __v, ...estadoSolicitud  } = this.toObject();
    return estadoSolicitud;
}


module.exports = model( 'EstadoSolicitudSchema', EstadoSolicitudSchema );
