const { Schema, model } = require('mongoose');

const DocumentoSalidaSchema = Schema({
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
    collection : 'documentos_salida' 
});


module.exports = model( 'DocumentoSalida', DocumentoSalidaSchema );
