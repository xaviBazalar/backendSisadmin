const { Schema, model } = require('mongoose');

const SolicitudSchema = Schema({
    gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    gst: { type: Schema.ObjectId, ref: "gst" },
    bko: { type: Schema.ObjectId, ref: "bko" },
    estado_solicitud : { type: Schema.ObjectId, ref: "bko" },
    observacion: {
        type: String
    },
    fecha_solicitud: {
        type: String
    },
    fecha_inicio: {
        type: String
    }
},
{ 
    collection : 'solicitudes' 
});


SolicitudSchema.methods.toJSON = function() {
    const { __v, ...solicitud  } = this.toObject();
    return solicitud;
}


module.exports = model( 'Solicitud', SolicitudSchema );
