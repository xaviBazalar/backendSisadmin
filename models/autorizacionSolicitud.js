const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const AutorizacionSolicitudSchema = Schema({
    solicitud: { type: Schema.ObjectId, ref: "solicitud" },
    usuario: { type: Schema.ObjectId, ref: "usuario" },
    fecha_autorizacion: {
        type: String,
        default:""
    },
    hora_autorizacion: {
        type: String,
        default:""
    },
    autorizado:{
        type: Boolean,
        default:false
    },
    pin:{
        type: String,
        default:""
    }
},
{ 
    collection : 'autorizacion_solicitud' 
});

AutorizacionSolicitudSchema.plugin(mongoosePaginate)

AutorizacionSolicitudSchema.methods.toJSON = function() {
    const { __v, ...autorizacionSolicitud  } = this.toObject();//password,
    return autorizacionSolicitud;
}

module.exports = model( 'AutorizacionSolicitud', AutorizacionSolicitudSchema );
