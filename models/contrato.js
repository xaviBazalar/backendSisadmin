const { Schema, model } = require('mongoose');

const ContratoSchema = Schema({
    contradoid: {
        type: String
    },
    contrato: {
        type: String
    },
    gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'contratos' 
});


ContratoSchema.methods.toJSON = function() {
    const { __v, ...contrato  } = this.toObject();
    return contrato;
}


module.exports = model( 'Contrato', ContratoSchema );


