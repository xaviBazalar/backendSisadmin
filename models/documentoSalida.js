const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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

DocumentoSalidaSchema.plugin(mongoosePaginate)

module.exports = model( 'DocumentoSalida', DocumentoSalidaSchema );
