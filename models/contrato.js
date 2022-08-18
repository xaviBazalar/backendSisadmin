const { Schema, model } = require('mongoose');

const ContratoSchema = Schema({
   
    contradoid: {
        type: String,
        default: true
    },
    contrato: {
        type: String,
        default: true
    },
    gerencia: { type: Schema.ObjectId, ref: "gerencia" }
},
{ 
    collection : 'contratos' 
});


ContratoSchema.methods.toJSON = function() {
    const { __v, ...contrato  } = this.toObject();
    return contrato;
}


module.exports = model( 'Contrato', ContratoSchema );


