const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const TareaContratoSchema = Schema({
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    gst: { type: Schema.ObjectId, ref: "gst" },
    bko: { type: Schema.ObjectId, ref: "bko" },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'TareaContratos' 
});

TareaContratoSchema.plugin(mongoosePaginate)

TareaContratoSchema.methods.toJSON = function() {
    const { __v, ...tareaContrato  } = this.toObject();
    return tareaContrato;
}


module.exports = model( 'TareaContrato', TareaContratoSchema );
