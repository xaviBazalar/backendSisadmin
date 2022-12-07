const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const PersonaAvisoSchema = Schema({
    nombre: {
        type: String
    },
    correo: {
        type: String,
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

PersonaAvisoSchema.plugin(mongoosePaginate)

PersonaAvisoSchema.methods.toJSON = function() {
    const { __v, ...personaAviso  } = this.toObject();//password,
    return personaAviso;
}

module.exports = model( 'PersonaAviso', PersonaAvisoSchema );
