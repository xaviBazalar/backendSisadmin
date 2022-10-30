const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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

TareaDocumentoEntradaSolicitudSchema.plugin(mongoosePaginate)


module.exports = model( 'TareaDocumentoEntradaSolicitud', TareaDocumentoEntradaSolicitudSchema );
