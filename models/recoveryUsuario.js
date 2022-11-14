const { Schema, model } = require('mongoose');

const RecoveryUsuarioSchema = Schema({
    usuario: {
        type: String,
    },
    hash_recovery: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: false
    }
},
{ 
    collection : 'recovery_usuario' 
});


RecoveryUsuarioSchema.methods.toJSON = function() {
    const { __v, ...recovery_usuario  } = this.toObject();//password,
    return recovery_usuario;
}

module.exports = model( 'RecoveryUsuario', RecoveryUsuarioSchema );
