const { Schema, model } = require('mongoose');

const getFecRegistro=()=>{
    var today = new Date();
    var now = today.toLocaleString();
    let fecToday=now.split(",")

    let fecActual=fecToday[0].split("/")
    let mes=(fecActual[0].length==1)?"0"+fecActual[0]:fecActual[0];
    let dia=(fecActual[1].length==1)?"0"+fecActual[1]:fecActual[1];
    fecActual=fecActual[2]+"-"+mes+"-"+dia
    return fecActual+" "+today.getTime()
}

const HistorialResultadoSolicitudSchema = Schema({
    solicitud: { type: Schema.ObjectId, ref: "solicitudes" },
    estado_resultado:{ type: Schema.ObjectId, ref: "estado_resultado" },
    fecha_registro: {
        type: String,
        default:getFecRegistro()
    },
    fecha_respuesta: {
        type: String,
    },
    usuario: { type: Schema.ObjectId, ref: "usuarios" },
    mensaje: {
        type: String,
        default:""
    },
    respuesta: {
        type: String,
        default:""
    },
    url_file: {
        type: String,
        default:""
    },
    usuario_respuesta: { type: Schema.ObjectId, ref: "usuarios" },
},
{ 
    collection : 'historial_resultado_solicitud' 
});


HistorialResultadoSolicitudSchema.methods.toJSON = function() {
    const { __v, ...historial_resultado_solicitud  } = this.toObject();
    return historial_resultado_solicitud;
}


module.exports = model( 'HistorialResultadoSoliciud', HistorialResultadoSolicitudSchema );
