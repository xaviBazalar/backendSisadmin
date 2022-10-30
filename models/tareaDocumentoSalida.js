const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const TareaDocumentoSalidaSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    documento_salida: { type: Schema.ObjectId, ref: "documento_salida" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    validado:{
        type: Boolean
    },
    url_ref:{
        type: String
    },
    observacion:{
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'tarea_documentos_salida' 
});

TareaDocumentoSalidaSchema.plugin(mongoosePaginate)

module.exports = model( 'TareaDocumentoSalida', TareaDocumentoSalidaSchema );
