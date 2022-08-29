const { Schema, model } = require('mongoose');

const TareaDocumentoSalidaSolicitudSchema = Schema({
    tarea_documento:{ type: Schema.ObjectId, ref: "tarea_documentos_salida" },
    randomId:{
        type: String
    },
    validado:{
        type: Boolean,
        default:false
    },
    url_ref:{
        type: String
    },
    observacion:{
        type: String
    }
},
{ 
    collection : 'tarea_documentos_salida_solicitud' 
});


module.exports = model( 'TareaDocumentoSalidaSolicitud', TareaDocumentoSalidaSolicitudSchema );
