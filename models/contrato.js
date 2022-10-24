const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ContratoSchema = Schema({
    contradoid: {
        type: String
    },
    contrato: {
        type: String
    },
    gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    adc: { type: Schema.ObjectId, ref: "adc" },
    estado: {
        type: Boolean,
        default: true
    },
    
},
{ 
    collection : 'contratos' 
});

ContratoSchema.plugin(mongoosePaginate)

ContratoSchema.methods.toJSON = function() {
    const { __v, ...contrato  } = this.toObject();
    return contrato;
}


module.exports = model( 'Contrato', ContratoSchema );


