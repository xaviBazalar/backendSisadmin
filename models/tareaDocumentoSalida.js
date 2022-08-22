const { Schema, model } = require('mongoose');

const TareaDocumentoSalidaSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    documento_salida: { type: Schema.ObjectId, ref: "documento_salida" },
    validado:{
        type: Boolean
    },
    url_ref:{
        type: String
    },
    observacion:{
        type: String
    }
},
{ 
    collection : 'tarea_documentos_salida' 
});


module.exports = model( 'TareaDocumentoSalida', TareaDocumentoSalidaSchema );
