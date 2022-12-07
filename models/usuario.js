const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    login: {
        type: String,
        required: [true, 'El login es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    perfil: { type: Schema.ObjectId, ref: "perfil" },
    autorizar: {
        type: Boolean,
        default: true
    },
    pin:{
        type: String,
        default:""
    }
    /*,
    google: {
        type: Boolean,
        default: false
    },*/
},
{ 
    collection : 'usuarios' 
});

UsuarioSchema.plugin(mongoosePaginate)

UsuarioSchema.methods.toJSON = function() {
    const { __v, ...usuario  } = this.toObject();//password,
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
