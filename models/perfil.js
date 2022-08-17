const { Schema, model } = require('mongoose');

const Perfileschema = Schema({
    nombre: {
        type: String,
        //required: [true, 'El rol es obligatorio']
    },
    sigla: {
        type: String,
        //required: [true, 'El rol es obligatorio']
    },
    estado: {
        type: Boolean,
        //required: [true, 'El rol es obligatorio']
    },
    rol: { type: Schema.ObjectId, ref: "rol" }
},
{ 
    collection : 'perfiles' 
});


module.exports = model( 'Perfil', Perfileschema );
