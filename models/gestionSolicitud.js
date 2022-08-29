const { Schema, model } = require('mongoose');

const GestionSolicitudSchema = Schema({
    solicitud: { type: Schema.ObjectId, ref: "solicitudes" },
    documentacion_solicitud: { type: Schema.ObjectId, ref: "documentacion_solicitudes" },
    validado: {
        type: Boolean
    },
    estado: {
        type: String
    },
    observacion: {
        type: String
    }
},
{ 
    collection : 'gestion_solicitud' 
});


GestionSolicitudSchema.methods.toJSON = function() {
    const { __v, ...gestion_solicitud  } = this.toObject();
    return gestion_solicitud;
}


module.exports = model( 'GestionSolicitud', GestionSolicitudSchema );
