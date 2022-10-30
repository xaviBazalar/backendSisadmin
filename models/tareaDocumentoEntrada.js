const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const TareaDocumentoEntradaSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    documento_entrada: { type: Schema.ObjectId, ref: "documento_entrada" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'tarea_documentos_entrada' 
});

TareaDocumentoEntradaSchema.plugin(mongoosePaginate)


module.exports = model( 'TareaDocumentoEntrada', TareaDocumentoEntradaSchema );
