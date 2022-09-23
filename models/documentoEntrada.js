const { Schema, model } = require('mongoose');

const DocumentoEntradaSchema = Schema({
    tipo_documento: {
        type: String,
    },
    requerido: {
        type: Boolean,
    },
    descripcion: {
        type: String,
    },
    url: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'documentos_entrada' 
});


module.exports = model( 'DocumentoEntrada', DocumentoEntradaSchema );
