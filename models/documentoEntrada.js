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
    }
},
{ 
    collection : 'documentos_entrada' 
});


module.exports = model( 'DocumentoEntrada', DocumentoEntradaSchema );
