
const { Schema, model } = require('mongoose');

const TareaSchema = Schema({
    nombre_tarea: {
        type: String,
        default: true
    },
    
    frecuencia:{
        type: String,
        default: true
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
