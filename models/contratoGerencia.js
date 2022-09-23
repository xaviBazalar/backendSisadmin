const { Schema, model } = require('mongoose');

const ContratoGerenciaSchema = Schema({
    gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    contrato: { type: Schema.ObjectId, ref: "contratos" },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'contratos_gerencia' 
});


ContratoGerenciaSchema.methods.toJSON = function() {
    const { __v, ...contrato_gerencia  } = this.toObject();
    return contrato_gerencia;
}


module.exports = model( 'ContratoGerencia', ContratoGerenciaSchema );
