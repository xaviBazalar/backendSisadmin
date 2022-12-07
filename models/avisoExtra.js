const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const AvisoExtraSchema = Schema({
    nombre: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    contrato:{ type: Schema.ObjectId, ref: "contrato" }
},
{ 
    collection : 'avisos_extra' 
});

AvisoExtraSchema.plugin(mongoosePaginate)

AvisoExtraSchema.methods.toJSON = function() {
    const { __v, ...avisoExtra  } = this.toObject();//password,
    return avisoExtra;
}

module.exports = model( 'AvisoExtra', AvisoExtraSchema );
