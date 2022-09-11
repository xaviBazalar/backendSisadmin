
const { Schema, model } = require('mongoose');

const TareaSchema = Schema({
    nombre_tarea: {
        type: String
    },
    
    frecuencia:{
        type: String
    },
    SLA:{
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{ 
    collection : 'tareas' 
});



TareaSchema.methods.toJSON = function() {
    const { __v, ...tarea  } = this.toObject();
    return tarea;
}

module.exports = model( 'Tareas', TareaSchema );
