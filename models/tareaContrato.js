const { Schema, model } = require('mongoose');

const TareaContratoSchema = Schema({

    tarea: { type: Schema.ObjectId, ref: "tarea" },
    contrato: { type: Schema.ObjectId, ref: "contrato" }
},
{ 
    collection : 'TareaContratos' 
});


TareaContratoSchema.methods.toJSON = function() {
    const { __v, ...tareaContrato  } = this.toObject();
    return tareaContrato;
}


module.exports = model( 'TareaContrato', TareaContratoSchema );
