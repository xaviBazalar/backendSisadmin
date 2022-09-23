const { Schema, model } = require('mongoose');

const DocumentacionSolicitudSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    nombre_documento: {
        type: String
    },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    estado: {
        type: Boolean,
        default: true
    },
    observacion: {
        type: String
    }
},
{ 
    collection : 'documentacion_solicitudes' 
});


DocumentacionSolicitudSchema.methods.toJSON = function() {
    const { __v, ...documentacion_solicitud  } = this.toObject();
    return documentacion_solicitud;
}


module.exports = model( 'DocumentacionSolicitud', DocumentacionSolicitudSchema );
