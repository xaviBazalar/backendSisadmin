const { Schema, model } = require('mongoose');

const TareaDocumentoEntradaSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    documento_entrada: { type: Schema.ObjectId, ref: "documento_entrada" },
},
{ 
    collection : 'tarea_documentos_entrada' 
});


module.exports = model( 'TareaDocumentoEntrada', TareaDocumentoEntradaSchema );
