const { Schema, model } = require('mongoose');

const TareaDocumentoEntradaSolicitudSchema = Schema({
    tarea_documento:{ type: Schema.ObjectId, ref: "tarea_documentos_entrada" },
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
    collection : 'tarea_documentos_entrada_solicitud' 
});


module.exports = model( 'TareaDocumentoEntradaSolicitud', TareaDocumentoEntradaSolicitudSchema );
