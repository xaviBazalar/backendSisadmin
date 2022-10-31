const { Schema, model } = require('mongoose');
const getFecRegistro=()=>{
    var today = new Date();
    var now = today.toLocaleString();
    let fecToday=now.split(",")

    let fecActual=fecToday[0].split("/")
    let mes=(fecActual[0].length==1)?"0"+fecActual[0]:fecActual[0];
    let dia=(fecActual[1].length==1)?"0"+fecActual[1]:fecActual[1];
    fecActual=fecActual[2]+"-"+mes+"-"+dia
    return fecActual+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
}

const NotificacionUsuarioSchema = Schema({
    
    usuario: { type: Schema.ObjectId, ref: "usuario" },
    tipo: {
        type: String,
    },
    link: {
        type: String,
    },
    fecha_registro: {
        type: String,
        default: getFecRegistro()
    },
    visto:{
        type:Boolean,
        default:false
    }
},
{ 
    collection : 'notificaciones_usuario' 
});


NotificacionUsuarioSchema.methods.toJSON = function() {
    const { __v, ...notificaciones_usuario  } = this.toObject();
    return notificaciones_usuario;
}


module.exports = model( 'NotificacionUsuario', NotificacionUsuarioSchema );
